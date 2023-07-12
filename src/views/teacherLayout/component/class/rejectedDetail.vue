<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { getUpdateClassAPI } from '@/apis/teacherAPI'
import { getClassDetailAPI } from '@/apis/teacherAPI'
import { ElMessage } from 'element-plus'

const router = useRouter()

const gotoPrevious = () => {
  router.push('/teacher')
}

const route = useRoute()
const classid = route.params.id

const detail = ref(null)
// const getClassDetail = async (classid) => {
//     const  result  = await getClassDetailAPI(classid)
//     detail.value = result.data.data
// }

const getClassDetail = async (classid) => {
  const result = await getClassDetailAPI(classid)
  detail.value = result.data.data
  //console.log(detail.value.starttime)
  //console.log(detail.value.endtime)
  form.value.classid = detail.value.classid
  form.value.courseName = detail.value.classname
  form.value.courseDescription = detail.value.introduction
  form.value.courseCover = detail.value.cover

  if (detail.value.endtime) {
    const dateString1 = detail.value.endtime
    const dateObject1 = new Date(dateString1)

    // 获取各个日期和时间组件
    const dayOfWeek1 = dateObject1.toLocaleString('en-us', { weekday: 'short' })
    const month1 = dateObject1.toLocaleString('en-us', { month: 'short' })
    const day1 = dateObject1.getDate()
    const year1 = dateObject1.getFullYear()
    const hours1 = dateObject1.getHours()
    const minutes1 = dateObject1.getMinutes()
    const seconds1 = dateObject1.getSeconds()
    const timezoneOffset1 = dateObject1.getTimezoneOffset()

    // 转换为目标格式
    const formattedDate1 = `${dayOfWeek1} ${month1} ${day1} ${year1} ${hours1
      .toString()
      .padStart(2, '0')}:${minutes1.toString().padStart(2, '0')}:${seconds1
      .toString()
      .padStart(2, '0')} GMT${getTimezoneOffset(timezoneOffset1)}`

    //console.log(formattedDate1); // 输出: "Thu Jul 17 2023 00:00:00 GMT+0800"

    form.value.endDate = formattedDate1
    form.value.endTime = formattedDate1
  }

  if (detail.value.starttime) {
    const dateString2 = detail.value.starttime
    const dateObject2 = new Date(dateString2)

    // 获取各个日期和时间组件
    const dayOfWeek2 = dateObject2.toLocaleString('en-us', { weekday: 'short' })
    const month2 = dateObject2.toLocaleString('en-us', { month: 'short' })
    const day2 = dateObject2.getDate()
    const year2 = dateObject2.getFullYear()
    const hours2 = dateObject2.getHours()
    const minutes2 = dateObject2.getMinutes()
    const seconds2 = dateObject2.getSeconds()
    const timezoneOffset2 = dateObject2.getTimezoneOffset()

    // 转换为目标格式
    const formattedDate2 = `${dayOfWeek2} ${month2} ${day2} ${year2} ${hours2
      .toString()
      .padStart(2, '0')}:${minutes2.toString().padStart(2, '0')}:${seconds2
      .toString()
      .padStart(2, '0')} GMT${getTimezoneOffset(timezoneOffset2)}`

    //console.log(formattedDate2); // 输出: "Thu Jul 17 2023 00:00:00 GMT+0800"

    form.value.startDate = formattedDate2
    form.value.startTime = formattedDate2
  }
}

function getTimezoneOffset(offset) {
  const sign = offset > 0 ? '-' : '+'
  const absoluteOffset = Math.abs(offset)
  const hours = Math.floor(absoluteOffset / 60)
  const minutes = absoluteOffset % 60

  return `${sign}${hours.toString().padStart(2, '0')}${minutes
    .toString()
    .padStart(2, '0')}`
}

const form = ref({
  classid: '',
  courseName: '',
  courseDescription: '',
  startDate: null,
  startTime: '',
  endDate: null,
  endTime: '',
  courseCover: null,
  period: ''
})

onMounted(() => {
  //最终使用
  getClassDetail(classid)
  //测试使用
  //getClassDetail()
})

const rules = ref({
  courseName: [
    { required: true, message: '请输入课程名称', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
      message: '课程名称只能包含数字、字母和中文',
      trigger: 'blur'
    }
  ],
  courseDescription: [
    { required: true, message: '请输入课程介绍', trigger: 'blur' }
  ],
  startDate: [
    {
      required: true,
      type: 'date',
      message: '请选择开课日期',
      trigger: 'change'
    }
  ],
  startTime: [{ required: true, message: '请选择开课时间', trigger: 'change' }],
  endDate: [
    {
      required: true,
      type: 'date',
      message: '请选择结课日期',
      trigger: 'change'
    }
  ],
  endTime: [{ required: true, message: '请选择结课时间', trigger: 'change' }],
  courseCover: [
    { required: true, message: '请上传课程封面', trigger: 'change' }
  ]
})

