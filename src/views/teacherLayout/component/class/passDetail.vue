<script setup>
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import {
  getClassDetailAPI,
  getResourceAPI,
  getAddChapterAPI,
  getDeleteChapterAPI,
  getUnpassResourceAPI,
  getRejectResourceAPI,
  getUpdateAnnounceAPI,
  getUploadResourceAPI
} from '@/apis/teacherClassAPI'
import { ElMessage } from 'element-plus'
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

//获取课程信息
const detail = ref(null)
const getClassDetail = async (classid) => {
  console.log(classid)
  const result = await getClassDetailAPI(classid)
  detail.value = result.data.data
}

// const getClassDetail = async () => {
//     const  result  = await getClassDetailAPI()
//     detail.value = result.data.data
// }

//获取章节、资源
//最终使用
const detialInfo = ref(null)
const getDetailInfo = async (classid) => {
  console.log(classid)
  const result = await getResourceAPI(classid)
  detialInfo.value = result.data.data
  getUnpassResource(detialInfo.value.classes.classname)
  getRejectResource(detialInfo.value.classes.classname)
}

//测试使用
// const getDetailInfo = async () => {
//     const  result  = await getResourceAPI()
//     detialInfo.value = result.data.data
//     // getUnpassResource(detialInfo.value.classes.classname)
//     // getRejectResource(detialInfo.value.classes.classname)
//     getUnpassResource()
//     getRejectResource()
// }

const unpassResource = ref([])
//获取未审核资源
const getUnpassResource = async (classname) => {
  const result = await getUnpassResourceAPI(classname)
  unpassResource.value = result.data.data
}

// const getUnpassResource = async () =>{
//   const result = await getUnpassResourceAPI()
//   unpassResource.value = result.data.data
//   console.log(unpassResource)
// }

const rejectResource = ref([])
//获取已驳回资源
const getRejectResource = async (classname) => {
  const result = await getRejectResourceAPI(classname)
  rejectResource.value = result.data.data
}

// const getRejectResource = async () =>{
//   const result = await getRejectResourceAPI()
//   rejectResource.value = result.data.data
// }

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

