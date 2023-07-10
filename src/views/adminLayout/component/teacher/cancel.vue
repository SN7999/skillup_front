<script setup>
import { onMounted, ref, computed } from 'vue'
import {
  getTeacherDetailAPI,
  getTeacherCancelAPI,
  getSearchTeacherCancelAPI,
  getAgreeCancelTeacherAPI,
  getRejectCancelTeacherAPI
} from '@/apis/adminTeacherAPI'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()

const drawer = ref(false)
const searchByTeacher = ref('')

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
  const result = await getTeacherCancelAPI()
  teacherList.value = result.data.data
  console.log(teacherList.value)
}

//获取搜索学生
const getSearchTeacherListByTeacher = async (teacher) => {
  const result = await getSearchTeacherCancelAPI(teacher)
  teacherList.value = result.data
  currentPage.value = 1
}

const getSearchByStudent = async () => {
  if (searchByTeacher.value == '') {
    getTeacherList()
  }
  if (searchByTeacher.value) {
    if (checkIsChEnNum(searchByTeacher.value)) {
      const result = await getSearchTeacherListByTeacher(searchByTeacher.value)
      teacherList.value = result.data
      // console.log('彳亍'+searchByStudent.value);
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
  console.log(teacherList.value.slice(startIndex, endIndex))
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

//跳转到管理学生界面
const goback = () => {
  // 跳转到另一个界面
  router.push('/admin/teacher')
}

//同意注销
const acceptCancel = async (teacherid) => {
  const result = await getAgreeCancelTeacherAPI(teacherid)
  if (result.data.code == 200) {
    ElMessage.success('同意用户注销成功')
    getTeacherList()
  } else {
    ElMessage.error('同意注销失败！')
  }
}

const cancelDialogVisible = ref(false)
const rejectid = ref(null)
const rejectReason = ref(null)
//驳回注销
const rejectCancel = (teacherid) => {
  rejectid.value = teacherid
  cancelDialogVisible.value = true
}

const agreeReject = async () => {
  if (!rejectReason.value) {
    ElMessage.error('驳回原因不能为空')
    return
  }
  console.log('rejectid' + rejectid.value)
  console.log('rejectReason' + rejectReason.value)
  const result = await getRejectCancelTeacherAPI(
    rejectid.value,
    rejectReason.value
  )
  if (result.data.code == 200) {
    ElMessage.success('驳回用户注销成功')
    getTeacherList()
  } else {
    ElMessage.error('驳回注销失败！')
  }
  rejectid.value = null
  rejectReason.value = null
  cancelDialogVisible.value = false
}
</script>

<template>
  <!-- 我是学生注销处理界面 -->
  <div>
    <!-- 搜索导出栏 -->
    <div class="searchBox" style="display: flex; align-items: center; margin-top: 10px;">
      <el-button type="primary" @click="goback">返回</el-button>
      <h36 style="margin-left: 20px;margin-right: 20px;">注销申请处理</h36>
      <el-input v-model.trim="searchByTeacher" class="w-50 m-2" size="large" placeholder="请输入老师姓名" :prefix-icon="Search" @keyup.enter="getSearchByStudent" style="width: 30%; margin-right: 10px;" />
      <el-button type="primary" @click="allAgreeCancel">批量同意</el-button>
    </div>
    <el-table :data="currentPageData">
      <el-table-column prop="id" label="老师id" width="300"></el-table-column>
      <el-table-column prop="name" label="老师姓名" width="200"></el-table-column>
      <el-table-column prop="gender" label="性别" width="200">
        <template #default="scope">
          <span>{{ scope.row.gender ? '男' : '女' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="canceltime" label="申请注销时间" width="200">
        <!-- <template #default="scope">
          <span>`{{ `${scope.row.canceltime[0]}-${String(scope.row.canceltime[1]).padStart(2, '0')}-${String(scope.row.canceltime[2]).padStart(2, '0')} ${String(scope.row.canceltime[3]).padStart(2, '0')}:${String(scope.row.canceltime[4]).padStart(2, '0')}:${String(scope.row.canceltime[5]).padStart(2, '0')}` }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <el-button type="primary" size="small" @click="searchTeacherInfo(scope.row.id)">查看老师信息</el-button>
          <el-button type="warning" size="small" @click="acceptCancel(scope.row.id)">同意注销</el-button>
          <el-button type="warning" size="small" @click="rejectCancel(scope.row.id)">驳回注销</el-button>
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
    <el-dialog v-model="cancelDialogVisible" title="驳回请求">
      <div>
        此操作将驳回该用户的注销请求，请输入驳回原因：
        <el-input type="textarea" :rows="2" placeholder="请输入驳回原因" v-model="rejectReason" style="margin-top: 20px;margin-bottom: 20px;"></el-input>
      </div>
      <div class="dialog-footer">
        <el-button @click="cancelDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="agreeReject">确定</el-button>
      </div>
    </el-dialog>
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
