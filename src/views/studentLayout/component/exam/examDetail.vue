<script setup>
import { onMounted, ref, computed } from 'vue'
import {
  getExamDetailAPI,
  getUnFinishedExamAPI,
  getPassExamAPI,
  getFailExamAPI
} from '@/apis/studentExamAPI'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
const selected = 'unFinished'
const route = useRoute()
const classid = route.params.id
const detialInfo = ref(null)

const getDetailInfo = async (classid) => {
  const result = await getExamDetailAPI(classid)
  detialInfo.value = result.data.data
  console.log(detialInfo.value)
}

const unFinishedExamList = ref([])
const passExamList = ref([])
const failExamList = ref([])

const getUnFinishedExamList = async (classid) => {
  const result = await getUnFinishedExamAPI(classid)
  unFinishedExamList.value = result.data.data
  unFinishedExamList.value = unFinishedExamList.value.filter(
    (item) => item.status !== '未批改'
  )
  console.log(unFinishedExamList.value)
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

onMounted(() => {
  getUnFinishedExamList(classid)
  getPassExamList(classid)
  getFailExamList(classid)
  getDetailInfo(classid)
})
const router = useRouter()
const gotoPrevious = () => {
  router.push('/student/exam')
}

const checktime = (data) => {
  const backendTimeStr = data.date
  const backendTime = new Date(backendTimeStr.replace(' ', 'T'))
  const backendTimeISO = backendTime.toISOString().slice(0, -5)
  const interval = data.totalTime * 60 * 1000
  const currentTime = new Date()

  if (
    currentTime.toISOString().slice(0, -5) >= backendTimeISO &&
    currentTime <= backendTime.getTime() + interval
  ) {
    handleButtonClick(data)
    console.log('能用')
    console.log(backendTime.getTime() + interval - currentTime)
  } else {
    ElMessage.warning('未在考试时间内')
  }
  console.log(currentTime)
}

//测试数据
const handleButtonClick = (data) => {
  router.push({
    path: '/student/exam/detail/content/' + data.id,
    query: {
      date: data.date,
      time: data.totalTime
    }
  })
  console.log('点击了按钮', data.totalTime)
  // 在这里可以执行按钮点击后的逻辑操作
}

const services = [
  { date: '2023-6-15', name: '母猪的产后护理', totalTime: '100' },
  { date: '2023-6-18', name: '霸道GPT爱上我', totalTime: '60' },
  { date: '2023-7-5', name: '怀民亦未寝', totalTime: '120' }
  // ...其他数据
]
</script>

<template>
  <div v-if="detialInfo">
    <el-button @click="gotoPrevious()">返回</el-button>
    {{ detialInfo.classes.classname }} - {{ classid }}
  </div>
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
  <div class="content">
    <!-- 未完成考试 -->
    <div v-if="selected === 'unFinished'">
      <el-table :data="unFinishedExamList">
        <el-table-column prop="date" label="考试时间">
          <template #default="{ row }">
            <el-icon>
              <Clock />
            </el-icon>
            {{ row.date }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="考试项目"></el-table-column>
        <el-table-column prop="totalTime" label="考试时长(min)"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" @click="checktime(scope.row)">进入考试</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 及格考试 -->
    <div v-if="selected === 'pass'">
      <el-table :data="passExamList">
        <el-table-column prop="date" label="考试时间">
          <template #default="{ row }">
            <el-icon>
              <Clock />
            </el-icon>
            {{ row.date }}
          </template>
        </el-table-column>
        <el-table-column prop="examname" label="考试项目"></el-table-column>
        <el-table-column prop="grade" label="考试成绩"></el-table-column>
      </el-table>
    </div>
    <!-- 不及格考试 -->
    <div v-if="selected === 'fail'">
      <el-table :data="failExamList">
        <el-table-column prop="date" label="考试时间">
          <template #default="{ row }">
            <el-icon>
              <Clock />
            </el-icon>
            {{ row.date }}
          </template>
        </el-table-column>
        <el-table-column prop="examname" label="考试项目"></el-table-column>
        <el-table-column prop="grade" label="考试成绩"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
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

.content {
  padding: 0px;
  margin-top: 0px;
}
</style>
