<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getPublishClassAPI } from '@/apis/teacherAPI'
import { ElMessage } from 'element-plus'

const router = useRouter()

const gotoPrevious = () => {
  router.push('/teacher')
}

const form = ref({
  courseName: '',
  courseDescription: '',
  startDate: null,
  startTime: '',
  endDate: null,
  endTime: '',
  courseCover: '',
  period: ''
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

const uploadUrl = '/api3' + '/classes/uploadcover'

const showCover = ref(false)
const onUploadSuccess = (response) => {
  //console.log(response)
  form.value.courseCover = response.data
  //console.log(form.value.courseCover)
  showCover.value = true
}

const isSubmitButtonDisabled = computed(() => {
  return Object.values(form.value).some((value, index) => {
    const key = Object.keys(form.value)[index]
    return key !== 'period' && value === ''
  })
})

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
  //console.log(form.value.courseName)
  //console.log(form.value.courseDescription)
  //console.log(form.value.period)
  //console.log(starttime)
  //console.log(endtime)
  //console.log(form.value.courseCover)
  const result = await getPublishClassAPI(
    form.value.courseName,
    form.value.courseDescription,
    form.value.period,
    starttime,
    endtime,
    form.value.courseCover
  )
  if (result.data.code == 200) {
    ElMessage.success('新增课程申请已提交')
    gotoPrevious()
  } else {
    ElMessage.error('新增课程申请提交失败')
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
    <h1>提交申请</h1>
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
          <div v-if="showCover" class="curriculum-cover">
            <img :src="form.courseCover">
          </div>
          <el-upload :action="uploadUrl" :show-file-list="false" :on-success="onUploadSuccess">
            <el-button>上传封面</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="isSubmitButtonDisabled" @click="submitClass">提交申请</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
  
  <style scoped>
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
</style>