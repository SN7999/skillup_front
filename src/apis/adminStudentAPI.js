import request from '@/utils/http'

///学生管理
//获取学生列表
export const getStudentInfoAPI = () => {
  return request({
    url: '/admin/showStudents'
  })
}

//测试
// export const getStudentInfoAPI = () => {
//   return request({
//     url: '/showStudents'
//   })
// }

//搜索学生
export const getSearchStudentAPI = (input) => {
  return request({
    url: '/admin/searchStudent',
    params: {
      input
    }
  })
}

//显示学生详细信息 这里接口文档写的不清楚
export const getStudentDetailAPI = (studentid) => {
  return request({
    method: 'POST',
    url: '/admin/studentInfo',
    data: studentid
  })
}

//测试
// export const getStudentDetailAPI = () => {
//   return request({
//     url: '/studentinfo'
//   })
// }

//显示学生成绩列表 这里接口文档写的不清楚
// export const getStudentScoreAPI = (studentid) => {
//   return request({
//     url: '/studentinfo',
//     data: {
//       studentid
//     }
//   })
// }

//测试
// export const getStudentScoreAPI = () => {
//   return request({
//     url: '/studentscore'
//   })
// }

//删除学生 这里接口文档写的不清楚
export const getDeleteStudentAPI = (studentid) => {
  return request({
    method: 'POST',
    url: '/admin/deleteStudent',
    data: studentid
  })
}

//显示学生注销处理列表
export const getStudentCancelAPI = () => {
  return request({
    url: '/admin/showApply4StuCancel'
  })
}

//测试
// export const getStudentCancelAPI = () => {
//   return request({
//     url: '/showApply4StuCancel'
//   })
// }

//搜索注销学生
export const getSearchStudentCancelAPI = (input) => {
  return request({
    url: '/admin/searchStudent4Cancel',
    data: {
      input
    }
  })
}

//同意注销 这里接口文档写的不清楚
export const getAgreeCancelStudentAPI = (studentid) => {
  return request({
    method: 'POST',
    url: '/admin/agreeStuCancel',
    data: studentid
  })
}

//驳回注销 这里接口文档写的不清楚
export const getRejectCancelStudentAPI = (studentid, reason) => {
  return request({
    method: 'POST',
    url: '/admin/rejectStuCancel',
    params: {
      reason
    },
    data: studentid
  })
}
