import request from '@/utils/http'

/////studentCurriculum 学生课程界面调用方法
//获取课程封面和名字
export const getCurriculumAPI = () => {
    return request({
      url: '/classes/showClasses',
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
export const getCurriculumDetailAPI = ({classname}) => {
  return request({
    url: '/DTO/getclass',
    method:'POST',
    data:{
      classname
    }
  })
}

//学生选课
export const getAttend = ({classid,studentid}) => {
  return request({
    url:'/selectclass/selectclass',
    method:'POST',
    data:{
      classid,
      studentid
    }
  })
}

//学生退课
export const getDrop = ({classid,studentid}) => {
  return request({
    url:'/selectclass/quitclass',
    method:'POST',
    data:{
      classid,
      studentid
    }
  })
}