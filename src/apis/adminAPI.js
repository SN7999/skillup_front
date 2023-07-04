import request from '@/utils/http'

//审批课程
//管理员审批课程 result 1是审批通过 0是驳回 advice 只有驳回时才有 驳回后通过邮件发送到教师邮箱
export const getClassesAPI = ({classid,teacherid,result,advice}) => {
    return request({
        url:'/classes/examineclass',
        method:'POST',
        params:{
            classid,
            teacherid,
            result,
            advice
        }
    })
}

//新增管理员
export const getNewAdminAPI = ({name,password}) => {
    return request({
        url:'/admin/save',
        method:'POST',
        params:{
            name,
            password
        }
    })
}