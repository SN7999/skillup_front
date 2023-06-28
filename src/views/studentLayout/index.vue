<template>
    <div class="common-layout">
      <el-container>
        <el-header>
            <el-menu
            @select="handleSelect"
            :default-active="$route.path"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#fff"
            text-color="#000"
            active-text-color="#4095e5"
            router  
            >
                <el-image style="height:58px" :src="getImageUrl()"/>
                <el-menu-item index="/student/curriculum">课程</el-menu-item>
                <el-menu-item index="/student/exam">考试</el-menu-item>
                <el-menu-item index="/student/training">在线培训</el-menu-item>
                <el-menu-item index="/student/score">成绩查询</el-menu-item>
                <div class="flex-grow" />
                <el-menu-item index="/student/detail">个人中心</el-menu-item>
                <el-avatar :size="55" :src="getHeadImage()" />
            </el-menu>
        </el-header>
        <el-main>
            <!-- 二级路由入口 -->
            <RouterView/>
        </el-main>
      </el-container>
    </div>
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
        flex-grow: 2;
    }
  </style>
  