// axios基础的封装
import axios from 'axios'

const httpInstance = axios.create({
    //基地址-wmz测试
    // baseURL: 'https://jsonplaceholder.typicode.com',
	//基地址-zjt测试
	baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    //响应时间最长为
    timeout: 5000
})

//拦截器
//axios请求拦截器
httpInstance.interceptors.request.use(config => {
    return config
}, e => Promise.reject(e))
//axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data,e=>{
    return Promise.reject(e)
})

export default httpInstance