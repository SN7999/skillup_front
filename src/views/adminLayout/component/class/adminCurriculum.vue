<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, computed } from 'vue'
import {
  getUnpassClassAPI,
  getRejectClassAPI,
  getUnpassResourceAPI,
  getRejectResourceAPI,
  getPassAPI,
  getTeacherDetailAPI,
  getClassDetailAPI,
  getExamineClassAPI,
  getExamineResourceAPI
} from '@/apis/adminAPI'
import { ElMessage } from 'element-plus'

const activeTab = ref('classReview')
function changeTab(tab) {
  activeTab.value = tab
}

//未审核的新课程申请
const unpassClass = ref([])
const getUnpassClassList = async () => {
  const result = await getUnpassClassAPI(null)
  unpassClass.value = result.data.data
}

const currentPageUnpassClass = ref(1)
//每页显示条数
const pageSize = 20
const handleUnpassClassPageChange = (page) => {
  currentPageUnpassClass.value = page
}
const currentUnpassClassPageData = computed(() => {
  const startIndex = (currentPageUnpassClass.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return unpassClass.value.slice(startIndex, endIndex)
})

//已驳回的新课程申请
const rejectClass = ref([])
const getRejectClassList = async () => {
  const result = await getRejectClassAPI(null)
  rejectClass.value = result.data.data
}

const currentPageRejectClass = ref(1)
const handleRejectClassPageChange = (page) => {
  currentPageRejectClass.value = page
}
const currentRejectClassPageData = computed(() => {
  const startIndex = (currentPageRejectClass.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return rejectClass.value.slice(startIndex, endIndex)
})

//未审核课程资源更新
const unpassResource = ref([])
const getUnpassResourceList = async () => {
  const result = await getUnpassResourceAPI(null)
  unpassResource.value = result.data.data
}

const currentPageUnpassResource = ref(1)
const handleUnpassResourcePageChange = (page) => {
  currentPageUnpassResource.value = page
}
const currentUnpassResourcePageData = computed(() => {
  const startIndex = (currentPageUnpassResource.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return unpassResource.value.slice(startIndex, endIndex)
})

//已驳回的课程资源更新
const rejectResource = ref([])
const getRejectResourceList = async () => {
  const result = await getRejectResourceAPI(null)
  rejectResource.value = result.data.data
}

const currentPageRejectResource = ref(1)
const handleRejectResourcePageChange = (page) => {
  currentPageRejectResource.value = page
}
const currentRejectResourcePageData = computed(() => {
  const startIndex = (currentPageRejectResource.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return rejectResource.value.slice(startIndex, endIndex)
})

//审核通过的课程及资源
const passList = ref([])
const getPassList = async () => {
  const result = await getPassAPI(null)
  passList.value = result.data.data
  console.log(`output->passList.value`, passList.value)
}

const currentPagePass = ref(1)
const handlePassPageChange = (page) => {
  currentPagePass.value = page
}
const currentPassPageData = computed(() => {
  const startIndex = (currentPagePass.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return passList.value.slice(startIndex, endIndex)
})

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(
    2,
    '0'
  )}`
}

//展示老师个人信息
const drawerteacher = ref(false)
const teacherInfo = ref([])
const showTeacherInfo = async (teacherid) => {
  const result = await getTeacherDetailAPI(teacherid)
  teacherInfo.value = result.data.data
  console.log('teacherInfo' + teacherInfo.value)
  drawerteacher.value = true
}

const drawerclass = ref(false)
const classInfo = ref([])
//展示课程详情
const showClassInfo = async (classid) => {
  const result = await getClassDetailAPI(classid)
  classInfo.value = result.data.data
  console.log(`output->classInfo`, classInfo)
  drawerclass.value = true
}

//同意课程申请
const agreeClassApply = async (classid) => {
  const result = await getExamineClassAPI(classid, 1, null)
  if (result.data.code == 200) {
    ElMessage.success('同意课程申请成功！')
    getUnpassClassList()
    getRejectClassList()
  } else {
    ElMessage.error('同意课程申请失败！')
  }
}

const rejectClassDialogVisible = ref(false)
const rejectClassId = ref(null)
const rejectClassReason = ref(null)
//驳回课程申请
const rejectClassApply = (classid) => {
  rejectClassId.value = classid
  rejectClassDialogVisible.value = true
}

const agreeClassReject = async () => {
  if (!rejectClassReason.value) {
    ElMessage.error('驳回原因不能为空')
    return
  }
  console.log('rejectClassId' + rejectClassId.value)
  console.log('rejectClassReason' + rejectClassReason.value)
  const result = await getExamineClassAPI(
    rejectClassId.value,
    0,
    rejectClassReason.value
  )
  if (result.data.code == 200) {
    ElMessage.success('驳回课程申请成功')
  } else {
    ElMessage.error('驳回课程申请失败！')
  }
  rejectClassId.value = null
  rejectClassReason.value = null
  rejectClassDialogVisible.value = false
}

//校验
const checkIsChEnNum = (str) => {
  //如果值为空，通过校验
  if (str == '') return true
  var pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+$/gi
  if (pattern.test(str)) return true
  else return false
}

//搜索未审核新课程
const searchUnpassClass = ref('')

const getSearchUnpassClassById = async () => {
  const result = await getUnpassClassAPI(searchUnpassClass.value)
  unpassClass.value = result.data.data
  console.log(`output->unpassClass.value`, unpassClass.value)
  currentPageUnpassClass.value = 1
}

const getSearchUnpassClass = async () => {
  if (searchUnpassClass.value == '') {
    getUnpassClassList()
  }
  if (searchUnpassClass.value) {
    if (checkIsChEnNum(searchUnpassClass.value)) {
      getSearchUnpassClassById()
    } else {
      ElMessage.error('请输入数字或中文或组成的课程名')
      searchUnpassClass.value = ''
    }
  }
}

//搜索已驳回新课程申请
const searchRejectClass = ref('')

const getSearchRejectClassById = async () => {
  const result = await getRejectClassAPI(searchRejectClass.value)
  rejectClass.value = result.data.data
  console.log(`output->rejectClass.value`, rejectClass.value)
  currentPageRejectClass.value = 1
}

const getSearchRejectClass = async () => {
  if (searchRejectClass.value == '') {
    getRejectClassList()
  }
  if (searchRejectClass.value) {
    if (checkIsChEnNum(searchRejectClass.value)) {
      getSearchRejectClassById()
    } else {
      ElMessage.error('请输入数字或中文或组成的课程名')
      searchRejectClass.value = ''
    }
  }
}

//搜索未审核的课程资源申请
const searchUnpassResource = ref('')

const getSearchUnpassResourceById = async () => {
  const result = await getUnpassResourceAPI(searchUnpassResource.value)
  unpassResource.value = result.data.data
  console.log(`output->unpassResource.value`, unpassResource.value)
  currentPageUnpassResource.value = 1
}

const getSearchUnpassResource = async () => {
  if (searchUnpassResource.value == '') {
    getUnpassResourceList()
  }
  if (searchUnpassResource.value) {
    if (checkIsChEnNum(searchUnpassResource.value)) {
      getSearchUnpassResourceById()
    } else {
      ElMessage.error('请输入数字或中文或组成的课程名')
      searchUnpassResource.value = ''
    }
  }
}

//搜索已驳回的课程资源申请
const searchRejectResource = ref('')

const getSearchRejectResourceById = async () => {
  const result = await getRejectResourceAPI(searchRejectResource.value)
  rejectResource.value = result.data.data
  console.log(`output->rejectResource.value`, rejectResource.value)
  currentPageRejectResource.value = 1
}

const getSearchRejectResource = async () => {
  if (searchRejectResource.value == '') {
    getRejectResourceList()
  }
  if (searchRejectResource.value) {
    if (checkIsChEnNum(searchRejectResource.value)) {
      getSearchRejectResourceById()
    } else {
      ElMessage.error('请输入数字或中文或组成的课程名')
      searchRejectResource.value = ''
    }
  }
}

//搜索已通过的课程
const searchPass = ref('')

const getSearchPassById = async () => {
  const result = await getRejectResourceAPI(searchRejectResource.value)
  passList.value = result.data.data
  console.log(`output->passList.value`, passList.value)
  currentPagePass.value = 1
}

const getSearchPass = async () => {
  if (searchPass.value == '') {
    getPassList()
  }
  if (searchPass.value) {
    if (checkIsChEnNum(searchPass.value)) {
      getSearchPassById()
    } else {
      ElMessage.error('请输入数字或中文或组成的课程名')
      searchPass.value = ''
    }
  }
}

//同意资源申请
const agreeResourceApply = async (resourceid) => {
  const result = await getExamineResourceAPI(resourceid, 1, null)
  if (result.data.code == 200) {
    ElMessage.success('同意资源申请成功！')
    getUnpassResourceList()
    getRejectResourceList()
  } else {
    ElMessage.error('同意资源申请失败！')
  }
}

const rejectResourceDialogVisible = ref(false)
const rejectResourceId = ref(null)
const rejectResourceReason = ref(null)
//驳回课程申请
const rejectResourceApply = (resourceid) => {
  rejectResourceId.value = resourceid
  rejectResourceDialogVisible.value = true
}

const agreeResourceReject = async () => {
  if (!rejectResourceReason.value) {
    ElMessage.error('驳回原因不能为空')
    return
  }
  console.log('rejectClassId' + rejectResourceId.value)
  console.log('rejectResourceReason' + rejectResourceReason.value)
  const result = await getExamineResourceAPI(
    rejectResourceId.value,
    0,
    rejectResourceReason.value
  )
  if (result.data.code == 200) {
    ElMessage.success('驳回资源申请成功')
  } else {
    ElMessage.error('驳回资源申请失败！')
  }
  rejectResourceId.value = null
  rejectResourceReason.value = null
  rejectResourceDialogVisible.value = false
}

//下载资源
const downloadResource = (url) => {
  window.open(url, '_blank')
}

const showDetail = ref(false)
//展示课程资源、章节
const showDetailClassInfo = (row) => {
  showDetail.value = true
}

onMounted(() => {
  getUnpassClassList()
  getRejectClassList()
  getUnpassResourceList()
  getRejectResourceList()
  getPassList()
})
</script>

<template>
  <div>
    <!-- 我是管理员课程管理界面 -->
    <div class="searchBox" style="display: flex; align-items: center; margin-top: 10px;" v-if="activeTab=='classReview'">
      <el-input v-model.trim="searchUnpassClass" class="w-50 m-2" size="large" placeholder="请输入课程名称" :prefix-icon="Search" @keyup.enter="getSearchUnpassClass" style="width: 30%; margin-right: 10px;" />
      <el-button type="primary" @click="allAgree">批量同意</el-button>
    </div>
    <div class="searchBox" style="display: flex; align-items: center; margin-top: 10px;" v-if="activeTab=='classReject'">
      <el-input v-model.trim="searchRejectClass" class="w-50 m-2" size="large" placeholder="请输入课程名称" :prefix-icon="Search" @keyup.enter="getSearchRejectClass" style="width: 30%; margin-right: 10px;" />
    </div>
    <div class="searchBox" style="display: flex; align-items: center; margin-top: 10px;" v-if="activeTab=='resourceReview'">
      <el-input v-model.trim="searchUnpassResource" class="w-50 m-2" size="large" placeholder="请输入课程名称" :prefix-icon="Search" @keyup.enter="getSearchUnpassResource" style="width: 30%; margin-right: 10px;" />
      <el-button type="primary" @click="allAgree">批量同意</el-button>
    </div>
    <div class="searchBox" style="display: flex; align-items: center; margin-top: 10px;" v-if="activeTab=='resourceReject'">
      <el-input v-model.trim="searchRejectResource" class="w-50 m-2" size="large" placeholder="请输入课程名称" :prefix-icon="Search" @keyup.enter="getSearchRejectResource" style="width: 30%; margin-right: 10px;" />
    </div>
    <div class="searchBox" style="display: flex; align-items: center; margin-top: 10px;" v-if="activeTab=='passClass'">
      <el-input v-model.trim="searchPass" class="w-50 m-2" size="large" placeholder="请输入课程名称" :prefix-icon="Search" @keyup.enter="getSearchPass" style="width: 30%; margin-right: 10px;" />
    </div>
  </div>
  <nav class="navbar">
    <ul>
      <li :class="{ active: activeTab === 'classReview' }" @click="changeTab('classReview')">未审核的新课程申请</li>
      <li :class="{ active: activeTab === 'classReject' }" @click="changeTab('classReject')">已驳回的新课程申请</li>
      <li :class="{ active: activeTab === 'resourceReview' }" @click="changeTab('resourceReview')">未审核的课程资源申请</li>
      <li :class="{ active: activeTab === 'resourceReject' }" @click="changeTab('resourceReject')">已驳回的课程资源申请</li>
      <li :class="{ active: activeTab === 'passClass' }" @click="changeTab('passClass')">审核通过的课程及资源</li>
    </ul>
  </nav>
  <div class="content">
    <div v-if="activeTab === 'classReview'" class="tab-content">
      <!-- 未审核的新课程申请 -->
      <el-table :data="currentUnpassClassPageData">
        <el-table-column prop="classname" label="课程名称"></el-table-column>
        <el-table-column prop="classid" label="课程ID"></el-table-column>
        <el-table-column prop="applytime" label="课程申请时间">
          <template #default="scope">
            <span>{{ formatDate(scope.row.applytime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" @click="showClassInfo(scope.row.classid)">课程完整信息</el-button>
            <el-button type="primary" size="small" @click="showTeacherInfo(scope.row.teacherid)">课程老师信息</el-button>
            <el-button type="success" size="small" @click="agreeClassApply(scope.row.classid)">同意申请</el-button>
            <el-button type="warning" size="small" @click="rejectClassApply(scope.row.classid)">驳回申请</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="pagination-container">
        <el-pagination @current-change="handleUnpassClassPageChange" :current-page="currentPageUnpassClass" :page-size="pageSize" :total="unpassClass.length" layout="prev, pager, next"></el-pagination>
      </div>
    </div>
    <div v-if="activeTab === 'classReject'" class="tab-content">
      <!-- 已驳回的新课程申请 -->
      <el-table :data="currentRejectClassPageData">
        <el-table-column prop="classname" label="课程名称"></el-table-column>
        <el-table-column prop="classid" label="课程ID"></el-table-column>
        <el-table-column prop="applytime" label="课程申请时间">
          <template #default="scope">
            <span>{{ formatDate(scope.row.applytime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" @click="showClassInfo(scope.row.classid)">课程完整信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="pagination-container">
        <el-pagination @current-change="handleRejectClassPageChange" :current-page="currentPageRejectClass" :page-size="pageSize" :total="rejectClass.length" layout="prev, pager, next"></el-pagination>
      </div>
    </div>
    <div v-if="activeTab === 'resourceReview'" class="tab-content">
      <!-- 未审核的课程资源申请 -->
      <el-table :data="currentUnpassResourcePageData">
        <el-table-column prop="resourcename" label="资源名称"></el-table-column>
        <el-table-column prop="resourceId" label="资源ID"></el-table-column>
        <el-table-column prop="type" label="资源类型"></el-table-column>
        <el-table-column prop="classname" label="资源所属课程"></el-table-column>
        <el-table-column prop="updatetime" label="资源更新时间">
          <template #default="scope">
            <span>{{ formatDate(scope.row.updatetime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" @click="downloadResource(scope.row.url)">下载资源</el-button>
            <el-button type="success" size="small" @click="agreeResourceApply(scope.row.resourceId)">同意更新</el-button>
            <el-button type="warning" size="small" @click="rejectResourceApply(scope.row.resourceId)">驳回更新</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="pagination-container">
        <el-pagination @current-change="handleUnpassResourcePageChange" :current-page="unpassResource" :page-size="pageSize" :total="unpassResource.length" layout="prev, pager, next"></el-pagination>
      </div>
    </div>
    <div v-if="activeTab === 'resourceReject'" class="tab-content">
      <!-- 已驳回的课程资源申请 -->
      <el-table :data="currentRejectResourcePageData">
        <el-table-column prop="resourcename" label="资源名称"></el-table-column>
        <el-table-column prop="resourceId" label="资源ID"></el-table-column>
        <el-table-column prop="type" label="资源类型"></el-table-column>
        <el-table-column prop="classname" label="资源所属课程"></el-table-column>
        <el-table-column prop="updatetime" label="资源更新时间">
          <template #default="scope">
            <span>{{ formatDate(scope.row.updatetime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" @click="downloadResource(scope.row.url)">下载资源</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="pagination-container">
        <el-pagination @current-change="handleRejectResourcePageChange" :current-page="currentPageRejectResource" :page-size="pageSize" :total="rejectResource.length" layout="prev, pager, next"></el-pagination>
      </div>
    </div>
    <div v-if="activeTab === 'passClass'&&!showDetail" class="tab-content">
      <!-- 审核通过的课程及资源 -->
      <el-table :data="currentPassPageData">
        <el-table-column prop="classes.classname" label="课程名称"></el-table-column>
        <el-table-column prop="classes.classid" label="课程ID"></el-table-column>
        <el-table-column prop="classes.teacher" label="授课老师"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" @click="showDetailClassInfo(scope.row)">课程完整信息</el-button>
            <el-button type="warning" size="small" @click="deleteClass(scope.row.classes.classid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="pagination-container">
        <el-pagination @current-change="handlePassPageChange" :current-page="currentPagePass" :page-size="pageSize" :total="passList.length" layout="prev, pager, next"></el-pagination>
      </div>
    </div>
    <div v-if="activeTab === 'passClass'&&showDetail" class="tab-content">
      <el-row justify="start">
        <el-button type="primary" @click="showDetail = false">返回</el-button>
        <el-button type="warning" @click="deleteClass">删除</el-button>
      </el-row>
    </div>
  </div>
  <!-- 老师详情 -->
  <el-drawer v-model="drawerteacher" title="课程老师详情" :direction="direction">
    <div class="profile">
      <div class="profile-picture"><img class="avatar" :src="teacherInfo.imageurl" alt="头像" /></div>
      <div class="profile-details">
        <p>
          <span class="detail-label">姓名:</span>
          <span class="detail-value">{{teacherInfo.name}}</span>
        </p>
        <p>
          <span class="detail-label">ID:</span>
          <span class="detail-value">{{teacherInfo.id}}</span>
        </p>
        <p>
          <span class="detail-label">性别:</span>
          <span class="detail-value">{{teacherInfo.gender === true ? '男' : '女'}}</span>
        </p>
        <p>
          <span class="detail-label">年龄:</span>
          <span class="detail-value">{{teacherInfo.age}}</span>
        </p>
        <p>
          <span class="detail-label">院系:</span>
          <span class="detail-value">{{teacherInfo.academy}}</span>
        </p>
        <p>
          <span class="detail-label">联系方式:</span>
          <span class="detail-value">{{teacherInfo.contact}}</span>
        </p>
        <p>
          <span class="detail-label">个人简介:</span>
          <span class="detail-value">{{teacherInfo.selfintroduction}}</span>
        </p>
        <!-- <el-button type="primary" size="small" @click="test">查看学生信息</el-button> -->
        <!-- 其他个人资料展示 -->
      </div>
    </div>
  </el-drawer>
  <!-- 课程详情 -->
  <el-drawer v-model="drawerclass" title="课程详情" :direction="direction">
    <div class="profile">
      <div class="curriculum-cover">
        <img :src="classInfo.cover">
      </div>
      <div class="profile-details">
        <p>
          <span class="detail-label">课程名称:</span>
          <span class="detail-value">{{classInfo.classname}}</span>
        </p>
        <p>
          <span class="detail-label">课程ID:</span>
          <span class="detail-value">{{classInfo.classid}}</span>
        </p>
        <p>
          <span class="detail-label">授课老师:</span>
          <span class="detail-value">{{classInfo.teacher}}</span>
        </p>
        <p>
          <span class="detail-label">老师ID:</span>
          <span class="detail-value">{{classInfo.teacherid}}</span>
        </p>
        <p>
          <span class="detail-label">课程介绍:</span>
          <span class="detail-value">{{classInfo.introduction}}</span>
        </p>
        <p>
          <span class="detail-label">课程时间:</span>
          <span class="detail-value">{{classInfo.starttime}}-{{ classInfo.endtime }}</span>
        </p>
        <!-- <el-button type="primary" size="small" @click="test">查看学生信息</el-button> -->
        <!-- 其他个人资料展示 -->
      </div>
    </div>
  </el-drawer>
  <el-dialog v-model="rejectClassDialogVisible" title="驳回请求">
    <div>
      此操作将驳回该课程的申请请求，请输入驳回原因：
      <el-input type="textarea" :rows="2" placeholder="请输入驳回原因" v-model="rejectClassReason" style="margin-top: 20px;margin-bottom: 20px;"></el-input>
    </div>
    <div class="dialog-footer">
      <el-button @click="rejectClassDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="agreeClassReject">确定</el-button>
    </div>
  </el-dialog>
  <el-dialog v-model="rejectResourceDialogVisible" title="驳回请求">
    <div>
      此操作将驳回该课程的申请请求，请输入驳回原因：
      <el-input type="textarea" :rows="2" placeholder="请输入驳回原因" v-model="rejectResourceReason" style="margin-top: 20px;margin-bottom: 20px;"></el-input>
    </div>
    <div class="dialog-footer">
      <el-button @click="rejectResourceDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="agreeResourceReject">确定</el-button>
    </div>
  </el-dialog>
</template>

<style lang = "scss" scoped>
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
}

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