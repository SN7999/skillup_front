<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const gotoPrevious = () => {
        router.push('/teacher');
    }
</script>


<template>
    <div>
        我是已审核课程详情
    </div>
    <div>
        <el-button style="size: large;" type="primary" @click="gotoPrevious()">
            返回
        </el-button>
    </div>
</template>