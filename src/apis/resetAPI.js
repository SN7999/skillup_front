import request from '@/utils/http'
//学生提交
// export const resetAPI = () => {
// 	return request({
// 		//测试用url，未改
// 		url:'/attend',
// 	})
// }

export const resetAPI = ({ email, password, verCode }) => {
	// console.log('registerAPI'+email+password+verCode)
	return request({
		//测试用url，未改
		url:'/student/passwdResetVerify',
		// url:'/login',
		method:'POST',
		data: {
			// 测试时注释掉identity
			// identity,
			email,
			password
		},
		params: {
			verCode
		}
	})
}
//老师提交
export const resetAPIT = ({ email, password, verCode }) => {
	// console.log('registerAPIT'+email+password+verCode)
	return request({
		//测试用url，未改
		url:'/teacher/passwdResetVerify',
		// url:'/login',
		method:'POST',
		data: {
			// 测试时注释掉identity
			// identity,
			email,
			password
		},
		params: {
			verCode
		}
	})
}