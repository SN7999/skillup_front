import request from '@/utils/http'

///studentTraining 学生培训界面调用方法
//获取学生已选课程封面和名字
//最终使用
// export const getSelectCurriculumAPI = () => {
//     return request({
//         url: '/student/showSelectClasses',
//     })
// }

//测试使用
export const getSelectCurriculumAPI = () => {
  return request({
    url: '/showselectclass',
  })
}

//搜索课程 url待改
export const getSearchAPI = (classname) => {
    return request({
      url: '/',
      method:'POST',
      data:{
        classname
      }
    })
}

/////trainingDetail 学生培训详情界面调用方法
//最终
// export const getTrainingDetailAPI = (classid) => {
//     return request({
//         method:'POST',
//         url: '/DTO/getclass',
//         data:{
//             classid
//         }
//     })
// }
//测试
export const getTrainingDetailAPI = () => {
    return request({
        url: '/getclass',
    })
}
