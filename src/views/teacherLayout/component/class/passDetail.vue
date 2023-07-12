<script setup>
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { ref, onMounted, computed, nextTick, watch } from 'vue'
import {
  getExamScoreAPI,
  getScoreContentAPI,
  getExamAPI,
  postScoreAPI,
  getQuestionAPI,
  getMarkAPI,
  getClassDetailAPI,
  getResourceAPI,
  getAddChapterAPI,
  getDeleteChapterAPI,
  getUnpassResourceAPI,
  getRejectResourceAPI,
  getUpdateAnnounceAPI,
  getUploadResourceAPI,
  getPeriodAPI,
  getSaveExamAPI,
  getShowExamAPI,
  getUploadExcelAPI,
  getUploadDocAPI,
  getUploadTestAPI,
  getMyTestAPI
} from '@/apis/teacherClassAPI'

const route = useRoute()
const classid = route.params.id
const router = useRouter()
const gotoPrevious = () => {
  router.push('/teacher')
}

const selectedMenuItem = ref('classinfo')
const selectedMenu = ref('classinfo')

const selectMenuItem = (item) => {
  selectedMenuItem.value = item
  selectedMenu.value = item
}

const activeTab = ref('myResource')

function changeTab(tab) {
  activeTab.value = tab
}

const activeTab1 = ref('myExamList')

function changeTab1(tab) {
  activeTab1.value = tab
}

//获取课程信息
const detail = ref(null)
const getClassDetail = async () => {
  console.log('classid' + classid)
  const result = await getClassDetailAPI(classid)
  detail.value = result.data.data
}

//获取章节、资源
//最终使用
const detialInfo = ref(null)
const getDetailInfo = async () => {
  console.log(classid)
  const result = await getResourceAPI(classid)
  detialInfo.value = result.data.data
  getUnpassResource(detialInfo.value.classes.classname)
  getRejectResource(detialInfo.value.classes.classname)
}

const unpassResource = ref([])
//获取未审核资源
const getUnpassResource = async (classname) => {
  const result = await getUnpassResourceAPI(classname)
  unpassResource.value = result.data.data
}

const rejectResource = ref([])
//获取已驳回资源
const getRejectResource = async (classname) => {
  const result = await getRejectResourceAPI(classname)
  rejectResource.value = result.data.data
}

const announceDialogVisible = ref(false)
const announce = ref(null)
//更新公告
const updateAnnounce = () => {
  announceDialogVisible.value = true
}

const addAnnounce = async () => {
  console.log('classid' + classid)
  console.log('announce' + announce.value)
  const result = await getUpdateAnnounceAPI(classid, announce.value)
  if (result.data.code == 200) {
    ElMessage.success('更新公告成功')
    getClassDetail()
  } else {
    ElMessage.error('更新失败')
  }
  announce.value = null
  announceDialogVisible.value = false
}

const updateChapterVisible = ref(false)
const addChapterDialogVisible = ref(false)

//点击更新章节
const updateChapter = () => {
  updateChapterVisible.value = true
}

//更新章节点击返回
const hideUpdateChapter = () => {
  updateChapterVisible.value = false
  getDetailInfo()
}

//删除章节
const deleteChapter = async (chapterid) => {
  const result = await getDeleteChapterAPI(chapterid, classid)
  if (result.data.code == 200) {
    ElMessage.success('删除课程成功')
    getDetailInfo(classid)
  } else {
    ElMessage.error('删除课程失败')
  }
}

const addChapterForm = ref({
  name: '',
  introduction: ''
})

//新增章节
const addChapter = async () => {
  const result = await getAddChapterAPI(
    addChapterForm.value.name,
    addChapterForm.value.introduction,
    classid,
    detialInfo.value.chapters.length + 1
  )
  if (result.data.code == 200) {
    ElMessage.success('新增课程成功')
    getDetailInfo(classid)
  } else {
    ElMessage.error('新增课程失败')
  }
  addChapterForm.value.name = ''
  addChapterForm.value.introduction = ''
  addChapterDialogVisible.value = false
}

const updateResourceVisible = ref(false)
//点击新增资源
const updateResource = () => {
  updateResourceVisible.value = true
}

//新增资源点击返回
const hideUpdateResource = () => {
  updateResourceVisible.value = false
  getDetailInfo()
}

const chapterExpanded = ref({})

function toggleCollapse(chapter) {
  chapterExpanded.value[chapter.chapter.chapternum] =
    !chapterExpanded.value[chapter.chapter.chapternum]
}

const showChapter = ref('')
const showVideo = ref(false)
const selectedVideo = ref('')
//let videos = document.getElementById('playVideos')
const showTxtContent = ref(false)
const txtContent = ref('')
const selectedTxtUrl = ref('')

const showVide = (chapterid, resource) => {
  showChapter.value = chapterid
  selectedVideo.value = resource.url.replace(/\?.*/, '')
  showVideo.value = true
}

const getVideo = () => {
  return selectedVideo.value
}

const videoBack = () => {
  showChapter.value = null
  selectedVideo.value = null
  showVideo.value = false
}

const showTxt = (resource) => {
  selectedTxtUrl.value = resource.url
    .replace(/(http|https):\/\/[^\s/]+/, '')
    .replace(/\?.*/, '')
  //console.log('/api2'+selectedTxtUrl.value)
  getTxtContent('/api2' + selectedTxtUrl.value)
}

