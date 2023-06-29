import request from "@/utils/http";

//获取用户头像（学生）
export const getStudentAPI = () => {
    return request({
      url: '/'
    })
}