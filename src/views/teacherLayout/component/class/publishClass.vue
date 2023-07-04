<script setup>
import { ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElDatePicker, ElTimePicker, ElUpload, ElButton, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

const gotoPrevious = () => {
        router.push('/teacher');
    }

const form = ref({
  courseName: '',
  courseDescription: '',
  startDate: null,
  startTime: '',
  endDate: null,
  endTime: '',
  courseCover: '',
});

const rules = ref({
  courseName: [
    { required: true, message: '请输入课程名称', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/, message: '课程名称只能包含数字、字母和中文', trigger: 'blur' },
  ],
  courseDescription: [
    { required: true, message: '请输入课程介绍', trigger: 'blur' },
  ],
  startDate: [
    { required: true, type: 'date', message: '请选择开课日期', trigger: 'change' },
  ],
  startTime: [
    { required: true, message: '请选择开课时间', trigger: 'change' },
  ],
  endDate: [
    { required: true, type: 'date', message: '请选择结课日期', trigger: 'change' },
  ],
  endTime: [
    { required: true, message: '请选择结课时间', trigger: 'change' },
  ],
  courseCover: [
    { required: true, message: '请上传课程封面', trigger: 'change' },
  ],
});

// 处理图片上传成功事件
function handleUploadSuccess(response, file) {
  form.value.courseCover = URL.createObjectURL(file.raw);
}

// 处理删除图片按钮点击事件
function handleBeforeRemove(file, fileList) {
form.value.courseCover = '';
return true; // 返回true允许删除文件
}

// 提交申请事件处理
async function submitForm() {
// const valid = await $refs.form.validate();
// if (!valid) {
// return;
//}
// 提示提交成功
ElMessageBox.alert('申请提交成功', '提示', {
confirmButtonText: '确定',
callback: () => {
// 提交成功后的操作
},
});
}
</script>

<template>
    <div>
        <el-button style="size: large;" type="primary" @click="gotoPrevious()">
            返回
        </el-button>
    </div>
    <div class="container">
      <h1>提交申请</h1>
      <div class="form-wrapper">
        <el-form :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="课程名称" prop="courseName" required>
            <el-input v-model="form.courseName"></el-input>
          </el-form-item>
  
          <el-form-item label="课程介绍" prop="courseDescription" required>
            <el-input type="textarea" v-model="form.courseDescription"></el-input>
          </el-form-item>
  
          <el-row>
            <el-col :span="12">
              <el-form-item label="开课日期" prop="startDate" required>
                <el-date-picker v-model="form.startDate" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开课时间" prop="startTime" required>
                <el-time-picker v-model="form.startTime" placeholder="选择时间"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
  
          <el-row>
            <el-col :span="12">
              <el-form-item label="结课日期" prop="endDate" required>
                <el-date-picker v-model="form.endDate" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结课时间" prop="endTime" required>
                <el-time-picker v-model="form.endTime" placeholder="选择时间"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
  
          <el-form-item label="课程封面" prop="courseCover" required>
            <el-upload action="/upload" :show-file-list="false" :on-success="handleUploadSuccess" :before-remove="handleBeforeRemove">
              <el-button>点击上传</el-button>
              <div v-if="form.courseCover">
                <img :src="form.courseCover" alt="course_cover" style="max-width: 200px; margin-top: 10px;" />
                <el-button class="delete-button" size="mini" icon="el-icon-delete" circle></el-button>
              </div>
            </el-upload>
          </el-form-item>
  
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交申请</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </template>
  
  
  <style scoped>
  /* .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  } */

  .container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
    }
  
  .demo-ruleForm {
    width: 80%;
    margin: 0 auto;
}

.delete-button {
position: absolute;
top: 5px;
right: 5px;
}

.el-time-picker__popper .el-picker-panel {
  /* 设置合适的最大高度以避免内容超出容器 */
  max-height: 200px;
  /* 修改弹出框的定位方式为底部对齐 */
  position: absolute;
  bottom: 0;
}
</style>