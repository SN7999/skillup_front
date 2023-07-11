import request from '@/utils/http'


export const getSelfScoreAPI = (arr) => {
	console.log('getSelfScoreAPI执行了arr是')
	console.log(arr)
    return request({
		method:'POST',
		url: '/student/exportGrade',
		data:arr
    })
}
//后台对接测试用
export const getScoreAPI = () => {
	console.log('getScoreAPI执行了')
    return request({
        method:'POST',
        url: '/student/getGrade',
    })
}
//测试用
// export const getScoreAPI = () => {
// 	console.log('getScoreAPI执行了')
//     return request({
//         url: '/studentscore',
		
//     })
// }

export const getSearchScoreExamAPI = (examname) => {
	console.log('getSearchScoreExamAPI执行了'+examname)
    return request({
        method:'POST',
        url: '/student/getGradeByExamName',
		data:examname
    })
}

export const getSearchScoreClassAPI = (classname) => {
	console.log('getSearchScoreClassAPI执行了'+classname)
    return request({
        method:'POST',
        url: '/student/getGradeByExamName',
		data:classname
		
    })
}
// export const getSearchScoreDateAPI = (date) => {
// 	console.log('getSearchScoreDateAPI执行了'+date)
//     return request({
//         method:'POST',
//         url: '/',
// 		data:date
//     })
// }

