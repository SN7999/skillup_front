<script setup>
    import { getCurriculumAPI } from '@/apis/studentAPI'
    import { onMounted, ref } from 'vue'
    const curriculumList = ref([])
    const getCurriculumList = async () => {
        const res = await getCurriculumAPI()
        curriculumList.value = res.result
    }
    onMounted(()=>{
        getCurriculumList()
    })
</script>


<template>
    <div>
        我是学生课程界面
        <RouterView/>
    </div>
    <!-- 课程列表 -->
    <div class='curriculum-list' >
        <div  class="curriculum-item" style='background:#f6f6f6;width:32%' v-for="(curriculum,index) in curriculumList" :key="index">
        <img :src="curriculum.url">
        <div style='font-weight: 400;
        font-size:20px;margin-left:10px;
        margin-top:10px;
        margin-bottom:10px'>{{curriculum.title}}</div>
        </div>
    </div>
    <!--课程列表 end-->
</template>

<style lang = "scss">
    .curriculum-item{
    text-align: center;
    float: left;
    margin-top:20px;
    margin-bottom:20px;

    img{
      width: 100%;
      height: 150px;
    }
    }
    .curriculum-list{
        flex-wrap: wrap;
        justify-content: space-between;
        margin-left:20px;
        margin-right:20px;
        display: flex;
    }
</style>