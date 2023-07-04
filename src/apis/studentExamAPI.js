import request from '@/utils/http'
// 还没改好啊啊啊啊啊啊
//获取考试列表
// export const getExamAPI = () => {
//     return request({
//         method:'GET',
//         url: '/DTO/showExams'
//     })
// }
export const getExamAPI = () => {
    return request({
        url: '/showselectclass'
    })
}

//搜索考试名称
export const getSearchAPI = (classname) => {
    return request({
      url: '/',
      method:'POST',
      data:{
        classname
      }
    })
}

export const getExamDetailAPI = () => {
    return request({
        url: '/getclass',
    })
}