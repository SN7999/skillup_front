<script setup>
    import { onMounted, ref } from 'vue'
    import { getCurriculumDetailAPI } from '@/apis/studentAPI'
    import { useRoute } from 'vue-router'
    import { useRouter } from 'vue-router';
    const route = useRoute()
    const curriculumName = route.params.id
    // const logMessage = () => {
    //     console.log(curriculumName)
    // }
    const detialList = ref([])
    const getDetailList = async (curriculumName) => {
        const  result  = await getCurriculumDetailAPI(curriculumName)
        detialList.value = result.data
    }
    onMounted(()=>{
       //getDetailList(curriculumName)
        console.log(detialList.value)
    })
    const router = useRouter()
    const gotoPrevious = () => {
        router.push('/student');
    }
</script>

<template>
    <div>
        <el-button type="primary" @click="gotoPrevious()">返回</el-button>
        {{ curriculumName }}
        <div>

        </div>
    </div>
</template>

<!-- <template>
    <div class="container">
      <div class="left-panel">
        <button @click="changeContent('Content 1')">Button 1</button>
        <button @click="changeContent('Content 2')">Button 2</button>
      </div>
      <div class="right-panel">
        <h2>{{ selectedContent }}</h2>
        < 根据按钮点击切换展示内容 -->
        <!-- <div v-if="selectedContent === 'Content 1'">
          <p>这是内容1</p>
        </div>
        <div v-else-if="selectedContent === 'Content 2'">
          <p>这是内容2</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // 使用ref创建响应式变量
  const selectedContent = ref('');
  
  // 初始值为空，根据按钮点击更新选择的内容
  function changeContent(content) {
    selectedContent.value = content;
  }
  </script>
  
  <style>
  .container {
    display: flex;
  }
  
  .left-panel {
    flex: 1;
    padding: 20px;
    background-color: #f2f2f2;
  }
  
  .right-panel {
    flex: 1;
    padding: 20px;
    background-color: #e8e8e8;
  }
  </style> --> 