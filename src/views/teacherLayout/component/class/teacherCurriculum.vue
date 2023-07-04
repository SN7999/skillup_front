<template>
    <div>
        <nav class="navbar">
            <ul>
            <li :class="{ active: activeTab === 'myCourses' }" @click="changeTab('myCourses')">我的课程</li>
            <li :class="{ active: activeTab === 'underReview' }" @click="changeTab('underReview')">审核中</li>
            <li :class="{ active: activeTab === 'reviewFailed' }" @click="changeTab('reviewFailed')">审核未通过</li>
            <el-button type="primary" size="large" style="margin-left: 100px;" @click="exportClasses">导出所有课程信息</el-button>
            <el-button type="primary" size="large" @click="publishClass">＋发布课程</el-button>
            </ul>
        </nav>
        <div class="content">
            <div v-if="activeTab === 'myCourses'" class="tab-content">
                <h2>我的课程</h2>
                <!-- 我的课程内容 -->
            </div>
            <div v-if="activeTab === 'underReview'" class="tab-content">
                <h2>审核中</h2>
                <!-- 审核中内容 -->
            </div>
            <div v-if="activeTab === 'reviewFailed'" class="tab-content">
                <h2>审核未通过</h2>
                <!-- 审核未通过内容 -->
            </div>
        </div>
</div>
  </template>
  
  <script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const activeTab = ref('myCourses');
  
    function changeTab(tab) {
      activeTab.value = tab;
    }

    const exportClasses = () =>{
        //调用导出所有课程方法，直接下载
    }

    const router = useRouter();
    //跳转至发布课程界面
    const publishClass = () =>{
        router.push('/teacher/publish'); 
    }
  </script>
  
  <style>
   .navbar {
        background-color: white;
    }


    ul {
        display: flex;
        justify-content: space-evenly; /* 调整项目的水平间距 */
        padding: 10px 0;  /* 减小上下间距 */
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
        content: "";
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

  </style>
  