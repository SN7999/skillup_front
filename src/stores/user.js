// 管理用户数据相关

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI, loginAPIT, loginAPIA } from '@/apis/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { setSessionCookie } from '@/cookie.js'
	
export const useUserStore = defineStore('user', () => {
	// 定义管理用户数据的state
	const router = useRouter()
	const userInfo = ref({})
	// 定义获取接口数据的action函数
	const getUserInfo = async ({ identity, email, password})=> {
		const res = ref(null)
		console.log({ identity, email, password})
		
		if(identity == "student"){
			console.log('学生登录')
			res.value = await loginAPI({ email, password})
			// res.value = await loginAPI()
		} else if (identity == "teacher") {
			console.log('老师登录')
			res.value = await loginAPIT({ email, password})
		} else {
			console.log('身份错误')
		}
		
		console.log(res)
		if(res.value != null){
			console.log('res.data.code '+res.value.data.code)
			if(res.value.data.code == 200) {
				ElMessage({ type: 'success', message: res.value.data.msg})
				if(identity == "student"){
					router.replace({ path: '/student' })
				} else if (identity == "teacher"){
					router.replace({ path: '/teacher' })
				}
			}else{
				ElMessage({ type: 'error', message:res.value.data.msg})
			}
		}
		userInfo.value = res.value.data

		// // 假设您成功获得了 session ID，将其存储到 cookie 中
		// const JSESSIONID = userInfo.value.data.value;
		// setSessionCookie(JSESSIONID);
	}
	
	//退出时清除用户数据
	const clearUserInfo = () => {
		userInfo.value = {}
	}
	// 以对象格式把state和action return出去
	return {
		userInfo,
		getUserInfo,
		clearUserInfo
	}
},{
	persist: true,
})

export const useUserStoreA = defineStore('user', () => {
	// 定义管理用户数据的state
	const router = useRouter()
	const userInfo = ref({})
	// 定义获取接口数据的action函数
	const getUserInfo = async ({ name, password})=> {
		const res = ref(null)
		console.log({ name, password})
		res.value = await loginAPIA({ name, password})
			
		console.log(res)
		if(res.value != null){
			if(res.value.data.code == 200) {
				ElMessage({ type: 'success', message: res.value.data.msg})
				router.replace({ path: '/admin' })
			}else{
				ElMessage({ type: 'error', message:res.value.data.msg})
			}
		}
		userInfo.value = res.value.data
	}
	
	//退出时清除用户数据
	const clearUserInfo = () => {
		userInfo.value = {}
	}
	// 以对象格式把state和action return出去
	return {
		userInfo,
		getUserInfo,
		clearUserInfo
	}
},{
	persist: true,
})
