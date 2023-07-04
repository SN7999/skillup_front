import request from '@/utils/http'

///teacherCurriculum
//教师根据状态获取课程
export const getClassesAPI = (status) => {
    return request({
        url:'/teacher/getClasses',
        method:'POST',
        data:{
            status
        }
    })
}

//教师根据课程id查询具体信息
export const getClassDetailAPI = (classid) => {
    return request({
        url:'/teacher/getClassesById',
        method:'POST',
        data:{
            classid
        }
    })
}

///publishClass 老师新增课程
export const getPublishClassAPI = () => {
    return request({
        url: '/teacher/saveClasses',
        method:'POST',
        data:{
            
        }
    })
}

//课程上传封面
export const getPublishCoverAPI = ({file,classid}) => {
    return request({
        url: '/classes/uploadcover',
        method:'POST',
        data:{
            file,
            classid
        }
    })
}

////我的课程详情页
//上传资源 最大50MB 可调节  （form-data）
export const getUploadResourceAPI = ({chapterid,classid,file}) => {
    const formData = new FormData();
    formData.append('chapterid', chapterid);
    formData.append('classid', classid);
    formData.append('file', file);
    return request({
        url: '/resource/upload',
        method:'POST',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data' // 设置请求头部的 Content-Type
        }
    })
}

//删除资源 params
export const getDeleteResourceAPI = (resourceid) => {
    return request({
        url: '/student/deleteresource',
        method:'POST',
        params:{
            resourceid
        }
    })
}

//批量审批多个/单个资源 resourceids资源id数组
export const getAPI = ({resourceids,result,advice}) => {
    return request({
        url: '/resource/examineresource',
        method:'POST',
        data:{
            resourceids,
            result,
            advice
        }
    })
}

//展示所有未审批资源
export const getUnPassedAPI = (classname) => {
    return request({
        url: '/resource/showunpassedresources',
        params:{
            classname
        }
    })
}

//展示所有已通过资源
export const getPassedAPI = (classname) => {
    return request({
        url: '/resource/showpassedresources',
        params:{
            classname
        }
    })
}

//展示所有已驳回资源
export const getRejectedAPI = (classname) => {
    return request({
        url: '/resource/showrejectedresources',
        params:{
            classname
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



///teacherDetail教师显示个人信息
export const getTeacherDetailAPI = () => {
    return request({
        url: '/teacher/getSelectClassByIdOrName',
        method:'POST',
        data:{

        }
    })
}

//显示课程数
export const getClassesCountAPI = () => {
    return request({
        url: '/teacher/getClassesCount',
        method:'POST',
    })
}

//显示学生数
export const getStudentCountAPI = () => {
    return request({
        url: '/teacher/getStudentsCount',
        method:'POST',
    })
}

//更新个人信息
export const getUpdateInfoAPI = ({name,contact,gender,academy,selfintroduction,age}) => {
    return request({
        url: '/teacher/saveInfo',
        method:'POST',
        data:{
            name,
            contact,
            gender,
            academy,
            selfintroduction,
            age
        }
    })
}

//上传教师头像
export const getTeacherAdvatarAPI = ({teacherid,file}) => {
    return request({
        url: '/teacher/uploadImage',
        method:'POST',
        data:{
            teacherid,
            file
        }
    })
}

//修改密码
export const getTeacherPasswordResetAPI = ({originalPassword,newPassword}) => {
    return request({
        url: '/teacher/changePassword',
        method:'POST',
        data:{
            originalPassword,
            newPassword
        }
    })
}

//教师获取验证码
export const getTeacherVerCodeAPI = (email) => {
    return request({
        url: '/teacher/changePassword',
        method:'POST',
        data:{
            email
        }
    })
}


//重置邮箱
export const getTeacherEmailResetAPI = ({newEmail,verCode}) => {
    return request({
        url: '/teacher/emailReset',
        method:'POST',
        data:{
            newEmail,
            verCode
        }
    })
}

//注销账号
export const getTeacherCancelAPI = ({email,verCode}) => {
    return request({
        url: '/student/cancelAccount',
        method:'POST',
        data:{
            email,
            verCode
        }
    })
}