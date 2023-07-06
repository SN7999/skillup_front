import request from '@/utils/http'

///studentDetail 学生个人中心界面调用方法
///curriculumDetail 学生选课界面调用方法
// 根据学生id查询个人信息
// 最终使用
// export const getStudentInfoAPI = (studentid) => {
//   return request({
//     url: '/student/selfInfo',
//     method:'POST',
//     data:{
//       studentid
//     }
//   })
// }
// export const getStudentInfoAPI = () => {
//     return request({
//       url: '/student/selfInfo',
//     })
// }

export const getStudentInfoAPI = () => {
  return request({
    url: '/student/selfInfo',
    // headers: {
    //   'Content-Type': 'application/json', // 举例：添加 Content-Type 请求头
    //   'Authorization': 'Bearer your_token_here', // 举例：添加授权信息请求头
    // },
  });
};

//测试使用
// export const getStudentInfoAPI = () => {
//     return request({
//       url:'/studentinfo',
//     })
// }

//根据学生id查询学生已考试数
// export const getExamCountAPI = (studentid) => {
//     return request({
//       url: '/student/selfExamCount',
//       method:'POST',
//       data:{
//         studentid
//       }
//     })
// }
export const getExamCountAPI = () => {
    return request({
      url: '/student/selfExamCount',
    })
}
  
//测试使用
// export const getExamCountAPI = () => {
//     return request({
//     url:'/examcount',
//     })
// }

//根据学生id查询学生已选课数
// export const getClassCountAPI = (studentid) => {
//     return request({
//       url: '/student/selfClassCount',
//       method:'POST',
//       data:{
//         studentid
//       }
//     })
// }
export const getClassCountAPI = () => {
    return request({
      url: '/student/selfClassCount',
    })
}  

//测试使用
// export const getClassCountAPI = () => {
//     return request({
//     url:'/classcount',
//     })
// }

//修改密码
export const getPasswordResetAPI = (originalPassword, newPassword) => {
  return request({
    url: '/student/changePassword',
    method: 'POST',
    params:{
      originalPassword,
      newPassword
    }
  });
}
  
//测试使用
// export const getPasswordResetAPI = () => {
//     return request({
//     url:'/passwordreset',
//     })
// }

//修改邮箱
export const getEmailResetAPI = (newEmail,verCode) => {
    console.log(newEmail)
    console.log(verCode)
    return request({
      url: '/student/emailReset',
      method:'POST',
      params:{
        newEmail,
        verCode
      }
    })
}
  
//测试使用
// export const getEmailResetAPI = () => {
//     return request({
//     url:'/emailreset',
//     })
// }

//获取验证码
export const getVercodeAPI = (email) => {
    return request({
      url: '/student/sendVerCode',
      method:'POST',
      params:{
        email
      }
    })
}
  
//测试使用
// export const getVercodeAPI = () => {
//     return request({
//     url:'/vercode',
//     })
// }

//注销账号 url待填
export const getCancelAPI = (email,verCode) => {
    return request({
      url: '/student/cancelAccount',
      method:'POST',
      params:{
        email,
        verCode
      }
    })
}

//测试使用
// export const getCancelAPI = () => {
//     return request({
//     url:'/cancel',
//     })
// }

//更新个人信息
export const getSaveInfoAPI = (name,contact,gender,academy,selfintroduction,age) => {
    return request({
      url: '/student/saveInfo',
      method:'POST',
      data:{
        name,
        contact,
        gender,
        academy,
        selfintroduction,
        age
      }
    })
}
  
//测试使用
// export const getSaveInfoAPI = () => {
//     return request({
//     url:'/saveinfo',
//     })
// }