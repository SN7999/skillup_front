import request from '@/utils/http'

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
      url: '/DTO/showExams',
      method:'POST',
      params:{
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
export const getQuestionsAPI = (examid) => {
	console.log(examid)
    return request({
		
		method:'POST',
        // url: '/getExamContent',
		url: '/exam/showExamQuestions',
		params:{examid}
    })
}





// // 测试代码
// export const getExamAPI = () => {
// 	console.log('getExamAPI执行了')
//     return request({
//         url: '/showselectclass'
//     })
// }
// //获取未完成考试的列表
// export const getUnFinishedExamAPI = (classid) => {
// 	console.log('执行了获取未完成考试列表')
//     return request({
//         url: '/showaccessibleexams'
//     })
// }
// // 获取及格考试的列表
// export const getPassExamAPI = (classid) => {
// 	console.log('执行了获取及格考试列表')
//     return request({
//         url: '/showpassexams'
//     })
// }
// //获取不及格考试的列表
// export const getFailExamAPI = (classid) => {
// 	console.log('执行了获取不及格考试列表')
//     return request({
//         url: '/showfailexams'
//     })
// }


// //搜索考试名称
// export const getSearchAPI = (classname) => {
//     return request({
//       url: '/',
//       method:'POST',
//       data:{
//         classname
//       }
//     })
// }


// export const getExamDetailAPI = (classid) => {
// 	// console.log(classid)
//     return request({
//         url: '/getclass',
//     })
// }

// // 获取考试题目
// export const getQuestionsAPI = (examid1) => {
// 	console.log(examid)
//     return request({
//         url: '/getExamContent',
//     })
// }

export const postAnswersAPI = (studentexamList,examid) => {
	console.log(studentexamList)
	console.log(examid)
    return request({
		method:'POST',
        url: '/exam/submitAnswers',
		data: studentexamList,
		params:{examid}
    })
}