const getTxtContent = (url) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.text()
    })
    .then((data) => {
      txtContent.value = data
      showTxtContent.value = true
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

const txtBack = () => {
  selectedTxtUrl.value = null
  showTxtContent.value = false
}

const downloadDocument = (resource) => {
  const link = document.createElement('a')
  link.href = resource.url
  link.target = '_blank'
  link.setAttribute('download', resource.filename)
  link.click()
}

const showPt = ref(false)
const selectedPPT = ref(null)

const showPPT = (resource) => {
  console.log(`output->resource.url`, resource.url)
  selectedPPT.value =
    'https://view.officeapps.live.com/op/view.aspx?src=' +
    resource.url.split('?')[0]
  console.log(`output->selectedPPT.value`, selectedPPT.value)
  showPt.value = true
}

const getPPT = () => {
  return selectedPPT.value
}

const pptBack = () => {
  showPt.value = false
  selectedPPT.value = null
}

//新增资源选择的章节
const selectedChapter = ref('')
const selectedType = ref('')

const hasVideos = computed(() => {
  if (selectedChapter.value) {
    const vid = ref(false)
    if (detialInfo.value.resources) {
      vid.value = detialInfo.value.resources.some(
        (resource) =>
          resource.chapterId === selectedChapter.value &&
          resource.type === '视频'
      )
      if (vid.value == true) {
        return vid
      }
    }
    if (unpassResource.value) {
      vid.value = unpassResource.value.some(
        (resource) =>
          resource.chapterId === selectedChapter.value &&
          resource.type === '视频'
      )
      if (vid.value == true) {
        return vid
      }
    }
    if (rejectResource.value) {
      vid.value = rejectResource.value.some(
        (resource) =>
          resource.chapterId === selectedChapter.value &&
          resource.type === '视频'
      )
      if (vid.value == true) {
        return vid
      }
    }
  }
  return false
})

const hasTexts = computed(() => {
  if (selectedChapter.value) {
    const vid = ref(false)
    if (detialInfo.value.resources) {
      vid.value = detialInfo.value.resources.some(
        (resource) =>
          resource.chapterId === selectedChapter.value &&
          resource.type === '文本'
      )
      if (vid.value == true) {
        return vid
      }
    }
    if (unpassResource.value) {
      vid.value = unpassResource.value.some(
        (resource) =>
          resource.chapterId === selectedChapter.value &&
          resource.type === '文本'
      )
      if (vid.value == true) {
        return vid
      }
    }
    if (rejectResource.value) {
      vid.value = rejectResource.value.some(
        (resource) =>
          resource.chapterId === selectedChapter.value &&
          resource.type === '文本'
      )
      if (vid.value == true) {
        return vid
      }
    }
  }
  return false
})

const uploadReApi =
  '/api3' + '/resource/upload?chapterid=' + selectedChapter.value

const uploading1 = ref(false)
const handleBeforeUpload = async (file) => {
  console.log('handleBeforeUpload called')
  if (uploading1.value) {
    return false
  }
  uploading1.value = true
  // 创建一个新的 FormData 对象
  const formData = new FormData()
  // 添加 classid 和 chapterid 到 FormData
  //formData.append('chapterid', selectedChapter.value)
  // 将文件添加到 FormData
  formData.append('file', file.raw)
  // 将文件名字添加到 FormData
  formData.append('name', file.name)
  for (const entry of formData.entries()) {
    console.log(entry)
  }
  // 使用自定义的上传方法，将 formData 作为参数传递
  const result = await getUploadResourceAPI(selectedChapter.value, formData)
  console.log(result.data)
  console.log(result.data.code)
  if (result.data.code == 200) {
    ElMessage.success('上传成功')
  } else {
    ElMessage.error('上传失败')
  }
  uploading1.value = true
  // 阻止默认的上传行为
  return false
}

const handleChange = (file) => {
  console.log('handle change')
  if (file !== null) {
    // 选择了文件，手动调用 handleBeforeUpload
    handleBeforeUpload(file)
  }
}

const dialogVisible = ref(false)
const selectedOption = ref('')
const downloadUrls = {
  word: 'http://skillup.oss-cn-beijing.aliyuncs.com/word%E6%A8%A1%E6%9D%BF.docx',
  excel:
    'http://skillup.oss-cn-beijing.aliyuncs.com/excel%E6%A8%A1%E6%9D%BF.xlsx'
}

const showDialog = () => {
  dialogVisible.value = true
}

const resetDialog = () => {
  dialogVisible.value = false
  selectedOption.value = ''
}

const downloadTemplate = () => {
  if (selectedOption.value === 'word') {
    window.location.href = downloadUrls.word
  } else if (selectedOption.value === 'excel') {
    window.location.href = downloadUrls.excel
  }
}

const downloadTest = () => {
  window.location.href =
    'http://skillup.oss-cn-beijing.aliyuncs.com/question%E6%A8%A1%E6%9D%BF.xlsx'
}

const examList = ref([])
const questionList = ref([])
const markList = ref([])
const scoreShowList = ref([])
const examScoreList = ref([])

// // 测试数据
// const examList = [
//       { date: '2023-6-15', name: '母猪的产后护理', totalTime: '100' },
//       { date: '2023-6-18', name: '霸道GPT爱上我', totalTime: '60' },
//       { date: '2023-7-5', name: '怀民亦未寝', totalTime: '120' },
// ];
const barChart = ref(null)
const pieChart = ref(null)
const markselected = ref('exampage')
const scoreselected = ref('examscorepage')
const questionshow = ref('')
const questionscore = ref('')
const questionidshow = ref('')
const studentidshow = ref('')
const studentnameshow = ref('')
const studentanswershow = ref('')
const scoreshow = ref(false)
const nextbtn = ref(true)
const score = ref()
const totalScoreShow = ref('')
// 初始化图表
const initBarChart = () => {
  nextTick(() => {
    const myChart = echarts.init(barChart.value)

    // 后台返回的成绩数据
    const scores = scoreShowList.value

    // 根据成绩范围生成横轴刻度
    const axisData = []
    // for (let i = 100; i > 0; i -= 20) {
    axisData.push(
      totalScoreShow.value + '~' + Math.round(totalScoreShow.value * 0.8)
    )
    axisData.push(
      Math.round(totalScoreShow.value * 0.8) +
        '~' +
        Math.round(totalScoreShow.value * 0.6)
    )
    axisData.push(Math.round(totalScoreShow.value * 0.6) + '~0')
    // }

    // 计算每个刻度范围内的成绩数量
    const data = []
    for (const axis of axisData) {
      const range = axis.split('~')
      const count = scores.filter(
        (score) =>
          score.grade >= parseInt(range[1]) && score.grade <= parseInt(range[0])
      ).length
      data.push({ axis, count })
    }

    myChart.setOption({
      title: {
        text: '成绩分布柱状图'
      },
      xAxis: {
        type: 'category',
        data: axisData
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: function (value) {
            if (Number.isInteger(value)) {
              return value
            }
            return ''
          }
        }
      },
      series: [
        {
          type: 'bar',
          data: data.map((item) => item.count)
        }
      ]
    })
  })
}

const setexamscorepage = () => {
  scoreselected.value = 'examscorepage'
}
const setexamscoredetailpage = () => {
  scoreselected.value = 'examscoredetailpage'
}
const setexampage = () => {
  markselected.value = 'exampage'
}
const setquestionpage = () => {
  markselected.value = 'questionpage'
}
const setmarkpage = () => {
  markselected.value = 'markpage'
}
const setquestionshow = (question) => {
  questionshow.value = question
}
const setquestionscore = (score) => {
  questionscore.value = score
}
const setquestionidshow = (questionid) => {
  questionidshow.value = questionid
}
// const hidenextbtn = () => {
//   nextbtn.value = false
// }
// 批改试卷界面获取考试列表
const getExamLists = async (classid) => {
  console.log('批改试卷界面获取的classid' + classid)
  const result = await getExamAPI(classid)
  examList.value = result.data.data
  // examList.value = examList.value.filter(item => item.status !== '未批改');
  console.log(examList.value)
}
// 查看成绩界面获取考试列表
const getExamScoreLists = async (classid) => {
  console.log('查看成绩界面获取的classid' + classid)
  const result = await getExamScoreAPI(classid)
  examScoreList.value = result.data.data
  console.log(examScoreList.value)
}
//获取可批改的题目列表
const getQuestionLists = async (examid) => {
  console.log('获取的examid' + examid)
  const result = await getQuestionAPI(examid)
  questionList.value = result.data.data
  // examList.value = examList.value.filter(item => item.status !== '未批改');
  console.log(questionList.value)
}
//获取点击进去的考试的成绩
const getScoreContent = async (exam) => {
  console.log('获取的exam')
  console.log(exam.totalScore)
  totalScoreShow.value = exam.totalScore
  const result = await getScoreContentAPI(exam.id)
  scoreShowList.value = result.data.data
  console.log(scoreShowList.value)
  initBarChart()
}
const getMarkLists = async (questionid) => {
  console.log('获取的exam')
  console.log(exam.totalScore)
  totalScoreShow.value = exam.totalScore
  const result = await getScoreContentAPI(exam.id)
  markList.value = result.data.data
  // examList.value = examList.value.filter(item => item.status !== '未批改');
  console.log(markList.value)
  showNextAnswer()
}
const showNextAnswer = () => {
  score.value = ''
  let currentItemIndex = 0
  console.log(markList.value.length)
  while (currentItemIndex < markList.value.length) {
    if (markList.value[currentItemIndex].score === 0) {
      // 符合条件，显示该项
      scoreshow.value = true
      studentidshow.value = markList.value[currentItemIndex].studentid
      studentnameshow.value = markList.value[currentItemIndex].studentname
      studentanswershow.value = markList.value[currentItemIndex].studentanswer
      console.log(scoreshow.value)
      break
    } else {
      score.value = ''
      scoreshow.value = false
      studentidshow.value = ''
      studentnameshow.value = ''
      studentanswershow.value = ''
    }

    currentItemIndex++
  }
}
const clearAll = () => {
  score.value = ''
  scoreshow.value = false
  studentidshow.value = ''
  studentnameshow.value = ''
  studentanswershow.value = ''
}
const postscore = async (questionid, studentid, score) => {
  console.log(questionid, studentid, score)
  const result = await postScoreAPI(questionid, studentid, score)
  if (result.data.code == 200) {
    ElMessage({ type: 'success', message: '提交成功' })
    console.log('questionidshow:' + questionidshow.value)
    getMarkLists(questionidshow.value)
  } else {
    ElMessage({ type: 'error', message: '提交失败' })
  }
}

const showDialogFile = ref(false)
const showUploadDialog = ref(false)

const showDialogExam = () => {
  showDialogFile.value = true
}

const showTestDialog = ref(false)
const uploading = ref(false)
//展示上传题库的dialog
const showDialogTest = () => {
  showTestDialog.value = true
}

//上传题库对应的章节
const selectedTestChapter = ref('')

const handleBeforeUploadTest = async (file) => {
  console.log('handleBeforeUploadTest called')
  if (uploading.value) {
    return false
  }
  uploading.value = true
  // 创建一个新的 FormData 对象
  const formData = new FormData()
  // 将文件添加到 FormData
  formData.append('file', file.raw)
  for (const entry of formData.entries()) {
    console.log(entry)
  }
  // 使用自定义的上传方法，将 formData 作为参数传递
  const result = await getUploadTestAPI(formData, selectedTestChapter.value)
  if (result.data.code == 200) {
    ElMessage.success('上传成功')
    selectedTestChapter.value = null
    showTestDialog.value = false
  } else {
    ElMessage.error('上传失败')
  }
  uploading.value = false
  // 阻止默认的上传行为
  return false
}

const handleChangeTest = (file) => {
  console.log('handle change Test')
  if (file !== null) {
    // 选择了文件，手动调用
    handleBeforeUploadTest(file)
  }
}

const myTest = ref([])
const showMyTest = async (chapterid) => {
  const result = await getMyTestAPI(chapterid)
  myTest.value = result.data.data
  console.log(`output->myTest.value`, myTest.value)
}

const selectedTestChapterShow = ref('')

// 监听 selectedTestChapterShow 的变化
watch(selectedTestChapterShow, (newChapterId) => {
  // 调用 showMtTest 方法
  showMyTest(newChapterId)
})

const examname = ref(null)
const date = ref(new Date())
const period = ref(null)
const starttime = ref(null)
const duration = ref(0)

const datePickerOptions = {
  disabledDate: (time) => {
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    return time.getTime() < currentDate.getTime()
  }
}

const periods = ref([0, 0, 0])
const showPeriod = async () => {
  const formattedDate = date.value.toISOString().split('T')[0]
  console.log(`output->formattedDate`, formattedDate)
  const result = await getPeriodAPI(formattedDate)
  periods.value = result.data.data
  console.log(`output->periods.value`, periods.value)
}

watch(date, showPeriod)

const timePickerOptions = {
  selectableRange: '08:30:00 - 20:30:00'
}

const uploadUrl = '' // Provide the upload URL

const closeDialogFile = () => {
  showDialogFile.value = false
  date.value = null
  period.value = null
  starttime.value = null
  duration.value = 0
  periods.value = [0, 0, 0]
}

const examid = ref(null)

const saveExam = async () => {
  console.log(`output->examname.value`, examname.value)
  console.log(`output->duration.value`, duration.value)
  const formattedDate = date.value.toISOString().split('T')[0]
  console.log(`output->formattedDate`, formattedDate)
  const formattedTime = starttime.value.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  console.log(`output->formattedTime`, formattedTime)
  const time = formattedDate + ' ' + formattedTime
  console.log(`output->time`, time)
  const result = await getSaveExamAPI(
    examname.value,
    duration.value,
    time,
    classid
  )
  console.log(`output->result.data`, result.data)
  if (result.data.code == 200) {
    ElMessage.success('新增考试成功')
    examid.value = result.data.data.id
    console.log(`output->examid.value`, examid.value)
    showDialogFile.value = false
    date.value = null
    period.value = null
    starttime.value = null
    duration.value = 0
    periods.value = [0, 0, 0]
    showUploadDialog.value = true
  } else {
    ElMessage.error('新增考试失败')
  }
}

const myExam = ref([])
const showExam = async () => {
  const result = await getShowExamAPI(classid)
  myExam.value = result.data.data
  console.log(`output->myExam.value`, myExam.value)
}

const uploadMethod = ref(null)

const uploading2 = ref(false)
const handleBeforeUploadExcel = async (file) => {
  console.log('handleBeforeUploadExcel called')
  if (uploading2.value) {
    return false
  }
  uploading2.value = true
  // 创建一个新的 FormData 对象
  const formData = new FormData()
  // 将文件添加到 FormData
  formData.append('file', file.raw)
  for (const entry of formData.entries()) {
    console.log(entry)
  }
  // 使用自定义的上传方法，将 formData 作为参数传递
  const result = await getUploadExcelAPI(formData, examid.value)
  if (result.data.code == 200) {
    ElMessage.success('上传成功')
    examid.value = null
    uploadMethod.value = null
    showUploadDialog.value = false
    showExam()
  } else {
    ElMessage.error('上传失败')
  }
  uploading2.value = false
  // 阻止默认的上传行为
  return false
}

const handleChangeExcel = (file) => {
  console.log('handle change Excel')
  if (file !== null) {
    // 选择了文件，手动调用
    handleBeforeUploadExcel(file)
  }
}

const uploading3 = ref(false)
const handleBeforeUploadDoc = async (file) => {
  console.log('handleBeforeUploadExcel called')
  if (uploading3.value) {
    return false
  }
  uploading3.value = true
  // 创建一个新的 FormData 对象
  const formData = new FormData()
  // 将文件添加到 FormData
  formData.append('file', file.raw)
  for (const entry of formData.entries()) {
    console.log(entry)
  }
  // 使用自定义的上传方法，将 formData 作为参数传递
  const result = await getUploadDocAPI(formData, examid.value)
  if (result.data.code == 200) {
    ElMessage.success('上传成功')
    examid.value = null
    uploadMethod.value = null
    showUploadDialog.value = false
    showExam()
  } else {
    ElMessage.error('上传失败')
  }
  uploading3.value = false
  // 阻止默认的上传行为
  return false
}

const handleChangeDoc = (file) => {
  console.log('handle change Doc')
  if (file !== null) {
    // 选择了文件，手动调用
    handleBeforeUploadDoc(file)
  }
}

onMounted(() => {
  //最终使用
  getClassDetail()
  getDetailInfo()
  showExam()
  //测试使用
  // getClassDetail()
  // getDetailInfo()
})
</script>

<template>
  <!-- 我是已审核课程详情 -->
  <!-- <div v-if="detialInfo"> -->
  <el-row>
    <el-col :span="3"><el-button @click="gotoPrevious()">返回</el-button></el-col>
    <el-col v-if="detail" :span="12">{{ detail.classname }} - {{ classid }}</el-col>
  </el-row>
  <!-- </div> -->
  <div class="page-container">
    <div class="content">
      <div class="sidebar">
        <div class="menu-item" @click="selectMenuItem('classinfo')" :class="{ selected: selectedMenu === 'classinfo' }">
          <el-icon name="el-icon-message"></el-icon>
          <span class="text">课程信息</span>
        </div>
        <div class="menu-item" @click="selectMenuItem('classresource')" :class="{ selected: selectedMenu === 'classresource' }">
          <el-icon name="el-icon-edit-outline"></el-icon>
          <span class="text">课程资料</span>
        </div>
        <div class="menu-item" @click="selectMenuItem('publishexam')" :class="{ selected: selectedMenu === 'publishexam' }">
          <el-icon name="el-icon-folder"></el-icon>
          <span class="text">发布试题</span>
        </div>
        <div class="menu-item" @click="
						selectMenuItem('markpaper');
						getExamLists(classid);
						setexampage();
					" :class="{ selected: selectedMenu === 'markpaper' }">
          <el-icon name="el-icon-document"></el-icon>
          <span class="text">批改试卷</span>
        </div>
        <div class="menu-item" @click="
						selectMenuItem('viewgrade');
						getExamScoreLists(classid);
						setexamscorepage();
					" :class="{ selected: selectedMenu === 'viewgrade' }">
          <el-icon name="el-icon-document"></el-icon>
          <span class="text">查看成绩</span>
        </div>
        <div class="menu-item" @click="
						selectMenuItem('publishannounce');
						getExamLists();
					" :class="{ selected: selectedMenu === 'publishannounce' }">
          <el-icon name="el-icon-document"></el-icon>
          <span class="text">发布公告</span>
        </div>
      </div>
      <div class="main">
        <!-- 根据选择的菜单显示不同的内容 -->
        <div v-if="selectedMenuItem === 'classinfo'">
          <h2>课程信息</h2>
          <el-form>
            <el-form-item>
              <p v-if="detail">课程名称：{{ detail.classname }}</p>
            </el-form-item>
            <el-form-item>
              <p v-if="detail">课程ID：{{ detail.classid }}</p>
            </el-form-item>
            <el-form-item>
              <p v-if="detail">课程介绍:{{ detail.introduction }}</p>
            </el-form-item>
            <el-form-item>
              <p v-if="detail && detail.starttime">课程时间：{{ detail.starttime }} ~ {{ detail ? detail.endtime : '' }}</p>
              <p v-if="detail && !detail.starttime">课程时间：到{{ detail ? detail.endtime : '' }}截止</p>
            </el-form-item>
            <el-form-item>
              <div v-if="detail" class="curriculum-cover">
                课程封面：
                <img :src="detail.cover" />
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="selectedMenuItem === 'classresource'">
          <!-- 课程资料的内容 -->
          <div v-if="!updateChapterVisible && !updateResourceVisible">
            <el-row class="announcement-header">
              <el-col :span="5">
                <h2>课程资料</h2>
              </el-col>
              <el-col :span="4">
                <div class="announcement-button"><el-button type="primary" @click="updateChapter">更新章节</el-button></div>
              </el-col>
              <el-col :span="4">
                <div class="announcement-button"><el-button type="primary" @click="updateResource">添加资料</el-button></div>
              </el-col>
            </el-row>
            <nav class="navbar">
              <ul>
                <li :class="{ active: activeTab === 'myResource' }" @click="changeTab('myResource')">已添加</li>
                <li :class="{ active: activeTab === 'underReview' }" @click="changeTab('underReview')">审核中</li>
                <li :class="{ active: activeTab === 'reviewFailed' }" @click="changeTab('reviewFailed')">审核未通过</li>
              </ul>
            </nav>
            <div class="content">
              <div v-if="activeTab === 'myResource'" class="tab-content">
                <div v-if="detialInfo" style="width: 100%;">
                  <div v-if="!showVideo && !showTxtContent&&!showPt" style="width: 100%;">
                    <div v-for="chapter in detialInfo.chapters" :key="chapter.chapter.chapternum" style="width: 100%;">
                      <div style="width: 100%;">
                        <el-card style="margin-top: 10px;width: 100%;">
                          <h3 class="chapter-title" @click="toggleCollapse(chapter)">
                            <el-row>
                              <el-col span="24">
                                <span class="chapter-indicator" :class="{ expanded: chapterExpanded[chapter.chapter.chapternum] }"></span>
                                第 {{ chapter.chapter.chapternum }} 章：{{ chapter.chapter.chaptername }}
                              </el-col>
                            </el-row>
                          </h3>
                          <div v-show="chapterExpanded[chapter.chapter.chapternum]" class="chapter-content">
                            <div style="margin-top: 3px;font-size: 70%;">{{ chapter.chapter.introduction }}</div>
                            <div style="margin-top: 10px;" v-for="resource in detialInfo.resources" :key="resource.resourceId">
                              <div v-if="resource.chapterId == chapter.chapter.chapterid && resource.status == '已通过'">
                                <div v-if="resource.type === '视频'" class="resource-box video" @click="showVide(chapter.chapter.chapterid, resource)">
                                  <p class="resource-text">视频：{{ resource.resourcename }}</p>
                                </div>
                                <div v-if="resource.type === '文本'" class="resource-box text" @click="showTxt(resource)">
                                  <p class="resource-text">文本：{{ resource.resourcename }}</p>
                                </div>
                                <div v-if="resource.type === '图片'" class="resource-box document" @click="downloadDocument(resource)">
                                  <p class="resource-text">图片：{{ resource.resourcename }}</p>
                                </div>
                                <div v-if="resource.type === '文档'" class="resource-box document" @click="showPPT(resource)">
                                  <p class="resource-text">文档：{{ resource.resourcename }}</p>
                                </div>
                                <div v-if="resource.type === 'ppt'" class="resource-box document" @click="showPPT(resource)">
                                  <p class="resource-text">PPT：{{ resource.resourcename }}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </el-card>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="activeTab === 'underReview'" class="tab-content">
                <!-- 审核中资料 -->
                <div v-if="unpassResource && detialInfo" style="width: 100%;">
                  <div v-if="!showVideo && !showTxtContent &&!showPt" style="width: 100%;">
                    <div v-for="resource in unpassResource" :key="resource.resourceId" style="width: 100%;">
                      <div v-for="chapter in detialInfo.chapters" :key="chapter.chapter.chapternum" style="width: 100%;">
                        <div v-if="resource.chapterId == chapter.chapter.chapterid">
                          <el-card style="margin-top: 10px;width: 100%;">
                            <h3 class="chapter-title" @click="toggleCollapse(chapter)">
                              <el-row>
                                <el-col span="24">
                                  <span class="chapter-indicator" :class="{ expanded: chapterExpanded[chapter.chapter.chapternum] }"></span>
                                  第 {{ chapter.chapter.chapternum }} 章：{{ chapter.chapter.chaptername }}
                                </el-col>
                              </el-row>
                            </h3>
                            <div v-show="chapterExpanded[chapter.chapter.chapternum]" class="chapter-content">
                              <div style="margin-top: 3px;font-size: 70%;">{{ chapter.chapter.introduction }}</div>
                              <div v-if="resource.type === '视频'" class="resource-box video" @click="showVide(chapter.chapter.chapterid, resource)">
                                <p class="resource-text">视频：{{ resource.resourcename }}</p>
                              </div>
                              <div v-if="resource.type === '文本'" class="resource-box text" @click="showTxt(resource)">
                                <p class="resource-text">文本：{{ resource.resourcename }}</p>
                              </div>
                              <div v-if="resource.type === '图片'" class="resource-box document" @click="downloadDocument(resource)">
                                <p class="resource-text">图片：{{ resource.resourcename }}</p>
                              </div>
                              <div v-if="resource.type === '文档'" class="resource-box document" @click="showPPT(resource)">
                                <p class="resource-text">文档：{{ resource.resourcename }}</p>
                              </div>
                              <div v-if="resource.type === 'ppt'" class="resource-box document" @click="showPPT(resource)">
                                <p class="resource-text">PPT：{{ resource.resourcename }}</p>
                              </div>
                            </div>
                          </el-card>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="activeTab === 'reviewFailed'" class="tab-content">
                <!-- 审核未通过资料 -->
                <div v-if="rejectResource && detialInfo" style="width: 100%;">
                  <div v-if="!showVideo && !showTxtContent&&!showPt" style="width: 100%;">
                    <div v-for="resource in rejectResource" :key="resource.resourceId" style="width: 100%;">
                      <div v-for="chapter in detialInfo.chapters" :key="chapter.chapter.chapternum" style="width: 100%;">
                        <div v-if="resource.chapterId == chapter.chapter.chapterid">
                          <el-card style="margin-top: 10px;width: 100%;">
                            <h3 class="chapter-title" @click="toggleCollapse(chapter)">
                              <el-row>
                                <el-col span="24">
                                  <span class="chapter-indicator" :class="{ expanded: chapterExpanded[chapter.chapter.chapternum] }"></span>
                                  第 {{ chapter.chapter.chapternum }} 章：{{ chapter.chapter.chaptername }}
                                </el-col>
                              </el-row>
                            </h3>
                            <div v-show="chapterExpanded[chapter.chapter.chapternum]" class="chapter-content">
                              <div style="margin-top: 3px;font-size: 70%;">{{ chapter.chapter.introduction }}</div>
                              <div v-if="resource.type === '视频'" class="resource-box video" @click="showVide(chapter.chapter.chapterid, resource)">
                                <p class="resource-text">视频：{{ resource.resourcename }}</p>
                              </div>
                              <div v-if="resource.type === '文本'" class="resource-box text" @click="showTxt(resource)">
                                <p class="resource-text">文本：{{ resource.resourcename }}</p>
                              </div>
                              <div v-if="resource.type === '图片'" class="resource-box document" @click="downloadDocument(resource)">
                                <p class="resource-text">图片：{{ resource.resourcename }}</p>
                              </div>
                              <div v-if="resource.type === '文档'" class="resource-box document" @click="showPPT(resource)">
                                <p class="resource-text">文档：{{ resource.resourcename }}</p>
                              </div>
                              <div v-if="resource.type === 'ppt'" class="resource-box document" @click="showPPT(resource)">
                                <p class="resource-text">PPT：{{ resource.resourcename }}</p>
                              </div>
                            </div>
                          </el-card>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="showVideo">
              <!-- 视频展示界面 -->
              <video :src="getVideo()" id="playVideos" controls preload></video>
              <button @click="videoBack()">返回</button>
            </div>
            <div v-if="showTxtContent">
              <!-- 根据需要设置文本展示区域的样式 -->
              <textarea v-model="txtContent" rows="10" cols="50" readonly></textarea>
              <button @click="txtBack()">返回</button>
            </div>
            <div v-if="showPt">
              <!-- 根据需要设置PPT展示区域的样式 -->
              <iframe :src="getPPT()" frameborder="0" width="100%" height="600"></iframe>
              <button @click="pptBack()">返回</button>
            </div>
          </div>
          <!-- 更新章节界面 -->
          <div v-if="updateChapterVisible">
            <el-row class="announcement-header">
              <el-col :span="2">
                <div class="announcement-button"><el-button @click="hideUpdateChapter">返回</el-button></div>
              </el-col>
              <el-col :span="5">
                <h2>更新章节</h2>
              </el-col>
              <el-col :span="4">
                <div class="announcement-button"><el-button type="primary" @click="addChapterDialogVisible = true">新增章节</el-button></div>
              </el-col>
            </el-row>
            <p>现有的章节：</p>
            <div v-for="chapter in detialInfo.chapters" :key="chapter.chapter.chapternum">
              <el-card style="margin-top: 10px;width: 100%;">
                <el-row>
                  <el-col span="11">第 {{ chapter.chapter.chapternum }} 章：{{ chapter.chapter.chaptername }}</el-col>
                  <el-col span="3" style="margin-left: 5%"><el-button @click="deleteChapter(chapter.chapter.chapterid)">删除</el-button></el-col>
                </el-row>
                <div style="font-size: 80%;">{{ chapter.chapter.introduction }}</div>
              </el-card>
            </div>
          </div>
          <!-- 新增章节对话框 -->
          <el-dialog v-model="addChapterDialogVisible" title="新增章节">
            <el-form label-width="80px">
              <el-form-item label="章节名称" required><el-input v-model="addChapterForm.name" placeholder="请输入章节名称"></el-input></el-form-item>
              <el-form-item label="章节介绍" required><el-input v-model="addChapterForm.introduction" placeholder="请输入章节介绍"></el-input></el-form-item>
            </el-form>
            <div class="dialog-footer">
              <el-button @click="addChapterDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="addChapter">确定</el-button>
            </div>
          </el-dialog>
          <!-- 新增资源界面 -->
          <div v-if="updateResourceVisible">
            <el-row class="announcement-header">
              <el-col :span="2">
                <div class="announcement-button"><el-button @click="hideUpdateResource">返回</el-button></div>
              </el-col>
              <el-col :span="5">
                <h2>添加资料</h2>
              </el-col>
            </el-row>
            <div style="display: flex; flex-direction: column; align-items: center; margin-top: 5%;">
              <div style="margin-bottom: 20px; text-align: center;zoom: 120%;">
                <el-select v-model="selectedChapter" placeholder="请选择章节">
                  <el-option v-for="chapter in detialInfo.chapters" :key="chapter.chapter.chapternum" :label="'第 ' + chapter.chapter.chapternum + ' 章：' + chapter.chapter.chaptername" :value="chapter.chapter.chapterid"></el-option>
                </el-select>
              </div>
              <div style="margin-bottom: 20px; text-align: center;zoom: 120%;">
                <el-select v-if="selectedChapter" v-model="selectedType" placeholder="选择上传资源类型">
                  <el-option v-if="!hasVideos" :label="'视频'" :value="'视频'"></el-option>
                  <el-option v-if="!hasTexts" :label="'文本'" :value="'文本'"></el-option>
                  <el-option :label="'文档'" :value="'文档'"></el-option>
                </el-select>
              </div>
              <div v-show="selectedType === '视频'" style="margin-bottom: 20px; text-align: center;">
                <el-upload class="upload-demo" :action="uploadReApi" :on-before-upload="handleBeforeUpload" :on-success="handleUploadSuccess" :on-error="handleUploadError" :show-file-list="false" :auto-upload="false" accept="video/*" @change="handleChange">
                  <el-button size="small" type="primary" style="width: 100px; height: 45px;">上传视频</el-button>
                </el-upload>
              </div>
              <div v-show="selectedType === '文本'" style="margin-bottom: 20px; text-align: center;">
                <el-upload class="upload-demo" :action="uploadReApi" :on-before-upload="handleBeforeUpload" :on-success="handleUploadSuccess" :on-error="handleUploadError" :show-file-list="false" :auto-upload="false" accept=".txt,text/plain" @change="handleChange">
                  <el-button size="small" type="primary" style="width: 100px; height: 45px;">上传文本文件（.txt）</el-button>
                </el-upload>
              </div>
              <div v-show="selectedType === '文档'" style="margin-bottom: 20px; text-align: center;">
                <el-upload class="upload-demo" :action="uploadReApi" :on-before-upload="handleBeforeUpload" :on-success="handleUploadSuccess" :on-error="handleUploadError" :show-file-list="false" :auto-upload="false" accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf" @change="handleChange">
                  <el-button size="small" type="primary" style="width: 100px; height: 45px;">上传文档</el-button>
                </el-upload>
              </div>
            </div>
          </div>
        </div>
        <div v-if="selectedMenuItem === 'publishexam'">
          <!-- 发布试题界面的内容 -->
          <el-row class="announcement-header">
            <el-col :span="5">
              <h2>发布试题</h2>
            </el-col>
            <el-col :span="4">
              <div class="announcement-button"><el-button type="primary" @click="showDialog">下载考试模板</el-button></div>
            </el-col>
            <el-col :span="4">
              <div class="announcement-button"><el-button type="primary" @click="showDialogExam">上传考试文件</el-button></div>
            </el-col>
            <el-col :span="4">
              <div class="announcement-button"><el-button type="primary" @click="downloadTest">下载测试题库模板</el-button></div>
            </el-col>
            <el-col :span="4">
              <div class="announcement-button"><el-button type="primary" @click="showDialogTest">上传测试题库</el-button></div>
            </el-col>
          </el-row>
          <nav class="navbar">
            <ul>
              <li :class="{ active: activeTab1 === 'myExamList' }" @click="changeTab1('myExamList')">我的考试</li>
              <li :class="{ active: activeTab1 === 'myTestList' }" @click="changeTab1('myTestList')">我的测试题库</li>
            </ul>
          </nav>
          <div class="content">
            <div v-if="activeTab1 === 'myExamList'" class="tab-content">
              <el-table :data="myExam" :border="false">
                <el-table-column prop="id" label="考试ID"></el-table-column>
                <el-table-column prop="name" label="考试名称"></el-table-column>
                <el-table-column prop="totalScore" label="总分"></el-table-column>
                <el-table-column prop="totalTime" label="总时间"></el-table-column>
                <el-table-column prop="classid" label="考试所属课程ID"></el-table-column>
                <el-table-column prop="date" label="考试时间"></el-table-column>
              </el-table>
            </div>
            <div v-if="activeTab1 === 'myTestList'" class="tab-content">
              <div style="margin-bottom: 20px; text-align: center;zoom: 120%;">
                <el-select v-model="selectedTestChapterShow" placeholder="请选择章节">
                  <el-option v-for="chapter in detialInfo.chapters" :key="chapter.chapter.chapternum" :label="'第 ' + chapter.chapter.chapternum + ' 章：' + chapter.chapter.chaptername" :value="chapter.chapter.chapterid"></el-option>
                </el-select>
                <el-table :data="myTest" :border="false">
                  <el-table-column prop="questionid" label="测试题库ID"></el-table-column>
                  <el-table-column prop="chapterid" label="所属章节ID"></el-table-column>
                  <el-table-column prop="question" label="题干"></el-table-column>
                  <el-table-column prop="answer" label="答案"></el-table-column>
                  <el-table-column prop="optionA" label="选项A"></el-table-column>
                  <el-table-column prop="optionB" label="选项B"></el-table-column>
                  <el-table-column prop="optionC" label="选项C"></el-table-column>
                  <el-table-column prop="optionD" label="选项D"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <el-dialog v-model="dialogVisible" title="下载模板" @close="resetDialog" width="400px">
            <p>请选择要下载的模板类型：</p>
            <el-radio-group v-model="selectedOption" style="margin-top: 20px;">
              <el-radio label="word" border>Word 版</el-radio>
              <el-radio label="excel" border>Excel 版</el-radio>
            </el-radio-group>
            <div class="dialog-footer" style="margin-top: 30px;">
              <el-button @click="resetDialog">取消</el-button>
              <el-button type="primary" @click="downloadTemplate">确定</el-button>
            </div>
          </el-dialog>
          <el-dialog v-model="showDialogFile" title="选择考试日期和时间" :before-close="closeDialogFile">
            <el-form label-width="120px">
              <el-form-item label="考试名称">
                <el-input placeholder="请输入考试名称" v-model="examname"></el-input>
              </el-form-item>
              <el-form-item label="选择考试日期">
                <el-date-picker v-model="date" type="date" :picker-options="datePickerOptions"></el-date-picker>
              </el-form-item>
              <el-form-item v-if="date" label="选择考试时间段">
                <el-radio-group v-model="period">
                  <el-radio :label="0" :disabled="periods[0] !== 1">8:30-11:30</el-radio>
                  <el-radio :label="1" :disabled="periods[1] !== 1">13:30-16:30</el-radio>
                  <el-radio :label="2" :disabled="periods[2] !== 1">17:30-20:30</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="period !== null" label="选择考试开始时间">
                <el-time-picker v-model="starttime" :picker-options="timePickerOptions"></el-time-picker>
              </el-form-item>
              <el-form-item label="考试时长（分钟）">
                <el-input-number v-model="duration" :min="1" :max="180" :step="1"></el-input-number>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveExam">新增考试</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
          <el-dialog v-model="showUploadDialog" title="选择上传方式">
            <el-radio-group v-model="uploadMethod">
              <el-radio label="excel">上传Excel</el-radio>
              <el-radio label="word">上传Word</el-radio>
            </el-radio-group>
            <el-upload v-if="uploadMethod == 'excel'" :action="uploadUrl" :show-file-list="false" :before-upload="handleBeforeUploadExcel" accept=".xls,.xlsx" @change="handleChangeExcel">
              <el-button>点击上传(xls、xlsx)</el-button>
            </el-upload>
            <el-upload v-if="uploadMethod == 'word'" :action="uploadUrl" :show-file-list="false" :before-upload="handleBeforeUploadDoc" accept=".docx" @change="handleChangeDoc">
              <el-button>点击上传(docx)</el-button>
            </el-upload>
          </el-dialog>
          <el-dialog v-model="showTestDialog" title="上传题库文件">
            请选择此题库对应的章节：
            <div style="margin-bottom: 20px; text-align: center;zoom: 120%;">
              <el-select v-model="selectedTestChapter" placeholder="请选择章节">
                <el-option v-for="chapter in detialInfo.chapters" :key="chapter.chapter.chapternum" :label="'第 ' + chapter.chapter.chapternum + ' 章：' + chapter.chapter.chaptername" :value="chapter.chapter.chapterid"></el-option>
              </el-select>
            </div>
            <el-upload v-if="selectedTestChapter" :action="uploadUrl" :show-file-list="false" :before-upload="handleBeforeUploadTest" accept=".xls,.xlsx" @change="handleChangeTest">
              <el-button>点击上传</el-button>
            </el-upload>
          </el-dialog>
        </div>
        <div v-if="selectedMenuItem === 'markpaper' && markselected === 'exampage'">
          <h2>批改试卷</h2>
          <el-table :data="examList">
            <el-table-column prop="date" label="考试时间">
              <template #default="{ row }">
                <el-icon>
                  <Clock />
                </el-icon>
                {{ row.date }}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="考试项目"></el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button type="primary" size="middle" @click="
										setquestionpage();
										getQuestionLists(scope.row.id);
									">
                  批改
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="selectedMenuItem === 'markpaper' && markselected === 'questionpage'">
          <el-button @click="setexampage()">返回</el-button>
          <el-table :data="questionList">
            <el-table-column prop="questionnum" label="题号"></el-table-column>
            <el-table-column prop="question" label="题目"></el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button type="primary" size="middle" @click="
										setmarkpage();
										setquestionshow(scope.row.question);
										setquestionscore(scope.row.score);
										setquestionidshow(scope.row.questionid);
										getMarkLists(scope.row.questionid);
										clearAll();
									">
                  批改
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="selectedMenuItem === 'markpaper' && markselected === 'markpage'">
          <el-button @click="setquestionpage()">返回</el-button>
          <br />
          <div class="leftmark">
            <el-table :data="markList">
              <el-table-column prop="studentid" label="学生id"></el-table-column>
              <el-table-column prop="studentname" label="姓名"></el-table-column>
              <el-table-column prop="score" label="分数"></el-table-column>
            </el-table>
          </div>
          <div class="rightmark">
            <h2>题目：({{ questionscore }}分)</h2>
            <!-- <h4>本题分数：{{questionscore}}</h4> -->
            {{ questionshow }}
            <h4>学生id：{{ studentidshow }}学生姓名：{{ studentnameshow }}</h4>
            <el-input type="text" v-model="score" v-if="scoreshow" style="width: 50px;"></el-input>
            <el-button @click="postscore(questionidshow, studentidshow, score)" v-if="scoreshow">提交</el-button>
            <!-- <el-button @click="showNextAnswer();hidenextbtn()" v-if="nextbtn">下一个</el-button> -->
            <h2>答案：</h2>
            {{ studentanswershow }}
            <br />
          </div>
        </div>
        <div v-if="selectedMenuItem === 'viewgrade' && scoreselected === 'examscorepage' ">
          <h2>查看成绩</h2>
          <el-table :data="examScoreList">
            <el-table-column prop="date" label="考试时间">
              <template #default="{ row }">
                <el-icon>
                  <Clock />
                </el-icon>
                {{ row.date }}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="考试项目"></el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button type="primary" size="middle" @click="setexamscoredetailpage();getScoreContent(scope.row);">查看成绩</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="selectedMenuItem === 'viewgrade' && scoreselected === 'examscoredetailpage' ">
          <el-button @click="setexamscorepage()">返回</el-button>
          <br>
          <div class="leftscore">
            <el-table :data="scoreShowList">
              <el-table-column prop="studentid" label="学生id"></el-table-column>
              <el-table-column prop="studentname" label="姓名"></el-table-column>
              <el-table-column prop="grade" label="分数"></el-table-column>
            </el-table>
          </div>
          <div class="rightscore">
            <div ref="barChart" style="width: 100%; height: 300px;"></div>
          </div>
        </div>
        <div v-if="selectedMenuItem === 'publishannounce'">
          <el-row class="announcement-header">
            <el-col :span="5">
              <h2>发布公告</h2>
            </el-col>
            <el-col :span="12">
              <div v-if="detail && detail.announcement" class="announcement-button"><el-button type="primary" @click="updateAnnounce">更新公告</el-button></div>
              <div v-else-if="detail == null || detail.announcement == null" class="announcement-button">
                <el-button type="primary" @click="updateAnnounce">添加公告</el-button>
              </div>
            </el-col>
          </el-row>
          <!-- 发布公告界面的内容 -->
          <div v-if="detail" class="announcement-wrapper">
            <!-- 公告的时间怎么没有 -->
            {{ detail.announcement }}
          </div>
          <!-- 新增章节对话框 -->
          <el-dialog type="textarea" :rows="4" v-model="announceDialogVisible" title="更新公告">
            <el-input v-model="announce" placeholder="请输入新公告内容"></el-input>
            <div class="dialog-footer">
              <el-button @click="announceDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="addAnnounce">确定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.leftmark {
  float: left;
  // margin: 0px;
  width: 50%;
  height: 80%;
}
.rightmark {
  float: right;
  width: 50%;
}
.leftscore {
  float: left;
  // margin: 0px;
  width: 40%;
  height: 80%;
}
.rightscore {
  float: right;
  width: 60%;
}
.page-container {
  height: 80vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #1890ff;
  color: white;
  padding: 10px;
  position: sticky;
  top: 0;
  z-index: 999;
}

