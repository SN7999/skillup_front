// 管理用户数据相关

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
	
export const useUserStore = defineStore('user', () => {
	// 定义管理用户数据的state
	const userInfo = ref({})
	// 定义获取接口数据的action函数
	const getUserInfo = async ({ account, password})=> {
		console.log({ account, password})
		const res = await loginAPI({ account, password})
		console.log(res)
		userInfo.value = res.result
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
