import request from '@/utils/http'

////我的课程详情页
//课程信息
//教师根据课程id查询具体信息
export const getClassDetailAPI = (classid) => {
  return request({
    url: '/teacher/getClassesById',
    method: 'POST',
    data: {
      classid
    }
  })
}

//测试
// export const getClassDetailAPI = () => {
//     return request({
//         url:'/showClassDetail',
//     })
// }

//最终
export const getResourceAPI = (classid) => {
  return request({
    method: 'POST',
    url: '/DTO/getclassTeacher',
    params: {
      classid: classid
    }
  })
}
//测试
// export const getResourceAPI = () => {
//     return request({
//         url: '/getclass',
//     })
// }

//添加公告
export const getUpdateAnnounceAPI = (classid, announcement) => {
  return request({
    method: 'POST',
    url: '/teacher/announce',
    data: {
      classid,
      announcement
    }
  })
}

//新增章节
export const getAddChapterAPI = (
  chaptername,
  introduction,
  classid,
  chapternum
) => {
  return request({
    method: 'POST',
    url: '/chapter/addchapter',
    params: {
      chaptername,
      introduction,
      classid,
      chapternum
    }
  })
}

//删除章节
export const getDeleteChapterAPI = (chapterid, classid) => {
  return request({
    method: 'POST',
    url: '/chapter/deletechapter',
    params: {
      chapterid,
      classid
    }
  })
}

//展示未审批资源
export const getUnpassResourceAPI = (classname) => {
  return request({
    url: '/resource/showunpassedresources',
    params: {
      classname
    }
  })
}

// export const getUnpassResourceAPI = () => {
//     return request({
//         url: '/showunpassedresources',
//     })
// }

//展示已驳回资源
export const getRejectResourceAPI = (classname) => {
  return request({
    url: '/resource/showrejectedresources',
    params: {
      classname
    }
  })
}

// export const getRejectResourceAPI = () => {
//     return request({
//         url: '/showunpassedresources',
//     })
// }

//上传资源 最大50MB 可调节  （form-data）
export const getUploadResourceAPI = (chapterid, formData) => {
  for (const entry of formData.entries()) {
    console.log(entry)
  }
  return request({
    url: '/resource/upload',
    method: 'POST',
    params: {
      chapterid
    },
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data' // 设置请求头部的 Content-Type
    }
  })
}

//删除资源 params
export const getDeleteResourceAPI = (resourceid) => {
  return request({
    url: '/student/deleteresource',
    method: 'POST',
    params: {
      resourceid
    }
  })
}

//批量审批多个/单个资源 resourceids资源id数组
export const getAPI = ({ resourceids, result, advice }) => {
  return request({
    url: '/resource/examineresource',
    method: 'POST',
    data: {
      resourceids,
      result,
      advice
    }
  })
}
