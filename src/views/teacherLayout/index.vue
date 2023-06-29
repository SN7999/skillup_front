<template>
    <el-container>
      <el-header>
        <el-menu
        :ellipsis="false"
        @select="handleSelect"
        :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#fff"
        ext-color="#000"
        active-text-color="#4095e5"
        router  
        >
          <el-image style="height:45px;margin: auto;" :src="getImageUrl()"/>
          <el-menu-item index="/teacher">我的课程信息</el-menu-item>
          <el-menu-item index="/teacher/student">查询学生信息</el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="/teacher/detail">个人中心</el-menu-item>
          <el-avatar :size="55" :src="getHeadImage()" />
        </el-menu>
      </el-header>
      <el-main>
      <!-- 二级路由入口 -->
      <RouterView/>
      </el-main>
    </el-container>
  </template>

  <script setup>
    const getImageUrl = () => {
        return new URL(`@/assets/images/logo.png`,import.meta.url).href
    }
    const getHeadImage = () => {
        return new URL(`@/assets/images/logo.png`,import.meta.url).href
    }
  </script>
  
  <style>
    .flex-grow {
        flex-grow: 1;
    }
  </style>