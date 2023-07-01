import request from '@/utils/http'

/////studentCurriculum 学生课程界面调用方法
//获取课程封面和名字
//最终使用
// export const getCurriculumAPI = () => {
//     return request({
//       url: '/classes/showClasses',
//     })
// }

//测试使用
export const getCurriculumAPI = () => {
  return request({
    url: '/data',
  })
}

//搜索课程 url待改
export const getSearchCurriculumAPI = ({classname}) => {
  return request({
    url: '/',
    method:'POST',
    data:{
      classname
    }
  })
}

/////curriculumDetail 学生选课界面调用方法
//根据课程名称查询课程信息
//最终使用
// export const getCurriculumDetailAPI = ({classname}) => {
//   return request({
//     url: '/DTO/getclass',
//     method:'POST',
//     data:{
//       classname
//     }
//   })
// }

//测试使用
export const getCurriculumDetailAPI = () => {
  return request({
    url:'/classes',
  })
}

//学生选课
//最终使用
// export const getAttendAPI = ({classid,studentid}) => {
//   return request({
//     url:'/selectclass/selectclass',
//     method:'POST',
//     data:{
//       classid,
//       studentid
//     }
//   })
// }

//测试使用
export const getAttendAPI = () => {
  return request({
    url:'/attend',
  })
}

//学生退课
//最终使用
// export const getDropAPI = ({classid,studentid}) => {
//   return request({
//     url:'/selectclass/quitclass',
//     method:'POST',
//     data:{
//       classid,
//       studentid
//     }
//   })
// }

//测试使用
export const getDropAPI = () => {
  return request({
    url:'/attend',
  })
}