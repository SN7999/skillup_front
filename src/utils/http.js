// axios基础的封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user'
import router from '@/router'
const httpInstance = axios.create({
    //基地址-wmz测试
    // baseURL: 'https://jsonplaceholder.typicode.com',
	//基地址-zjt测试
	baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
	// baseURL: 'http://10.255.0.98:8080',
    //响应时间最长为
    timeout: 5000
})

//拦截器
//axios请求拦截器
// 暂未测试
httpInstance.interceptors.request.use(config => {
	// 1. 从pinia获取token数据
	const userStore = useUserStore()
	// 2. 按照后端的要求拼接token数据
	const token = userStore.userInfo.token
	if (token) {
	  config.headers.Authorization = `Bearer ${token}`
	}
	return config
}, e => Promise.reject(e))
//axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data,e=>{
	
	const userStore = useUserStore()
	//统一错误提示
	ElMessage({
		type: 'warning',
		message: e.response.data.message
	})
	// 401token失效处理
	// 清除本地用户数据跳转到登录页
	if(e.response.status === 401){
		userStore.clearUserInfo()
		router.push('/login')
	}
    return Promise.reject(e)
})

export default httpInstance