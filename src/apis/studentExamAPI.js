import request from '@/utils/http'
// 还没改好啊啊啊啊啊啊
//获取考试课程的列表
// export const getExamAPI = () => {
//     return request({
//         method:'GET',
//         url: '/DTO/showExams'
//     })
// }

export const getExamAPI = () => {
	console.log('getExamAPI执行了')
    return request({
        url: '/showselectclass',
		
    })
}
//获取未完成考试的列表
export const getUnFinishedExamAPI = () => {
	console.log('执行了获取未完成考试列表')
    return request({
        // url: '/exam/showAccessibleExams',
        url: '/showaccessibleexams'
		
    })
}
// 获取及格考试的列表
export const getPassExamAPI = () => {
	console.log('执行了获取及格考试列表')
    return request({
        // url: '/exam/showPassExams',
        url: '/showpassexams'
		
    })
}
//获取不及格考试的列表
export const getFailExamAPI = () => {
	console.log('执行了获取不及格考试列表')
    return request({
        // url: '/exam/showFailExams',
        url: '/showfailexams'
		
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