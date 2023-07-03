// 封装用户相关接口函数

import request from '@/utils/http'
//学生提交
// export const loginAPI = () => {
// 	return request({
// 		//测试用url，未改
// 		url:'/attend',
// 	})
// }

export const loginAPI = ({ email, password }) => {
	console.log('loginAPI'+email+password)
	return request({
		//测试用url，未改
		url:'/student/login',
		// url:'/login',
		method:'POST',
		data: {
			// 测试时注释掉identity
			// identity,
			email,
			password
		}
	})
}
//老师提交
export const loginAPIT = ({ email, password }) => {
	console.log('loginAPIT'+email+password)
	return request({
		//测试用url，未改
		url:'/teacher/login',
		// url:'/login',
		method:'POST',
		data: {
			// 测试时注释掉identity
			// identity,
			email,
			password
		}
	})
}