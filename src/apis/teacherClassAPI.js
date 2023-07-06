import request from '@/utils/http'

////我的课程详情页
//课程信息
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