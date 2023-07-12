<script setup>
import {
  getShowHighScoreAPI,
  getStudentDetailAPI
} from '@/apis/adminStudentAPI'
import { ref, computed, onMounted } from 'vue'

const showNum = ref(null)
const highStudent = ref([])
const showHighScore = async () => {
  const result = await getShowHighScoreAPI(showNum.value)
  highStudent.value = result.data.data
  console.log(`output->highStudent.value`, highStudent.value)
}

const currentPage = ref(1)
//每页显示条数
const pageSize = 20
const handlePageChange = (page) => {
  currentPage.value = page
}
const currentPageData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return highStudent.value.slice(startIndex, endIndex)
})

const drawer = ref(false)
const searchInfo = ref([])
//查询学生信息方法
const searchStudentInfo = async (studentid) => {
  const result = await getStudentDetailAPI(studentid)
  searchInfo.value = result.data
  // await Promise.resolve();
  drawer.value = true
  // console.log('点击了按钮', data);
  // 在这里可以执行按钮点击后的逻辑操作
}

onMounted(() => {
  showHighScore()
})
</script>

<template>
  <!-- <div>我是积分排行</div> -->
  <div class="searchBox" style="display: flex; align-items: center; margin-top: 10px;">
    <el-input v-model.trim="showNum" class="w-50 m-2" size="large" placeholder="请指定您想要查看的排名前几位（数字）" :prefix-icon="Search" @keyup.enter="showHighScore" style="width: 30%; margin-right: 10px;" />
  </div>
  <el-table :data="currentPageData">
    <el-table-column prop="score" label="学生积分"></el-table-column>
    <el-table-column prop="id" label="学生id"></el-table-column>
    <el-table-column prop="name" label="学生姓名"></el-table-column>
    <el-table-column prop="gender" label="性别">
      <template #default="scope">
        <span>{{ scope.row.gender ? '男' : '女' }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" size="small" @click="searchStudentInfo(scope.row.id)">查看学生信息</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页器 -->
  <div class="pagination-container">
    <el-pagination @current-change="handlePageChange" :current-page="currentPage" :page-size="pageSize" :total="highStudent.length" layout="prev, pager, next"></el-pagination>
  </div>
  <el-drawer v-model="drawer" title="学生信息" :direction="direction">
    <div class="profile">
      <div class="profile-picture"><img class="avatar" :src="searchInfo.data.imageurl" alt="头像" /></div>
      <div class="profile-details">
        <p>
          <span class="detail-label">姓名:</span>
          <span class="detail-value">{{searchInfo.data.name}}</span>
        </p>
        <p>
          <span class="detail-label">ID:</span>
          <span class="detail-value">{{searchInfo.data.id}}</span>
        </p>
        <p>
          <span class="detail-label">性别:</span>
          <span class="detail-value">{{searchInfo.data.gender === true ? '男' : '女'}}</span>
        </p>
        <p>
          <span class="detail-label">年龄:</span>
          <span class="detail-value">{{searchInfo.data.age}}</span>
        </p>
        <p>
          <span class="detail-label">院系:</span>
          <span class="detail-value">{{searchInfo.data.academy}}</span>
        </p>
        <p>
          <span class="detail-label">联系方式:</span>
          <span class="detail-value">{{searchInfo.data.contact}}</span>
        </p>
        <p>
          <span class="detail-label">个人简介:</span>
          <span class="detail-value">{{searchInfo.data.selfintroduction}}</span>
        </p>
        <!-- <el-button type="primary" size="small" @click="test">查看学生信息</el-button> -->
        <!-- 其他个人资料展示 -->
      </div>
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-picture {
  width: height;
  height: 100%;
  border-radius: 50%;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.profile-details {
  font-size: 20px;
  text-align: left;
}
.detail-label {
  font-weight: bold;
}

.detail-value {
  margin-left: 5px;
}
</style>