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
    url: '/student/selfInfo'
    // headers: {
    //   'Content-Type': 'application/json', // 举例：添加 Content-Type 请求头
    //   'Authorization': 'Bearer your_token_here', // 举例：添加授权信息请求头
    // },
  })
}

export const getExamCountAPI = () => {
  return request({
    url: '/student/selfExamCount'
  })
}

export const getClassCountAPI = () => {
  return request({
    url: '/student/selfClassCount'
  })
}

//修改密码
export const getPasswordResetAPI = (originalPassword, newPassword) => {
  return request({
    url: '/student/changePassword',
    method: 'POST',
    params: {
      originalPassword,
      newPassword
    }
  })
}

//修改邮箱
export const getEmailResetAPI = (newEmail, verCode) => {
  console.log(newEmail)
  console.log(verCode)
  return request({
    url: '/student/emailReset',
    method: 'POST',
    params: {
      newEmail,
      verCode
    }
  })
}

//获取验证码
export const getVercodeAPI = (email) => {
  return request({
    url: '/student/sendVerCode',
    method: 'POST',
    params: {
      email
    }
  })
}

//注销账号 url待填
export const getCancelAPI = (email, verCode) => {
  return request({
    url: '/student/cancelAccount',
    method: 'POST',
    params: {
      email,
      verCode
    }
  })
}

//更新个人信息
export const getSaveInfoAPI = (
  name,
  contact,
  gender,
  academy,
  selfintroduction,
  age
) => {
  return request({
    url: '/student/saveInfo',
    method: 'POST',
    data: {
      name,
      contact,
      gender,
      academy,
      selfintroduction,
      age
    }
  })
}
