import request from '@/utils/http'

export const getStudentsAPI = () => {
	console.log('getStudentsAPI执行了')
    return request({
		method:'POST',
		url: '/teacher/exportStudent',
		
		// 测试用api
        // url: '/getSelectClass',
		
    })
}


export const getStudentAPI = () => {
	console.log('getStudentAPI执行了')
    return request({
		method:'POST',
		url: '/teacher/getSelectClass',
		
		// 测试用api
        // url: '/getSelectClass',
		
    })
}

export const getSearchStudentListByClassAPI = (classname) => {
	console.log('getSearchStudentListByClassAPI执行了'+classname)
    return request({
        method:'POST',
        url: '/teacher/getSelectClassByClassName',
		data:classname
    })
}

export const getSearchStudentListByStudentAPI = (studentname) => {
	console.log('getSearchStudentListByStudentAPI执行了'+studentname)
    return request({
        method:'POST',
        url: '/teacher/getSelectClassByIdOrName',
		data:studentname
    })
}

// export const searchStudentInfoAPI = (studentid) => {
// 	console.log('getSearchStudentListByStudentAPI执行了'+studentid)
//     return request({
//         method:'POST',
//         url: '/',//待改
// 		data:{
// 			studentid
// 		}
//     })
// }

// 测试用
export const searchStudentInfoAPI = (studentid) => {
	console.log('searchStudentInfoAPI执行了'+studentid)
    return request({
        method: 'POST',
        url: '/admin/studentInfo',
        data: studentid
    })
}
