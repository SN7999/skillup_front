<script setup>
    import { useRouter } from 'vue-router';
    import { useRoute } from 'vue-router'
    import { getClassDetailAPI } from '@/apis/teacherAPI'
    import { onMounted, ref } from 'vue'
    const router = useRouter();
    const gotoPrevious = () => {
        router.push('/teacher');
    }

    const route = useRoute()
    const classid = route.params.id

    const detail = ref(null)
    const getClassDetail = async (classid) => {
        const  result  = await getClassDetailAPI(classid)
        detail.value = result.data.data
    }

    // const getClassDetail = async () => {
    //     const  result  = await getClassDetailAPI()
    //     detail.value = result.data.data
    // }

    onMounted(()=>{
        //最终使用
        getClassDetail(classid)
        //测试使用
        //getClassDetail()
    })

</script>


<template>
    <!-- <div>
        我是审核中课程详情
    </div> -->
    <div>
        <el-button style="size: large;" type="primary" @click="gotoPrevious()">
            返回
        </el-button>
    </div>
    <el-form>
        <el-form-item>
            <p v-if="detail">
                课程名称：{{detail.classname}}
            </p>
        </el-form-item>
        <el-form-item>
            <p v-if="detail">
                课程ID：{{detail.classid}}
            </p>
        </el-form-item>
        <el-form-item>
            <p v-if="detail">
                课程介绍:{{detail.introduction}}
            </p>
        </el-form-item>
        <el-form-item>
            <p v-if = "detail&&detail.starttime">
                课程时间：{{ detail.starttime }} ~ {{ detail ? detail.endtime : '' }}
            </p>
            <p v-if = "detail&&!detail.starttime">
                课程时间：到{{ detail ? detail.endtime : '' }}截止
            </p>
        </el-form-item>
        <el-form-item>
            <div v-if="detail" class="curriculum-cover">
                课程封面：
                <img :src="detail.cover">
            </div>
        </el-form-item>
    </el-form>
</template>

<style lang="scss" scoped>
.curriculum-cover{
    text-align: left;
    float: left;
    margin-top:20px;
    margin-bottom:20px;

    img{
        width: 100%;
        height: 200px;
    }
}


</style>