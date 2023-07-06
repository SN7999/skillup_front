import request from '@/utils/http'

///teacherCurriculum
//教师根据状态获取课程
// export const getClassesAPI = (status) => {
//     return request({
//         url:'/teacher/getClasses',
//         method:'POST',
//         data:
//             status
        
//     })
// }

//测试
export const getClassesAPI = () => {
    return request({
        url:'/showselectclass'
    })
}

//教师根据课程id查询具体信息
// export const getClassDetailAPI = (classid) => {
//     return request({
//         url:'/teacher/getClassesById',
//         method:'POST',
//         data:
//             classid
//     })
// }

//测试
export const getClassDetailAPI = () => {
    return request({
        url:'/showClassDetail',
    })
}

///publishClass 老师新增课程
export const getPublishClassAPI = (classname,introduction,period,starttime,endtime,cover) => {
    return request({
        url: '/teacher/saveClasses',
        method:'POST',
        data:{
            classname,
            introduction,
            period,
            starttime,
            endtime,
            cover
        }
    })
}

////teacherStudent
//教师查询所有选课学生选课记录
export const getStudentAPI = () => {
    return request({
        url: '/teacher/getSelectClass',
        method:'POST',
    })
}

//教师根据课程名称查询学生选课记录
export const getSearchStudentByClassidAPI = (classname) => {
    return request({
        url: '/teacher/getSelectClassByClassName',
        method:'POST',
        data:{
            classname
        }
    })
}

//教师根据学生id或名字查询学生选课记录列表
export const getSearchStudentByidAPI = () => {
    return request({
        url: '/teacher/getSelectClassByClassName',
        method:'POST',
        data:{
            
        }
    })
}