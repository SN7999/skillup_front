import request from '@/utils/http'

//学生注册获取验证码
export const getVercodeAPI = (email) => {
    return request({
      url: '/student/sendVerCode',
      method:'POST',
      params:{
        email
      }
    })
}

// 测试
// export const getVercodeAPI = (email) => {
// 	console.log(email)
//     return request({
// 		url:'/vercode',
// 		method:'POST',
// 		data:{
// 			email
// 		}
//     })
// }

//老师注册获取验证码
export const getVercodeAPIT = (email) => {
    return request({
      url: '/teacher/sendVerCode',
      method:'POST',
      params:{
        email
      }
    })
}

// 测试
// export const getVercodeAPIT = (email) => {
// 	console.log(email)
//     return request({
// 		url:'/vercode',
// 		method:'POST',
// 		data:{
// 			email
// 		}
//     })
// }