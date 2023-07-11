<script setup>
import { getClassesAPI, getExportClassesAPI } from '@/apis/teacherAPI'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const activeTab = ref('myCourses')

function changeTab(tab) {
  activeTab.value = tab
}

const exportClasses = async () => {
  //调用导出所有课程方法，直接下载
  const result = await getExportClassesAPI();
  if (result.data.code==200){
  	ElMessage({ type: 'success', message: result.data.msg})
  	window.open(result.data.data);
  }else{
  	ElMessage({ type: 'error', message:result.data.msg})
  }
  console.log(searchByClassName.value + ' ' + searchByStudent.value);
}

const router = useRouter()
//跳转至发布课程界面
const publishClass = () => {
  router.push('/teacher/publish')
}

//已通过
const passesClassList = ref([])
//未审批+有更新
const unpassesClassList = ref([])
//已驳回
const rejectedClassList = ref([])
const getClassesList = async (status) => {
  if (status == '已通过') {
    const result = await getClassesAPI(status)
    passesClassList.value = result.data.data
    console.log('passclasslist' + passesClassList.value)
  }
  if (status == '未审批') {
    const result = await getClassesAPI(status)
    unpassesClassList.value = [...unpassesClassList.value, ...result.data.data]
    console.log('unpassclasslist' + unpassesClassList.value)
  }
  if (status == '有更新') {
    const result = await getClassesAPI(status)
    unpassesClassList.value = [...unpassesClassList.value, ...result.data.data]
    console.log('unpassclasslist' + unpassesClassList.value)
  }
  if (status == '已驳回') {
    const result = await getClassesAPI(status)
    rejectedClassList.value = result.data.data
    console.log('rejectedClassList' + rejectedClassList.value)
  }
}

onMounted(() => {
  getClassesList('已通过')
  getClassesList('有更新')
  getClassesList('未审批')
  getClassesList('已驳回')
})

// const getClassesList = async () => {
//         const result = await getClassesAPI()
//         passesClassList.value = result.data.data
//         //console.log('passclasslist'+passesClassList.value)

//         unpassesClassList.value = [...unpassesClassList.value, ...result.data.data]
//         //console.log('unpassclasslist'+unpassesClassList.value)

//         unpassesClassList.value = [...unpassesClassList.value, ...result.data.data]
//         //console.log('unpassclasslist'+unpassesClassList.value)

//         rejectedClassList.value = result.data.data
//         //console.log('rejectedClassList'+rejectedClassList.value)
// }

// onMounted(()=>{
//     getClassesList()

// })
</script>

<template>
  <div>
    <nav class="navbar">
      <ul>
        <li :class="{ active: activeTab === 'myCourses' }" @click="changeTab('myCourses')">我的课程</li>
        <li :class="{ active: activeTab === 'underReview' }" @click="changeTab('underReview')">审核中</li>
        <li :class="{ active: activeTab === 'reviewFailed' }" @click="changeTab('reviewFailed')">审核未通过</li>
        <el-button type="primary" size="large" style="margin-left: 100px;" @click="exportClasses()">导出所有课程信息</el-button>
        <el-button type="primary" size="large" @click="publishClass">＋发布课程</el-button>
      </ul>
    </nav>
    <div class="content">
      <div v-if="activeTab === 'myCourses'" class="tab-content">
        <!-- <h2>我的课程</h2> -->
        <!-- 我的课程内容 -->
        <div class='curriculum-list' v-if="passesClassList">
          <div class="curriculum-item" style='background:#f6f6f6;width:32%' v-for="(passclass,index) in passesClassList" :key="index">
            <RouterLink :to="'/teacher/passdetail/'+passclass.classid" class="router-link">
              <img :src="passclass.cover">
              <div style='font-weight: 400;
                            font-size:20px;margin-left:10px;
                            margin-top:10px;
                            margin-bottom:10px'>{{passclass.classname}}</div>
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'underReview'" class="tab-content">
        <!-- <h2>审核中</h2> -->
        <!-- 审核中内容 -->
        <div class='curriculum-list' v-if="unpassesClassList">
          <div class="curriculum-item" style='background:#f6f6f6;width:32%' v-for="(unpassclass,index) in unpassesClassList" :key="index">
            <RouterLink :to="'/teacher/unpassdetail/'+unpassclass.classid" class="router-link">
              <img :src="unpassclass.cover">
              <div style='font-weight: 400;
                            font-size:20px;margin-left:10px;
                            margin-top:10px;
                            margin-bottom:10px'>{{unpassclass.classname}}</div>
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'reviewFailed'" class="tab-content">
        <!-- <h2>审核未通过</h2> -->
        <!-- 审核未通过内容 -->
        <div class='curriculum-list' v-if="rejectedClassList">
          <div class="curriculum-item" style='background:#f6f6f6;width:32%' v-for="(rejectedClass,index) in rejectedClassList" :key="index">
            <RouterLink :to="'/teacher/rejectdetail/'+rejectedClass.classid" class="router-link">
              <img :src="rejectedClass.cover">
              <div style='font-weight: 400;
                            font-size:20px;margin-left:10px;
                            margin-top:10px;
                            margin-bottom:10px'>{{rejectedClass.classname}}</div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
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

.curriculum-item {
  text-align: center;
  float: left;
  margin-top: 20px;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 150px;
  }
}

.curriculum-list {
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
}

.router-link {
  text-decoration: none;
  color: inherit;
}
.router-link:hover {
  color: #4095e5;
}
</style>
