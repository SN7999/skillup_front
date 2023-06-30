import request from "@/utils/http";

//获取课程封面和名字
export const getCurriculumAPI = () => {
    return request({
      url: '/photos'
    })
}