<script setup>
import { onMounted, ref } from 'vue'
import {
  getTrainingDetailAPI,
  getChapterFinishAPI,
  getRandomAPI,
  getRandomTest,
  getRandomUp
} from '@/apis/studentTraingAPI'
import {
  getUnFinishedExamAPI,
  getPassExamAPI,
  getFailExamAPI
} from '@/apis/studentExamAPI'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const route = useRoute()
const router = useRouter()
const classid = route.params.id

//考试相关
const selected = 'unFinished'
const unFinishedExamList = ref([])
const passExamList = ref([])
const failExamList = ref([])
const getUnFinishedExamList = async (classid) => {
  const result = await getUnFinishedExamAPI(classid)
  unFinishedExamList.value = result.data.data
  // console.log('unFinishedExamList为'+unFinishedExamList.value);
}
const getPassExamList = async (classid) => {
  const result = await getPassExamAPI(classid)
  passExamList.value = result.data.data
  // console.log('passExamList为'+passExamList.value);
}
const getFailExamList = async (classid) => {
  const result = await getFailExamAPI(classid)
  failExamList.value = result.data.data
  // console.log('failExamList为'+failExamList.value);
}
const getExamLists = (classid) => {
  getUnFinishedExamList(classid)
  getPassExamList(classid)
  getFailExamList(classid)
}
const handleButtonClick = (data) => {
  router.push('/student/exam/detail/content/' + data.id)
  console.log('点击了按钮', data)
  // 在这里可以执行按钮点击后的逻辑操作
}

//根据课程id获取课程信息
//最终使用
const detialInfo = ref(null)
const getDetailInfo = async () => {
  const result = await getTrainingDetailAPI(classid)
  detialInfo.value = result.data.data
}

//测试使用
// const getDetailInfo = async () => {
//     const  result  = await getTrainingDetailAPI()
//     detialInfo.value = result.data.data
// }

onMounted(() => {
  //最终使用
  getDetailInfo()
  //测试使用
  //getDetailInfo()
})

//回退到上一页
const gotoPrevious = () => {
  router.push('/student/training')
}

const selectedMenuItem = ref('announcement')
const selectedMenu = ref('announcement')

const selectMenuItem = (item) => {
  selectedMenuItem.value = item
  selectedMenu.value = item
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
  getDetailInfo()
  selectedMenu.value = 'courseware'
  videoDuration.value = 0
  random.value = 0
  randomTest.value = null
  selectedOption.value = null
}

const videoDuration = ref(0)
const getTotalDuration = () => {
  const videoElement = document.getElementById('playVideos')
  videoDuration.value = videoElement.duration
}

const random = ref(0)
const videoRandom = async () => {
  const result = await getRandomAPI(parseInt(videoDuration.value))
  random.value = result.data.data
  console.log(`output->random.value`, random.value)
}

const randomTest = ref(null)
const dialogTestVisable = ref(false)
const videoRandomTest = async () => {
  console.log(`output->showChapter.value`, showChapter.value)
  const result = await getRandomTest(showChapter.value)
  randomTest.value = result.data.data
  console.log(`output->randomTest.value`, randomTest.value)
  if (randomTest.value) {
    dialogTestVisable.value = true
    console.log(`output->dialogTestVisable.value`, dialogTestVisable.value)
  }
}

let isPaused = false
const checkProgress = () => {
  console.log('chackProgress')
  const videoElement = document.getElementById('playVideos')
  if (videoElement.currentTime >= random.value && !isPaused) {
    videoElement.pause()
    isPaused = true
    videoRandomTest()
  }
}

