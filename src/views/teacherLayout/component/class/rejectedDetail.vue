<template>
<div></div>
</template>
<!-- <script setup>
    import { useRouter } from 'vue-router';
    import { useRoute } from 'vue-router'
    import { getClassDetailAPI} from '@/apis/teacherAPI'
    import { onMounted, ref } from 'vue'
    const router = useRouter();
    const gotoPrevious = () => {
        router.push('/teacher');
    }

    const route = useRoute()
    //const classid = route.params.id

    const detail = ref(null)
    const isEditing = ref(false) // 标记是否处于编辑状态

    // 使用 ref 存储可编辑的字段
    const classname = ref('')
    const classid = ref('')
    const introduction = ref('')
    const starttime = ref('')
    const endtime = ref('')
    const cover = ref('')

    const getClassDetail = async () => {
        const result = await getClassDetailAPI()
        detail.value = result.data.data
        // 初始值赋值
        classname.value = detail.value.classname
        classid.value = detail.value.classid
        introduction.value = detail.value.introduction
        starttime.value = detail.value.starttime
        endtime.value = detail.value.endtime
        cover.value = detail.value.cover
    }

    const updateClassDetail =  () => {
        // const result = await updateClassDetailAPI(classid.value, {
        //     classname: classname.value,
        //     classid: classid.value,
        //     introduction: introduction.value,
        //     starttime: starttime.value,
        //     endtime: endtime.value,
        //     cover: cover.value
        // })
        // if (result.success) {
        //     isEditing.value = false
        //     getClassDetail()
        // }
    }

    onMounted(() => {
        getClassDetail()
    })

</script>


<template>
    <div>
        我是已驳回课程详情
    </div>
    <div>
        <el-button style="size: large;" type="primary" @click="gotoPrevious()">
            返回
        </el-button>
    </div>
    <el-form>
        <el-form-item>
            <el-input v-model="classname" v-if="isEditing"></el-input>
            <p v-else>
                课程名称：{{detail.classname}}
            </p>
        </el-form-item>
        <el-form-item>
            <el-input v-model="classid" v-if="isEditing"></el-input>
            <p v-else>
                课程ID：{{detail.classid}}
            </p>
        </el-form-item>
        <el-form-item>
            <el-input v-model="introduction" v-if="isEditing"></el-input>
            <p v-else>
                课程介绍:{{detail.introduction}}
            </p>
        </el-form-item>
        <el-form-item>
            <template v-if="isEditing">
                <el-date-picker
                    v-model="starttime"
                    type="datetime">
                </el-date-picker>
                 ~
                <el-date-picker
                    v-model="endtime"
                    type="datetime">
                </el-date-picker>
            </template>
            <template v-else>
                <p v-if="detail.starttime">
                    课程时间：{{ detail.starttime }} ~ {{ detail.endtime }}
                </p>
                <p v-else>
                    课程时间：到{{ detail.endtime }}截止
                </p>
            </template>
        </el-form-item>
        <el-form-item>
            <el-input v-model="cover" v-if="isEditing"></el-input>
            <div v-else class="curriculum-cover">
                课程封面：
                <img :src="detail.cover">
            </div>
        </el-form-item>
    </el-form>
     编辑/保存按钮 -->
    <!-- <div>
        <el-button v-if="isEditing" type="primary" @click="updateClassDetail()">保存</el-button>
        <el-button v-else type="primary" @click="isEditing = true">编辑</el-button>
    </div>
</template> -->

<!-- <style lang="scss" scoped>
.curriculum-cover{
    text-align: left;
    float: left;
    margin-top:20px;
    margin-bottom:20px;

    img{
        width:100%;
height: 200px;
}
}

</style>  -->