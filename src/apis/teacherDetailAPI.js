import request from '@/utils/http'

///老师个人中心界面调用方法
//个人信息
export const getTeacherInfoAPI = () => {
  return request({
    method:"POST",
    url: '/teacher/selfInfo ',
  });
};
//获取学生数
export const getStudentCountAPI = () => {
    return request({
      method:"POST",
      url: '/teacher/getStudentsCount',
    })
}
//获取课程数
export const getClassCountAPI = () => {
    return request({
      method:"POST",
      url: '/teacher/getClassesCount',
    })
}  

//修改密码
export const getPasswordResetAPI = (originalPassword, newPassword) => {
  return request({
    url: '/teacher/changePassword',
    method: 'POST',
    params:{
      originalPassword,
      newPassword
    }
  });
}

//修改邮箱
export const getEmailResetAPI = (newEmail,verCode) => {
    return request({
      url: '/teacher/emailReset',
      method:'POST',
      params:{
        newEmail,
        verCode
      }
    })
}

//获取验证码
export const getVercodeAPI = (email) => {
    return request({
      url: '/teacher/sendVerCode',
      method:'POST',
      params:{
        email
      }
    })
}
  
//注销账号
export const getCancelAPI = (email,verCode) => {
    return request({
      url: '/teacher/changePassword',
      method:'POST',
      params:{
        email,
        verCode
      }
    })
}

//更新个人信息
export const getSaveInfoAPI = (name,contact,gender,academy,selfintroduction,age) => {
    return request({
      url: '/teacher/saveInfo',
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