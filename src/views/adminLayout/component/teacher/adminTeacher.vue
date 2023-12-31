<script setup>
import { onMounted, ref, computed } from 'vue'
import {
  getTeacherInfoAPI,
  getSearchTeacherAPI,
  getTeacherDetailAPI,
  getDeleteTeacherAPI
} from '@/apis/adminTeacherAPI'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()

const drawer = ref(false)
const searchByTeacher = ref('')
//校验
const checkIsChEnNum = (str) => {
  // 如果值为空，通过校验
  if (str.trim() === '') return true
  var pattern = /^[A-Za-z0-9\u4e00-\u9fa5\s]+$/gi
  if (pattern.test(str) && !str.startsWith(' ') && !str.endsWith(' ')) {
    return true
  } else {
    return false
  }
}

//学生总表
const teacherList = ref([])
const getTeacherList = async () => {
  const result = await getTeacherInfoAPI()
  teacherList.value = result.data.data
}

//获取搜索学生
const getSearchTeacherListByTeacher = async (teacher) => {
  const result = await getSearchTeacherAPI(teacher)
  teacherList.value = result.data.data
  currentPage.value = 1
}

const getSearchByTeacher = async () => {
  if (searchByTeacher.value == '') {
    getTeacherList()
  }
  if (searchByTeacher.value) {
    if (checkIsChEnNum(searchByTeacher.value)) {
      const result = await getSearchTeacherListByTeacher(searchByTeacher.value)
      // teacherList.value = result.data
      console.log('teacherList' + teacherList.value)
    } else {
      ElMessage.error('请输入数字或中文或组成的课程名')
      searchByTeacher.value = ''
    }
  }
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
  return teacherList.value.slice(startIndex, endIndex)
})

onMounted(() => {
  getTeacherList()
})
const searchInfo = ref([])
//查询学生信息方法
const searchTeacherInfo = async (teacherid) => {
  const result = await getTeacherDetailAPI(teacherid)
  searchInfo.value = result.data
  // await Promise.resolve();
  drawer.value = true
  // console.log('点击了按钮', data);
  // 在这里可以执行按钮点击后的逻辑操作
}

//删除用户界面
const deleteTeacher = async (teacherid) => {
  const result = await getDeleteTeacherAPI(teacherid)
  if (result.data.code == 200) {
    ElMessage.success('删除用户成功')
    getTeacherList()
  } else {
    ElMessage.error('删除用户失败')
  }
}

//跳转到注销处理界面
const dealCancel = () => {
  // 跳转到另一个界面
  router.push('/admin/teacher/cancel')
}
</script>

<template>
  <div>
    <!-- 搜索导出栏 -->
    <div class="searchBox" style="display: flex; align-items: center; margin-top: 10px;">
      <el-input v-model.trim="searchByTeacher" class="w-50 m-2" size="large" placeholder="请输入老师姓名" :prefix-icon="Search" @keyup.enter="getSearchByTeacher" style="width: 30%; margin-right: 10px;" />
      <el-button type="primary" @click="dealCancel">注销处理</el-button>
    </div>
    <el-table :data="currentPageData">
      <el-table-column prop="teacher.id" label="老师id"></el-table-column>
      <el-table-column prop="teacher.name" label="老师姓名"></el-table-column>
      <el-table-column prop="teacher.gender" label="性别">
        <template #default="scope">
          <span>{{ scope.row.teacher.gender ? '男' : '女' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="classNum" label="老师课程数"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="searchTeacherInfo(scope.row.teacher.id)">查看老师信息</el-button>
          <el-button type="warning" size="small" @click="deleteTeacher(scope.row.teacher.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="pagination-container">
      <el-pagination @current-change="handlePageChange" :current-page="currentPage" :page-size="pageSize" :total="teacherList.length" layout="prev, pager, next"></el-pagination>
    </div>
    <!-- 展示学生个人信息的部分 -->
    <el-drawer v-model="drawer" title="老师信息" :direction="direction">
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
  </div>
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
