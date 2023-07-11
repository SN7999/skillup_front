import request from '@/utils/http'

//未审核的新课程申请
export const getUnpassClassAPI = (classname) => {
  return request({
    url: '/classes/showUnexaminedClasses',
    params: {
      classname
    }
  })
}

// export const getUnpassClassAPI = (classname) => {
//   return request({
//     url: '/showUnexaminedClasses',
//     params: {
//       classname
//     }
//   })
// }

//已驳回的新课程申请
export const getRejectClassAPI = (classname) => {
  return request({
    url: '/classes/showRejectedClasses',
    params: {
      classname
    }
  })
}

// export const getRejectClassAPI = () => {
//   return request({
//     url: '/showRejectedClasses'
//   })
// }

//未审核课程资源更新
export const getUnpassResourceAPI = (classname) => {
  return request({
    url: '/resource/showunpassedresources',
    params: {
      classname
    }
  })
}

// export const getUnpassResourceAPI = () => {
//   return request({
//     url: '/showunpassedresources'
//   })
// }

//已驳回的课程资源更新
export const getRejectResourceAPI = (classname) => {
  return request({
    url: '/resource/showrejectedresources',
    params: {
      classname
    }
  })
}

// export const getRejectResourceAPI = () => {
//   return request({
//     url: '/showrejectedresources'
//   })
// }

//审核通过的课程及资源
export const getPassAPI = (classname) => {
  return request({
    method: 'POST',
    url: '/DTO/getclassAdmin',
    params: {
      classname
    }
  })
}
// export const getPassAPI = (classname) => {
//   return request({
//     url: '/getclassAdmin',
//     params: {
//       classname
//     }
//   })
// }

//审批课程
//管理员审批课程 result 1是审批通过 0是驳回 advice 只有驳回时才有 驳回后通过邮件发送到教师邮箱
export const getExamineClassAPI = (classid, result, advice) => {
  return request({
    url: '/classes/examineclass',
    method: 'POST',
    data: [classid],
    params: {
      result,
      advice
    }
  })
}

//审批资源
export const getExamineResourceAPI = (resourceid, result, advice) => {
  return request({
    url: '/resource/examineresource',
    method: 'POST',
    data: {
      resourceids: [resourceid],
      result: result,
      advice: advice
    }
  })
}

//新增管理员
export const getNewAdminAPI = (name, password) => {
  return request({
    url: '/admin/save',
    method: 'POST',
    data: {
      name,
      password
    }
  })
}

//展示教师详情
export const getTeacherDetailAPI = (teacherid) => {
  return request({
    method: 'POST',
    url: '/admin/teacherInfo',
    data: teacherid
  })
}

// export const getTeacherDetailAPI = () => {
//   return request({
//     url: '/studentinfo'
//   })
// }

//展示课程详情
export const getClassDetailAPI = (classid) => {
  return request({
    url: '/teacher/getClassesById',
    method: 'POST',
    data: {
      classid
    }
  })
}

// export const getClassDetailAPI = () => {
//   return request({
//     url: '/getClassesById'
//   })
// }
