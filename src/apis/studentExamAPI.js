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
		url: '/DTO/showExams',
        // url: '/showselectclass'
		
		
    })
}
//获取未完成考试的列表
export const getUnFinishedExamAPI = (classid) => {
	console.log('执行了获取未完成考试列表')
    return request({
		method:'POST',
        url: '/exam/showAccessibleExams',
        // url: '/showaccessibleexams'
		data:classid
		
    })
}
// 获取及格考试的列表
export const getPassExamAPI = (classid) => {
	console.log('执行了获取及格考试列表')
    return request({
        method:'POST',
        url: '/exam/showPassExams',
        // url: '/showpassexams'
		data:classid
		
    })
}
//获取不及格考试的列表
export const getFailExamAPI = (classid) => {
	console.log('执行了获取不及格考试列表')
    return request({
        method:'POST',
        url: '/exam/showFailExams',
        // url: '/showfailexams'
		data:classid
		
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


export const getExamDetailAPI = (classid) => {
	// console.log(classid)
    return request({
        method:'POST',
        url: '/DTO/getclass',
        data:classid
    })
}