import request from '@/utils/http'

//获取验证码
// export const getVercodeAPI = (email) => {
//     return request({
//       url: '/student/sendVerCode',
//       method:'POST',
//       data:{
//         email
//       }
//     })
// }

export const getVercodeAPI = (email) => {
	console.log(email)
    return request({
		url:'/vercode',
		method:'POST',
		data:{
			email
		}
    })
}
