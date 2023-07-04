import request from '@/utils/http'

///studentCurriculum 学生课程界面调用方法
// 获取课程封面和名字
// 最终使用
export const getCurriculumAPI = () => {
    return request({
      url: '/classes/showClassesname',
    })
}

//测试使用
// export const getCurriculumAPI = () => {
//   return request({
//     url: '/data',
//   })
// }

//搜索课程 url待改
export const getSearchCurriculumAPI = (classname) => {
  return request({
    url: '/',
    method:'POST',
    data:{
      classname
    }
  })
}

/////curriculumDetail 学生选课界面调用方法
//根据课程名称查询课程信息
//最终使用
// export const getCurriculumDetailAPI = ({classname}) => {
//   return request({
//     url: '/classes/showClassDetail',
//     method:'POSt',
//     data:{
//       classname
//     }
//   })
// }

export const getCurriculumDetailAPI = ( classname ) => {
  return request({
    url: '/classes/showClassDetail',
    params: {
      classname
    }
  });
};

//测试使用
// export const getCurriculumDetailAPI = () => {
//   return request({
//     url:'/classes',
//   })
// }

//学生选课
//最终使用
export const getAttendAPI = (classid1) => {
  console.log({classid1})
  return request({
    url:'/selectclass/selectclass',
    method:'POST',
    data: {
      classid1
    },
  })
}

// export const getAttendAPI = (classid1) => {
//   const jsonData = JSON.stringify({ classid1 });
//   console.log('请求体:', jsonData); // 打印请求体
//   return request({
//     url: '/selectclass/selectclass',
//     method: 'POST',
//     data: jsonData,
//     headers: {
//       'Content-Type': 'application/json', // 设置Content-Type头为application/json
//     },
//   });
// }

//测试使用
// export const getAttendAPI = () => {
//   return request({
//     url:'/attend',
//   })
// }

//学生退课
//最终使用
export const getDropAPI = (classid1) => {
  return request({
    url:'/selectclass/quitclass',
    method:'POST',
    data:{
      classid1,
    }
  })
}

//测试使用
// export const getDropAPI = () => {
//   return request({
//     url:'/attend',
//   })
// }