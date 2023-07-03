import request from '@/utils/http'
//学生提交
// export const registerAPI = () => {
// 	return request({
// 		//测试用url，未改
// 		url:'/attend',
// 	})
// }

export const registerAPI = ({ email, password, verCode }) => {
	// console.log('registerAPI'+email+password+verCode)
	return request({
		//测试用url，未改
		url:'/student/register',
		// url:'/login',
		method:'POST',
		data: {
			// 测试时注释掉identity
			// identity,
			email,
			password,
			verCode
		}
	})
}
//老师提交
export const registerAPIT = ({ email, password, verCode }) => {
	// console.log('registerAPIT'+email+password+verCode)
	return request({
		//测试用url，未改
		url:'/teacher/register',
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