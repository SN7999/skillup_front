import request from '@/utils/http'

////我的课程详情页
//课程信息
//教师根据课程id查询具体信息
export const getClassDetailAPI = (classid) => {
  return request({
    url: '/teacher/getClassesById',
    method: 'POST',
    data: {
      classid
    }
  })
}

//测试
// export const getClassDetailAPI = () => {
//     return request({
//         url:'/showClassDetail',
//     })
// }

//最终
export const getResourceAPI = (classid) => {
  return request({
    method: 'POST',
    url: '/DTO/getclassTeacher',
    params: {
      classid: classid
    }
  })
}
//测试
// export const getResourceAPI = () => {
//     return request({
//         url: '/getclass',
//     })
// }

//添加公告
export const getUpdateAnnounceAPI = (classid, announcement) => {
  return request({
    method: 'POST',
    url: '/teacher/announce',
    data: {
      classid,
      announcement
    }
  })
}

//新增章节
export const getAddChapterAPI = (
  chaptername,
  introduction,
  classid,
  chapternum
) => {
  return request({
    method: 'POST',
    url: '/chapter/addchapter',
    params: {
      chaptername,
      introduction,
      classid,
      chapternum
    }
  })
}

//删除章节
export const getDeleteChapterAPI = (chapterid, classid) => {
  return request({
    method: 'POST',
    url: '/chapter/deletechapter',
    params: {
      chapterid,
      classid
    }
  })
}

//展示未审批资源
export const getUnpassResourceAPI = (classname) => {
  return request({
    url: '/resource/showunpassedresources',
    params: {
      classname
    }
  })
}

// export const getUnpassResourceAPI = () => {
//     return request({
//         url: '/showunpassedresources',
//     })
// }

//展示已驳回资源
export const getRejectResourceAPI = (classname) => {
  return request({
    url: '/resource/showrejectedresources',
    params: {
      classname
    }
  })
}

// export const getRejectResourceAPI = () => {
//     return request({
//         url: '/showunpassedresources',
//     })
// }

//上传资源 最大50MB 可调节  （form-data）
export const getUploadResourceAPI = (chapterid, formData) => {
  for (const entry of formData.entries()) {
    console.log(entry)
  }
  return request({
    url: '/resource/upload',
    method: 'POST',
    params: {
      chapterid
    },
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
    method: 'POST',
    params: {
      resourceid
    }
  })
}

//批量审批多个/单个资源 resourceids资源id数组
export const getAPI = ({ resourceids, result, advice }) => {
  return request({
    url: '/resource/examineresource',
    method: 'POST',
    data: {
      resourceids,
      result,
      advice
    }
  })
}

export const postScoreAPI = (questionid, studentid, score) => {
  console.log('提交了分数' + questionid + ' ' + studentid + ' ' + score)
  return request({
    method: 'POST',
    url: '/teacher/giveScore',

    params: {
      questionid,
      studentid,
      score
    }
  })
}

// 查看成绩界面获取可查看成绩的考试列表
export const getExamScoreAPI = (classid) => {
  console.log('执行了获取可查看成绩的考试列表' + classid)
  return request({
    method: 'POST',
    url: '/grade/getcheckedexam',
    data: classid
  })
}
// 查看点击进去的考试的成绩
export const getScoreContentAPI = (examid) => {
  console.log('执行了查看点击进去的考试的成绩列表' + examid)
  return request({
    method: 'POST',
    url: '/grade/getgrade',
    data: examid
  })
}

export const getExamAPI = (classid) => {
  console.log('执行了获取可批改的考试列表' + classid)
  return request({
    method: 'POST',
    url: '/exam/showCheckableExams',
    data: classid
  })
}

export const getQuestionAPI = (examid) => {
  console.log('执行了获取可批改的题目列表' + examid)
  return request({
    method: 'POST',
    url: '/teacher/showExamQuestions',
    params: { examid }
  })
}

export const getMarkAPI = (questionid) => {
  console.log('执行了获取可批改的题目答案列表' + questionid)
  return request({
    method: 'POST',
    url: '/teacher/showStudentExams',
    params: { questionid }
  })
}

//返回可选时间段
export const getPeriodAPI = (date) => {
  console.log(`output->date`, date)
  return request({
    method: 'POST',
    url: '/teacher/getUsedPeriod',
    data: date
  })
}

//新增考试
export const getSaveExamAPI = (name, totalTime, date, classid) => {
  console.log(`output->name`, name)
  console.log(`output->total_time`, totalTime)
  console.log(`output->date`, date)
  console.log(`output->classid`, classid)
  return request({
    method: 'POST',
    url: '/teacher/saveExam',
    data: {
      name,
      totalTime,
      date,
      classid
    }
  })
}

//教师查看考试
export const getShowExamAPI = (classid) => {
  return request({
    method: 'POST',
    url: '/teacher/showExams',
    data: classid
  })
}

//上传Excel文件
export const getUploadExcelAPI = (formData, examid) => {
  for (const entry of formData.entries()) {
    console.log(entry)
  }
  console.log(`output->examid`, examid)
  return request({
    url: '/teacher/examUpload',
    method: 'POST',
    params: {
      examid
    },
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data' // 设置请求头部的 Content-Type
    }
  })
}

//上传doc文件
export const getUploadDocAPI = (formData, examid) => {
  for (const entry of formData.entries()) {
    console.log(entry)
  }
  console.log(`output->examid`, examid)
  return request({
    url: '/teacher/examUploadDocx',
    method: 'POST',
    params: {
      examid
    },
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data' // 设置请求头部的 Content-Type
    }
  })
}

//上传测试题库
export const getUploadTestAPI = (formData, chapterid) => {
  for (const entry of formData.entries()) {
    console.log(entry)
  }
  console.log(`output->chapterid`, chapterid)
  return request({
    url: '/chapter/importQuestion',
    method: 'POST',
    params: {
      chapterid
    },
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data' // 设置请求头部的 Content-Type
    }
  })
}

//我的测试题库
export const getMyTestAPI = (chapterid) => {
  console.log(`output->chapterid`, chapterid)
  return request({
    url: '/question/getQuestions',
    method: 'POST',
    data: chapterid
  })
}