const selectedOption = ref(null)
const submitRandomAnswer = async () => {
  if (selectedOption.value === randomTest.value.answer) {
    const result = await getRandomUp(1)
    ElMessage.success(result.data.msg)
    dialogTestVisable.value = false
  } else {
    const result = await getRandomUp(0)
    ElMessage.error(result.data.msg + '正确答案为' + randomTest.value.answer)
    dialogTestVisable.value = false
  }
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

const sendEnd = async (chapterid) => {
  const result = await getChapterFinishAPI(chapterid)
  console.log('章节完成' + result)
  getDetailInfo()
}
</script>

<template>
  <!-- 我是培训详情界面 -->
  <div v-if="detialInfo">
    <el-button @click="gotoPrevious()">
      返回
    </el-button>
    {{ detialInfo.classes.classname }}
    -
    {{ classid }}
  </div>
  <div class="page-container">
    <div class="content">
      <div class="sidebar">
        <div class="menu-item" @click="selectMenuItem('announcement')" :class="{ 'selected': selectedMenu === 'announcement' }">
          <el-icon name="el-icon-message"></el-icon>
          <span class="text">公告</span>
        </div>
        <div class="menu-item" @click="selectMenuItem('quiz')" :class="{ 'selected': selectedMenu === 'quiz' }">
          <el-icon name="el-icon-edit-outline"></el-icon>
          <span class="text">测验</span>
        </div>
        <div class="menu-item" @click="selectMenuItem('courseware')" :class="{ 'selected': selectedMenu === 'courseware' }">
          <el-icon name="el-icon-folder"></el-icon>
          <span class="text">课件</span>
        </div>
        <div class="menu-item" @click="selectMenuItem('exam'); getExamLists(classid)" :class="{ 'selected': selectedMenu === 'exam' }">
          <el-icon name="el-icon-document"></el-icon>
          <span class="text">考试</span>
        </div>
      </div>
      <div class="main">
        <!-- 根据选择的菜单显示不同的内容 -->
        <div v-if="selectedMenuItem === 'announcement'">
          <h2>公告</h2>
          <!-- 公告界面的内容 -->
          <div v-if="detialInfo">
            <!-- 公告的时间怎么没有 -->
            {{ detialInfo.classes.announcement }}
          </div>
        </div>
        <div v-if="selectedMenuItem === 'quiz'">
          <h2>测验内容</h2>
          <!-- 测验界面的内容 -->
        </div>
        <div v-if="selectedMenuItem === 'courseware'">
          <h2>课件</h2>
          <!-- 课件界面的内容 -->
          <div v-if="detialInfo">
            <div v-if="!showVideo&&!showTxtContent">
              <div v-for="chapter in detialInfo.chapters" :key="chapter.chapter.chapternum">
                <el-card style="margin-top: 10px;">
                  <h3 class="chapter-title" @click="toggleCollapse(chapter)">
                    <el-row>
                      <el-col span="12">
                        <div v-if="chapter.status === '已完成'">
                          <div class="circle green"></div>
                        </div>
                        <div v-else-if="chapter.status === '未完成'">
                          <div class="circle red"></div>
                        </div>
                      </el-col>
                      <el-col span="12">
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
                        <div v-if="resource.type === '视频'" class="resource-box video" @click="showVide(chapter.chapter.chapterid, resource)">
                          <p class="resource-text">视频：{{ resource.resourcename }}</p>
                        </div>
                        <div v-if="resource.type === '文本'" class="resource-box text" @click="showTxt(resource)">
                          <p class="resource-text">文本：{{ resource.resourcename }}</p>
                        </div>
                        <div v-if="resource.type === '图片'" class="resource-box document" @click="downloadDocument(resource)">
                          <p class="resource-text">图片：{{ resource.resourcename }}</p>
                        </div>
                        <div v-if="resource.type === '文档'" class="resource-box document" @click="downloadDocument(resource)">
                          <p class="resource-text">文档：{{ resource.resourcename }}</p>
                        </div>
                        <div v-if="resource.type === 'ppt'" class="resource-box document" @click="downloadDocument(resource)">
                          <p class="resource-text">PPT：{{ resource.resourcename }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-card>
              </div>
            </div>
          </div>
          <div v-if="showVideo">
            <!-- 视频展示界面 -->
            <video :src="getVideo()" id="playVideos" controls preload @loadedmetadata="getTotalDuration" @play.once="videoRandom" @timeupdate="checkProgress" @ended="sendEnd(showChapter)">
            </video>
            <p>视频总时长: {{ videoDuration }}</p>
            <button @click="videoBack()">返回</button>
          </div>
          <div v-if="showTxtContent">
            <!-- 根据需要设置文本展示区域的样式 -->
            <textarea v-model="txtContent" rows="10" cols="50" readonly></textarea>
            <button @click="txtBack()">返回</button>
          </div>
        </div>
        <el-dialog v-model="dialogTestVisable" title="请回答题目">
          {{ randomTest.question }}
          <el-radio-group v-model="selectedOption">
            <el-radio label="A" size="large">{{ randomTest.optionA }}</el-radio>
            <el-radio label="B" size="large">{{ randomTest.optionB }}</el-radio>
            <el-radio label="C" size="large">{{ randomTest.optionC }}</el-radio>
            <el-radio label="D" size="large">{{ randomTest.optionD }}</el-radio>
          </el-radio-group>
          <el-button @click="submitRandomAnswer">提交</el-button>
        </el-dialog>
        <div v-if="selectedMenuItem === 'exam'">
          <nav class="navbar">
            <ul>
              <li :class="{ active: selected === 'unFinished' }" @click="selected = 'unFinished'">
                <a href="#">未考试卷</a>
                <div class="underline" v-if="selected === 'unFinished'"></div>
              </li>
              <li :class="{ active: selected === 'pass' }" @click="selected = 'pass'">
                <a href="#">及格试卷</a>
                <div class="underline" v-if="selected === 'pass'"></div>
              </li>
              <li :class="{ active: selected === 'fail' }" @click="selected = 'fail'">
                <a href="#">不及格试卷</a>
                <div class="underline" v-if="selected === 'fail'"></div>
              </li>
            </ul>

          </nav>
          <div class="examcontent">
            <!-- 未完成考试 -->
            <div v-if="selected === 'unFinished'" class="examList">
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
            <!-- 及格考试 -->
            <div v-if="selected === 'pass'" class="examList">
              <el-table :data="passExamList">
                <el-table-column prop="date" label="考试时间">
                  <template #default="{ row }">
                    <el-icon>
                      <Clock />
                    </el-icon>
                    {{ row.date[0]+'-'+row.date[1]+'-'+row.date[2]}}&nbsp;{{row.date[3]+':'+row.date[4]+':'+row.date[5] }}
                  </template>
                </el-table-column>
                <el-table-column prop="examname" label="考试项目"></el-table-column>
                <el-table-column prop="grade" label="考试成绩"></el-table-column>
              </el-table>
            </div>
            <!-- 不及格考试 -->
            <div v-if="selected === 'fail'" class="examList">
              <el-table :data="failExamList">
                <el-table-column prop="date" label="考试时间">
                  <template #default="{ row }">
                    <el-icon>
                      <Clock />
                    </el-icon>
                    {{ row.date[0]+'-'+row.date[1]+'-'+row.date[2]}}&nbsp;{{row.date[3]+':'+row.date[4]+':'+row.date[5] }}
                  </template>
                </el-table-column>
                <el-table-column prop="examname" label="考试项目"></el-table-column>
                <el-table-column prop="grade" label="考试成绩"></el-table-column>
              </el-table>
            </div>
          </div>
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

.content-box {
  margin-bottom: 20px;
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

.navbar {
  // background-color: #f2f2f2;
  padding: 10px;
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: inline-block;
}

.navbar li {
  float: left;
  position: relative;
  margin-right: 10px;
}

.navbar li:last-child {
  margin-right: 0;
}

.navbar a {
  text-decoration: none;
  color: #333;
  padding: 5px;
}

.navbar li .underline {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
}

.navbar li.active .underline {
  background-color: #4095e5;
  height: 2px;
  bottom: -2px;
}

.navbar a:hover {
  color: #4095e5;
}

.examcontent {
  width: 100%;
  padding: 0px;
  margin-top: 0px;
}
.examList {
  width: 100%;
}
.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.green {
  background-color: green;
}

.red {
  background-color: red;
}
</style>