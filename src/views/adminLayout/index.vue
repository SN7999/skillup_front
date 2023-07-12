<script setup>
//1.导入use打头的方法
import { useEndoutStore } from '@/stores/endout'
import { useLogoStore } from '@/stores/getlogo'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getNewAdminAPI } from '@/apis/adminAPI'
//2.执行方法得到store实例对象
const endoutStore = useEndoutStore()
const getLogoStore = useLogoStore()

const route = useRoute()

let activePath = () => {
  if (route.meta.active) {
    return route.meta.active
  }
  return route.path
}

const addDialogVisible = ref(false)
const addName = ref(null)
const addPwd = ref(null)

const addNewAdmin = () => {
  addDialogVisible.value = true
}

const submitAdd = async () => {
  if (!addName.value) {
    ElMessage.error('管理员名字不能为空')
    return
  }
  if (!addPwd.value) {
    ElMessage.error('管理员密码不能为空')
    return
  }
  const result = await getNewAdminAPI(addName.value, addPwd.value)
  if (result.data.code == 200) {
    ElMessage.success('管理员新增成功！')
  } else {
    ElMessage.error('管理员新增失败！')
  }
  addName.value = null
  addPwd.value = null
  addDialogVisible.value = false
}

onBeforeMount(() => {
  activePath()
})
</script>

<template>
  <el-container class="container">
    <el-header class="fixed-header">
      <el-menu :ellipsis="false" @select="handleSelect" :default-active="activePath()" class="el-menu-demo" mode="horizontal" background-color="#fff" ext-color="#000" active-text-color="#4095e5" router>
        <el-image style="height:45px;margin: auto;" :src="getLogoStore.logoUrl" />
        <el-menu-item index="/admin">课程管理</el-menu-item>
        <el-menu-item index="/admin/student">学生管理</el-menu-item>
        <el-menu-item index="/admin/teacher">教师管理</el-menu-item>
        <el-menu-item index="/admin/point">积分排行</el-menu-item>
        <div class="flex-grow" />
        <el-button class="adminButton" type="primary" @click="addNewAdmin">新增管理员</el-button>
        <el-button class="adminButton" type="primary" @click="endoutStore.endOut">退出</el-button>
      </el-menu>
    </el-header>
    <el-main class="main-content">
      <!-- 二级路由入口 -->
      <RouterView />
    </el-main>
  </el-container>
  <el-dialog v-model="addDialogVisible" title="新增管理员">
    <div>
      <el-input :rows="2" placeholder="请输入新增管理员名称" v-model="addName" style="margin-top: 20px;margin-bottom: 20px;"></el-input>
    </div>
    <div>
      <el-input :rows="2" placeholder="请输入新增管理员密码" v-model="addPwd" style="margin-top: 20px;margin-bottom: 20px;"></el-input>
    </div>
    <div class="dialog-footer">
      <el-button @click="rejectClassDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="submitAdd">提交</el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.adminButton {
  margin-left: 20px;
  margin-bottom: auto;
  margin-top: auto;
  // margin: auto;
}
.flex-grow {
  flex-grow: 1;
}

.container {
  min-height: 100vh;
  position: relative;
}

.fixed-header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
}

.main-content {
  margin-top: 40px; /* 根据 .fixed-header 的高度来调整 margin-top */
}
</style>
  