<script setup>
//1.导入use打头的方法
import { useEndoutStore } from '@/stores/endout'
import { useLogoStore } from '@/stores/getlogo'
//2.执行方法得到store实例对象
const endoutStore = useEndoutStore()
const getLogoStore = useLogoStore()
</script>

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
        <el-image style="height:45px;margin: auto;" :src="getLogoStore.logoUrl"/>
        <el-menu-item index="/admin">课程管理</el-menu-item>
        <el-menu-item index="/admin/student">学生管理</el-menu-item>
        <el-menu-item index="/admin/teacher">教师管理</el-menu-item>
        <div class="flex-grow" />
        <el-button class="adminButton"  type="primary" @click="endoutStore.endOut">退出</el-button>
      </el-menu>
    </el-header>
    <el-main>
    <!-- 二级路由入口 -->
    <RouterView/>
    </el-main>
  </el-container>
</template>

<style>
  .adminButton{
      margin: auto;
  }
  .flex-grow {
      flex-grow: 1;
  }
</style>
  