const handleBeforeUpload = async (file) => {
  console.log('handleBeforeUpload called')
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
  word: 'https://skillup.oss-cn-beijing.aliyuncs.com/word%E6%A8%A1%E6%9D%BF.docx?Expires=1688807371&OSSAccessKeyId=TMP.3Kf15AoPr4ePCmCeQJuD49AebwX65ykYYb2YREE8TmzcfJ8CVxhv2vctQK9fXr7RcVeqz1XdC5D86bR7JE6LnWcDH4F16f&Signature=a7%2FUBY5iJ1ve9rlZzJ8I%2F9PQG5w%3D',
  excel:
    'https://skillup.oss-cn-beijing.aliyuncs.com/excel%E6%A8%A1%E6%9D%BF.xlsx?Expires=1688807322&OSSAccessKeyId=TMP.3Kf15AoPr4ePCmCeQJuD49AebwX65ykYYb2YREE8TmzcfJ8CVxhv2vctQK9fXr7RcVeqz1XdC5D86bR7JE6LnWcDH4F16f&Signature=5AkDYgW3thAHiNjxyDUJTGEs0WU%3D'
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

onMounted(() => {
  //最终使用
  getClassDetail(classid)
  getDetailInfo(classid)
  //测试使用
  // getClassDetail()
  // getDetailInfo()
})
</script>

<template>
  <!-- 我是已审核课程详情 -->
  <!-- <div v-if="detialInfo"> -->
  <el-row>
    <el-col :span="3">
      <el-button @click="gotoPrevious()">
        返回
      </el-button>
    </el-col>
    <el-col v-if="detail" :span="12">
      {{ detail.classname }}
      -
      {{ classid }}
    </el-col>
  </el-row>
  <!-- </div> -->
  <div class="page-container">
    <div class="content">
      <div class="sidebar">
        <div class="menu-item" @click="selectMenuItem('classinfo')" :class="{ 'selected': selectedMenu === 'classinfo' }">
          <el-icon name="el-icon-message"></el-icon>
          <span class="text">课程信息</span>
        </div>
        <div class="menu-item" @click="selectMenuItem('classresource')" :class="{ 'selected': selectedMenu === 'classresource' }">
          <el-icon name="el-icon-edit-outline"></el-icon>
          <span class="text">课程资料</span>
        </div>
        <div class="menu-item" @click="selectMenuItem('publishexam')" :class="{ 'selected': selectedMenu === 'publishexam' }">
          <el-icon name="el-icon-folder"></el-icon>
          <span class="text">发布试题</span>
        </div>
        <div class="menu-item" @click="selectMenuItem('markpaper'); getExamLists()" :class="{ 'selected': selectedMenu === 'markpaper' }">
          <el-icon name="el-icon-document"></el-icon>
          <span class="text">批改试卷</span>
        </div>
        <div class="menu-item" @click="selectMenuItem('viewgrade'); getExamLists()" :class="{ 'selected': selectedMenu === 'viewgrade' }">
          <el-icon name="el-icon-document"></el-icon>
          <span class="text">查看成绩</span>
        </div>
        <div class="menu-item" @click="selectMenuItem('publishannounce'); getExamLists()" :class="{ 'selected': selectedMenu === 'publishannounce' }">
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
              <p v-if="detail">
                课程名称：{{detail.classname}}
              </p>
            </el-form-item>
            <el-form-item>
              <p v-if="detail">
                课程ID：{{detail.classid}}
              </p>
            </el-form-item>
            <el-form-item>
              <p v-if="detail">
                课程介绍:{{detail.introduction}}
              </p>
            </el-form-item>
            <el-form-item>
              <p v-if="detail&&detail.starttime">
                课程时间：{{ detail.starttime }} ~ {{ detail ? detail.endtime : '' }}
              </p>
              <p v-if="detail&&!detail.starttime">
                课程时间：到{{ detail ? detail.endtime : '' }}截止
              </p>
            </el-form-item>
            <el-form-item>
              <div v-if="detail" class="curriculum-cover">
                课程封面：
                <img :src="detail.cover">
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="selectedMenuItem === 'classresource'">
          <!-- 课程资料的内容 -->
          <div v-if="!updateChapterVisible&&!updateResourceVisible">
            <el-row class="announcement-header">
              <el-col :span="5">
                <h2>课程资料</h2>
              </el-col>
              <el-col :span="4">
                <div class="announcement-button">
                  <el-button type="primary" @click="updateChapter">更新章节</el-button>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="announcement-button">
                  <el-button type="primary" @click="updateResource">添加资料</el-button>
                </div>
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
                  <div v-if="!showVideo&&!showTxtContent" style="width: 100%;">
                    <div v-for="chapter in detialInfo.chapters" :key="chapter.chapter.chapternum" style="width: 100%;">
                      <div style="width: 100%;">
                        <el-card style="margin-top: 10px;width: 100%;">
                          <h3 class="chapter-title" @click="toggleCollapse(chapter)">
                            <el-row>
                              <el-col span="24">
                                <span class="chapter-indicator" :class="{'expanded': chapterExpanded[chapter.chapter.chapternum]}"></span>
                                第 {{ chapter.chapter.chapternum }} 章：{{ chapter.chapter.chaptername }}
                              </el-col>
                            </el-row>
                          </h3>
                          <div v-show="chapterExpanded[chapter.chapter.chapternum]" class="chapter-content">
                            <div style="margin-top: 3px;font-size: 70%;">
                              {{ chapter.chapter.introduction }}
                            </div>
                            <div style="margin-top: 10px;" v-for="resource in detialInfo.resources" :key="resource.resourceId">
                              <div v-if="resource.chapterId == chapter.chapter.chapterid&&resource.status == '已通过'">
                                <div v-if="resource.type === '视频'" class="resource-box video" @click="showVide(chapter.chapter.chapterid,resource)">
                                  <p class="resource-text">视频：{{resource.resourcename}}</p>
                                </div>
                                <div v-if="resource.type === '文本'" class="resource-box text" @click="showTxt(resource)">
                                  <p class="resource-text">文本：{{resource.resourcename}}</p>
                                </div>
                                <div v-if="resource.type === '图片'" class="resource-box document" @click="downloadDocument(resource)">
                                  <p class="resource-text">图片：{{resource.resourcename}}</p>
                                </div>
                                <div v-if="resource.type === '文档'" class="resource-box document" @click="downloadDocument(resource)">
                                  <p class="resource-text">文档：{{resource.resourcename}}</p>
                                </div>
                                <div v-if="resource.type === 'ppt'" class="resource-box document" @click="downloadDocument(resource)">
                                  <p class="resource-text">PPT：{{resource.resourcename}}</p>
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
                <div v-if="unpassResource&&detialInfo" style="width: 100%;">
                  <div v-if="!showVideo&&!showTxtContent" style="width: 100%;">
                    <div v-for="resource in unpassResource" :key="resource.resourceId" style="width: 100%;">
                      <div v-for="chapter in detialInfo.chapters" :key="chapter.chapter.chapternum" style="width: 100%;">
                        <div v-if="resource.chapterId == chapter.chapter.chapterid">
                          <el-card style="margin-top: 10px;width: 100%;">
                            <h3 class="chapter-title" @click="toggleCollapse(chapter)">
                              <el-row>
                                <el-col span="24">
                                  <span class="chapter-indicator" :class="{'expanded': chapterExpanded[chapter.chapter.chapternum]}"></span>
                                  第 {{ chapter.chapter.chapternum }} 章：{{ chapter.chapter.chaptername }}
                                </el-col>
                              </el-row>
                            </h3>
                            <div v-show="chapterExpanded[chapter.chapter.chapternum]" class="chapter-content">
                              <div style="margin-top: 3px;font-size: 70%;">
                                {{ chapter.chapter.introduction }}
                              </div>
                              <div v-if="resource.type === '视频'" class="resource-box video" @click="showVide(chapter.chapter.chapterid,resource)">
                                <p class="resource-text">视频：{{resource.resourcename}}</p>
                              </div>
                              <div v-if="resource.type === '文本'" class="resource-box text" @click="showTxt(resource)">
                                <p class="resource-text">文本：{{resource.resourcename}}</p>
                              </div>
                              <div v-if="resource.type === '图片'" class="resource-box document" @click="downloadDocument(resource)">
                                <p class="resource-text">图片：{{resource.resourcename}}</p>
                              </div>
                              <div v-if="resource.type === '文档'" class="resource-box document" @click="downloadDocument(resource)">
                                <p class="resource-text">文档：{{resource.resourcename}}</p>
                              </div>
                              <div v-if="resource.type === 'ppt'" class="resource-box document" @click="downloadDocument(resource)">
                                <p class="resource-text">PPT：{{resource.resourcename}}</p>
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
                <div v-if="rejectResource&&detialInfo" style="width: 100%;">
                  <div v-if="!showVideo&&!showTxtContent" style="width: 100%;">
                    <div v-for="resource in rejectResource" :key="resource.resourceId" style="width: 100%;">
                      <div v-for="chapter in detialInfo.chapters" :key="chapter.chapter.chapternum" style="width: 100%;">
                        <div v-if="resource.chapterId == chapter.chapter.chapterid">
                          <el-card style="margin-top: 10px;width: 100%;">
                            <h3 class="chapter-title" @click="toggleCollapse(chapter)">
                              <el-row>
                                <el-col span="24">
                                  <span class="chapter-indicator" :class="{'expanded': chapterExpanded[chapter.chapter.chapternum]}"></span>
                                  第 {{ chapter.chapter.chapternum }} 章：{{ chapter.chapter.chaptername }}
                                </el-col>
                              </el-row>
                            </h3>
                            <div v-show="chapterExpanded[chapter.chapter.chapternum]" class="chapter-content">
                              <div style="margin-top: 3px;font-size: 70%;">
                                {{ chapter.chapter.introduction }}
                              </div>
                              <div v-if="resource.type === '视频'" class="resource-box video" @click="showVide(chapter.chapter.chapterid,resource)">
                                <p class="resource-text">视频：{{resource.resourcename}}</p>
                              </div>
                              <div v-if="resource.type === '文本'" class="resource-box text" @click="showTxt(resource)">
                                <p class="resource-text">文本：{{resource.resourcename}}</p>
                              </div>
                              <div v-if="resource.type === '图片'" class="resource-box document" @click="downloadDocument(resource)">
                                <p class="resource-text">图片：{{resource.resourcename}}</p>
                              </div>
                              <div v-if="resource.type === '文档'" class="resource-box document" @click="downloadDocument(resource)">
                                <p class="resource-text">文档：{{resource.resourcename}}</p>
                              </div>
                              <div v-if="resource.type === 'ppt'" class="resource-box document" @click="downloadDocument(resource)">
                                <p class="resource-text">PPT：{{resource.resourcename}}</p>
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
              <video :src="getVideo()" id="playVideos" controls preload>
              </video>
              <button @click="videoBack()">返回</button>
            </div>
            <div v-if="showTxtContent">
              <!-- 根据需要设置文本展示区域的样式 -->
              <textarea v-model="txtContent" rows="10" cols="50" readonly></textarea>
              <button @click="txtBack()">返回</button>
            </div>
          </div>
          <!-- 更新章节界面 -->
          <div v-if="updateChapterVisible">
            <el-row class="announcement-header">
              <el-col :span="2">
                <div class="announcement-button">
                  <el-button @click="hideUpdateChapter">返回</el-button>
                </div>
              </el-col>
              <el-col :span="5">
                <h2>更新章节</h2>
              </el-col>
              <el-col :span="4">
                <div class="announcement-button">
                  <el-button type="primary" @click="addChapterDialogVisible = true">新增章节</el-button>
                </div>
              </el-col>
            </el-row>
            <p>现有的章节：</p>
            <div v-for="chapter in detialInfo.chapters" :key="chapter.chapter.chapternum">
              <el-card style="margin-top: 10px;width: 100%;">
                <el-row>
                  <el-col span="11">
                    第 {{ chapter.chapter.chapternum }} 章：{{ chapter.chapter.chaptername }}
                  </el-col>
                  <el-col span="3" style="margin-left: 5%">
                    <el-button @click="deleteChapter(chapter.chapter.chapterid)">删除</el-button>
                  </el-col>
                </el-row>
                <div style="font-size: 80%;">
                  {{ chapter.chapter.introduction }}
                </div>
              </el-card>
            </div>
          </div>
          <!-- 新增章节对话框 -->
          <el-dialog v-model="addChapterDialogVisible" title="新增章节">
            <el-form label-width="80px">
              <el-form-item label="章节名称" required>
                <el-input v-model="addChapterForm.name" placeholder="请输入章节名称"></el-input>
              </el-form-item>
              <el-form-item label="章节介绍" required>
                <el-input v-model="addChapterForm.introduction" placeholder="请输入章节介绍"></el-input>
              </el-form-item>
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
                <div class="announcement-button">
                  <el-button @click="hideUpdateResource">返回</el-button>
                </div>
              </el-col>
              <el-col :span="5">
                <h2>添加资料</h2>
              </el-col>
            </el-row>
            <div style="display: flex; flex-direction: column; align-items: center; margin-top: 5%;">
              <div style="margin-bottom: 20px; text-align: center;zoom: 120%;">
                <el-select v-model="selectedChapter" placeholder="请选择章节">
                  <el-option v-for="chapter in detialInfo.chapters" :key="chapter.chapter.chapternum" :label="'第 ' + chapter.chapter.chapternum + ' 章：' + chapter.chapter.chaptername" :value="chapter.chapter.chapterid">
                  </el-option>
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
          <el-button type="primary" @click="showDialog">下载考试模板</el-button>
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
        </div>
        <div v-if="selectedMenuItem === 'markpaper'">
          <h2>批改试卷</h2>
          <el-table :data="unFinishedExamList">
            <el-table-column prop="date" label="考试时间">
              <template #default="{ row }">
                <el-icon>
                  <Clock />
                </el-icon>
                {{ row.date[0]+'-'+row.date[1]+'-'+row.date[2]}}&nbsp;{{row.date[3]+':'+row.date[4]}}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="考试项目"></el-table-column>
            <el-table-column prop="totalTime" label="考试时长(min)"></el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button type="primary" size="small" @click="handleButtonClick(scope.row)">进入考试</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="selectedMenuItem === 'viewgrade'">
          <h2>查看成绩</h2>
          <!-- 查看成绩界面的内容 -->
        </div>
        <div v-if="selectedMenuItem === 'publishannounce'">
          <el-row class="announcement-header">
            <el-col :span="5">
              <h2>发布公告</h2>
            </el-col>
            <el-col :span="12">
              <div v-if="detail&&detail.announcement" class="announcement-button">
                <el-button type="primary" @click="updateAnnounce">更新公告</el-button>
              </div>
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