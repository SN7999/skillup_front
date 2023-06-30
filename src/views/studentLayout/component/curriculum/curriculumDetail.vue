<script setup>
    import { useRoute } from 'vue-router'
    const route = useRoute()
    const curriculumName = route.params.id
    const logMessage = () => {
        console.log(curriculumName)
    }
</script>


<template>
    <div>
        我是学生课程详情
        <el-button @click="logMessage"></el-button>
    </div>
</template>