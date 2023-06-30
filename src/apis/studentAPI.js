import request from '@/utils/http'

//获取课程封面和名字
//url待改
export const getCurriculumAPI = () => {
    return request({
      url: '/home/goods'
    })
}