.header .icon {
  color: white;
  margin-right: 10px;
}

.content {
  flex: 1;
  display: flex;
}

.sidebar {
  width: 200px;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #1890ff;
  border-radius: 10px;
  margin: 20px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  color: #000;
  font-size: 18px; /* 修改字体字号为18px */
  font-weight: bold; /* 修改字体粗细为粗体 */
  margin: 10px 0; /* 修改上下距离为10px */
}

.selected {
  color: blue;
}

.text {
  margin-left: 10px;
}

.main {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #1890ff;
  border-radius: 10px;
  margin: 20px;
  overflow: auto;
}

.curriculum-cover {
  text-align: left;
  float: left;
  margin-top: 20px;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 200px;
  }
}

.announcement-wrapper {
  position: relative;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.announcement-header {
  display: flex;
  align-items: center;
}

.announcement-header h2 {
  margin: 20px;
}

.announcement-button {
  margin-left: 10px;
}

.navbar {
  background-color: white;
}

ul {
  display: flex;
  justify-content: space-evenly; /* 调整项目的水平间距 */
  padding: 10px 0; /* 减小上下间距 */
}

li {
  color: black;
  padding: 10px;
  cursor: pointer;
  transition: color 0.3s;
  list-style: none; /* 移除默认的列表样式 */
  position: relative;
}

li.active {
  color: blue;
}

li.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: blue;
}

.content {
  margin-top: 20px;
}

.tab-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
}

.resource-box {
  display: inline-block;
  padding: 1px 1px;
  border: 2px solid green;
  border-radius: 4px;
  margin-right: 8px;
}

.video {
  border-color: green;
}

.document {
  border-color: green;
}

.resource-text {
  color: green;
  font-size: 90%;
  line-height: 1;
  margin: 1px;
}

.chapter-title {
  position: relative;
  cursor: pointer;
  margin-top: 0;
  margin-bottom: 0;
}
.chapter-indicator {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #333;
  transition: transform 0.3s ease;
}
.chapter-indicator.expanded {
  transform: translateY(-50%) rotate(90deg);
}
.chapter-content {
  margin-top: 10px;
}
</style>
