import request from '@/utils/http'

///老师管理
//获取老师列表
export const getTeacherInfoAPI = () => {
  return request({
    url: '/admin/showTeachers'
  })
}

//搜索老师
export const getSearchTeacherAPI = (input) => {
  return request({
    url: '/admin/searchTeacher',
    params: {
      input
    }
  })
}

//显示老师详细信息 这里接口文档写的不清楚
export const getTeacherDetailAPI = (teacherid) => {
  return request({
    method: 'POST',
    url: '/admin/teacherInfo',
    data: teacherid
  })
}

//删除老师 这里接口文档写的不清楚
export const getDeleteTeacherAPI = (teacherid) => {
  return request({
    method: 'POST',
    url: '/admin/deleteTeacher',
    data: teacherid
  })
}

//显示老师注销处理列表
export const getTeacherCancelAPI = () => {
  return request({
    url: '/admin/showApply4TcrCancel'
  })
}

//搜索注销老师
export const getSearchTeacherCancelAPI = (input) => {
  return request({
    url: '/admin/searchTeacher4Cancel',
    data: {
      input
    }
  })
}

//同意注销 这里接口文档写的不清楚
export const getAgreeCancelTeacherAPI = (teacherid) => {
  return request({
    method: 'POST',
    url: '/admin/agreeTcrCancel',
    data: teacherid
  })
}

//驳回注销 这里接口文档写的不清楚
export const getRejectCancelTeacherAPI = (teacherid, reason) => {
  return request({
    method: 'POST',
    url: '/admin/rejectTcrCancel',
    params: {
      reason
    },
    data: teacherid
  })
}
