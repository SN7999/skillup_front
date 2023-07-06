<script setup>
    import { useRouter } from 'vue-router'
    import { useRoute } from 'vue-router'
    import { ref, onMounted } from 'vue'
    import { getClassDetailAPI } from '@/apis/teacherClassAPI'
    const route = useRoute()
    const classid = route.params.id
    const router = useRouter();
    const gotoPrevious = () => {
        router.push('/teacher');
    }

    const selectedMenuItem = ref('classinfo');
    const selectedMenu = ref('classinfo')

    const selectMenuItem = (item) => {
        selectedMenuItem.value = item;
        selectedMenu.value = item;
    };

    const detail = ref(null)
    // const getClassDetail = async (classid) => {
    //     const  result  = await getClassDetailAPI(classid)
    //     detail.value = result.data.data
    // }

    const getClassDetail = async () => {
        const  result  = await getClassDetailAPI()
        detail.value = result.data.data
    }

    onMounted(()=>{
        //最终使用
        //getClassDetail(classid)
        //测试使用
        getClassDetail()
    })
</script>

<template>
    <!-- 我是已审核课程详情 -->
    <!-- <div v-if="detialInfo"> -->
        <el-button @click="gotoPrevious()">
        返回
        </el-button>
        <!-- {{ detialInfo.classes.classname }} 
        - -->
        {{ classid }}
    <!-- </div> -->
    <div class="page-container">
      <div class="content">
        <div class="sidebar">
          <div class="menu-item" @click="selectMenuItem('classinfo')" :class="{ 'selected': selectedMenu === 'classinfo' }">
            <el-icon name="el-icon-message"></el-icon>
            <span class="text">课程信息</span>
          </div>
          <div class="menu-item" @click="selectMenuItem('classresource')"  :class="{ 'selected': selectedMenu === 'classresource' }">
            <el-icon name="el-icon-edit-outline"></el-icon>
            <span class="text">课程资料</span>
          </div>
          <div class="menu-item" @click="selectMenuItem('publishexam')" :class="{ 'selected': selectedMenu === 'publishexam' }">
            <el-icon name="el-icon-folder"></el-icon>
            <span class="text">发布试题</span>
          </div>
          <div class="menu-item" @click="selectMenuItem('markpaper'); getExamLists()" :class="{ 'selected': selectedMenu === 'markpaper' }">
            <el-icon name="el-icon-document"></el-icon>
            <span class="text">批改试卷</span>
          </div>
          <div class="menu-item" @click="selectMenuItem('viewgrade'); getExamLists()" :class="{ 'selected': selectedMenu === 'viewgrade' }">
            <el-icon name="el-icon-document"></el-icon>
            <span class="text">查看成绩</span>
          </div>
          <div class="menu-item" @click="selectMenuItem('publishannounce'); getExamLists()" :class="{ 'selected': selectedMenu === 'publishannounce' }">
            <el-icon name="el-icon-document"></el-icon>
            <span class="text">发布公告</span>
          </div>
        </div>
        <div class="main">
          <!-- 根据选择的菜单显示不同的内容 -->
          <div v-if="selectedMenuItem === 'classinfo'">
            <h2>课程信息</h2>
            <el-form>
                <el-form-item>
                    <p v-if="detail">
                        课程名称：{{detail.classname}}
                    </p>
                </el-form-item>
                <el-form-item>
                    <p v-if="detail">
                        课程ID：{{detail.classid}}
                    </p>
                </el-form-item>
                <el-form-item>
                    <p v-if="detail">
                        课程介绍:{{detail.introduction}}
                    </p>
                </el-form-item>
                <el-form-item>
                    <p v-if = "detail&&detail.starttime">
                        课程时间：{{ detail.starttime }} ~ {{ detail ? detail.endtime : '' }}
                    </p>
                    <p v-if = "detail&&!detail.starttime">
                        课程时间：到{{ detail ? detail.endtime : '' }}截止
                    </p>
                </el-form-item>
                <el-form-item>
                    <div v-if="detail" class="curriculum-cover">
                        课程封面：
                        <img :src="detail.cover">
                    </div>
                </el-form-item>
            </el-form>
          </div>
          <div v-if="selectedMenuItem === 'classresource'">
            <h2>课程资料</h2>
            <!-- 课程资料的内容 -->
          </div>
          <div v-if="selectedMenuItem === 'publishexam'">
            <h2>发布试题</h2>
            <!-- 发布试题界面的内容 -->
          </div>
          <div v-if="selectedMenuItem === 'markpaper'">
            <h2>批改试卷</h2>
            <!-- 批改试卷界面的内容 -->
          </div>
          <div v-if="selectedMenuItem === 'viewgrade'">
            <h2>查看成绩</h2>
            <!-- 查看成绩界面的内容 -->
          </div>
          <div v-if="selectedMenuItem === 'publishannounce'">
            <h2>发布公告</h2>
            <!-- 发布公告界面的内容 -->
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

</style>