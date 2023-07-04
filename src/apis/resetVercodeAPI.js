import request from '@/utils/http'

//学生忘记密码获取验证码
export const getVercodeFogAPI = (email) => {
    return request({
      url: '/student/passwdResetVerify',
      method:'POST',
      params:{
        email
      }
    })
}

// 测试
// export const getVercodeFogAPI = (email) => {
// 	console.log(email)
//     return request({
// 		url:'/vercode',
// 		method:'POST',
// 		data:{
// 			email
// 		}
//     })
// }

//老师忘记密码获取验证码
export const getVercodeFogAPIT = (email) => {
    return request({
      url: '/teacher/passwdResetVerify',
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