const uploadUrl = '/api3' + '/teacher/uploadClassesCover'

const onUploadSuccess = (response) => {
  //   console.log(response)
  form.value.courseCover = response.data
  //   console(form.value.courseCover)
}

// 提交申请事件处理
const submitClass = async () => {
  //"yyyy-MM-dd HH:mm:ss"
  const dateString1 = form.value.startDate
  const dateObject1 = new Date(dateString1)
  // 获取年份、月份、和日期
  const year = dateObject1.getFullYear()
  const month = (dateObject1.getMonth() + 1).toString().padStart(2, '0')
  const day = dateObject1.getDate().toString().padStart(2, '0')
  // 拼接成最终的日期字符串
  const startdate1 = `${year}-${month}-${day}`
  //console.log(startdate1); // 输出: "2023-07-03"
  const dateString2 = form.value.startTime
  const dateObject2 = new Date(dateString2)
  // 获取小时、分钟和秒
  const hours = dateObject2.getHours().toString().padStart(2, '0')
  const minutes = dateObject2.getMinutes().toString().padStart(2, '0')
  const seconds = dateObject2.getSeconds().toString().padStart(2, '0')
  // 拼接成最终的时间字符串
  const starttime1 = `${hours}:${minutes}:${seconds}`
  //console.log(starttime1); // 输出: "09:30:35"
  const starttime = startdate1 + ' ' + starttime1
  //console.log(starttime)

  const dateString3 = form.value.endDate
  const dateObject3 = new Date(dateString3)
  // 获取年份、月份、和日期
  const year1 = dateObject3.getFullYear()
  const month1 = (dateObject3.getMonth() + 1).toString().padStart(2, '0')
  const day1 = dateObject3.getDate().toString().padStart(2, '0')
  // 拼接成最终的日期字符串
  const enddate = `${year1}-${month1}-${day1}`
  //console.log(enddate); // 输出: "2023-07-03"
  const dateString4 = form.value.endTime
  const dateObject4 = new Date(dateString4)
  // 获取小时、分钟和秒
  const hours1 = dateObject4.getHours().toString().padStart(2, '0')
  const minutes1 = dateObject4.getMinutes().toString().padStart(2, '0')
  const seconds1 = dateObject4.getSeconds().toString().padStart(2, '0')
  // 拼接成最终的时间字符串
  const endtime1 = `${hours1}:${minutes1}:${seconds1}`
  //console.log(endtime1); // 输出: "09:30:35"
  const endtime = enddate + ' ' + endtime1
  //console.log(endtime)

  //classname,introduction,period,starttime,endtime,cover
  console.log(form.value.courseName)
  console.log(form.value.courseDescription)
  console.log(form.value.period)
  console.log(starttime)
  console.log(endtime)
  console.log(form.value.courseCover)
  const result = await getUpdateClassAPI(
    form.value.classid,
    form.value.courseName,
    form.value.courseDescription,
    form.value.period,
    starttime,
    endtime,
    form.value.courseCover
  )
  if (result.data.code == 200) {
    ElMessage.success('修改课程申请已提交')
    gotoPrevious()
  } else {
    ElMessage.error('修改课程申请提交失败')
  }
}
</script>

<template>
  <div>
    <el-button style="size: large;" type="primary" @click="gotoPrevious()">
      返回
    </el-button>
  </div>
  <div class="container">
    <div class="form-wrapper">
      <el-form :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="课程名称" prop="courseName" required>
          <el-input v-model="form.courseName"></el-input>
        </el-form-item>

        <el-form-item label="课程介绍" prop="courseDescription" required>
          <el-input type="textarea" v-model="form.courseDescription"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="开课日期" prop="startDate" required>
              <el-date-picker v-model="form.startDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开课时间" prop="startTime" required>
              <el-time-picker v-model="form.startTime" placeholder="选择时间"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="结课日期" prop="endDate" required>
              <el-date-picker v-model="form.endDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结课时间" prop="endTime" required>
              <el-time-picker v-model="form.endTime" placeholder="选择时间"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="课程封面" prop="courseCover" required>
          <div v-if="form" class="curriculum-cover">
            <img :src="form.courseCover">
          </div>
          <el-upload :action="uploadUrl" :show-file-list="false" :on-success="onUploadSuccess">
            <el-button>上传封面</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitClass">提交申请</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
  
  <style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.demo-ruleForm {
  width: 80%;
  margin: 0 auto;
}

.delete-button {
  position: absolute;
  top: 5px;
  right: 5px;
}

.el-time-picker__popper .el-picker-panel {
  /* 设置合适的最大高度以避免内容超出容器 */
  max-height: 200px;
  /* 修改弹出框的定位方式为底部对齐 */
  position: absolute;
  bottom: 0;
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
</style>