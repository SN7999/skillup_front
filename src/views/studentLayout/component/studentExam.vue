<script setup>
import { getExamAPI, getSearchAPI } from '@/apis/studentExamAPI'
import { onMounted, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const examList = ref([])
const getExamList = async () => {
  const result = await getExamAPI()
  examList.value = result.data.data
  console.log(result)
}
onMounted(() => {
  getExamList()
  console.log(examList.value)
})

const searchExam = ref('')

const checkIsChEnNum = (str) => {
  //如果值为空，通过校验
  if (str == '') return true
  var pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+$/gi
  if (pattern.test(str)) return true
  else return false
}

const getSearchExamList = async (examName) => {
  const result = await getSearchAPI(examName)
  console.log('搜索返回的东西：')
  console.log(result)
  examList.value = result.data.data
}

const getSearchExam = () => {
  if (searchExam.value == '') {
    getExamList()
  }
  if (searchExam.value) {
    if (checkIsChEnNum(searchExam.value)) {
      getSearchExamList(searchExam.value)
      //console.log(searchExam.value)
    } else {
      ElMessage.error('请输入数字或中文或字母组成的课程名')
      searchExam.value = ''
    }
  }
}
</script>

<template>
  <div>
    <el-input v-model.trim="searchExam" class="w-50 m-2" size="large" placeholder="请输入数字或中文或字母组成的课程名" :prefix-icon="Search" @keyup.enter="getSearchExam" />

    <!-- 课程列表 -->
    <div class="exam-list">
      <div class="exam-item" style="background:#f6f6f6;width:32%" v-for="(exam, index) in examList" :key="index">
        <RouterLink :to="'/student/exam/detail/'+exam.classid" class="router-link">
          <img :src="exam.cover" />
          <div style="font-weight: 400;
                    font-size:20px;margin-left:10px;
                    margin-top:10px;
                    margin-bottom:10px">
            {{ exam.classname }}
          </div>
        </RouterLink>
      </div>
    </div>
    <!--课程列表 end-->
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.exam-item {
  text-align: center;

  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 10px;
  img {
    width: 100%;
    height: 250px;
  }
}
.router-link {
  text-decoration: none;
  color: inherit;
}
.router-link:hover {
  color: #4095e5;
}
.exam-list {
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
}
</style>
