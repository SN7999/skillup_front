<script setup>
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { getQuestionsAPI, postAnswersAPI } from '@/apis/studentExamAPI';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const examid = route.params.id;
const answers = ref({});//答案数组
const questions = ref([]);//存储后台得到的考试题目内容
// 获取试题
const getQuestions = async (examid) => {
	const result = await getQuestionsAPI(examid);
	questions.value = result.data.data;
	// console.log('questions为'+questions.value);
};

onMounted(() => {
	getQuestions(examid);
});
// 提交答案
const submitForm = () => {
	postAnswersAPI(answers.value,examid);
	console.log(answers.value);
	for (const question of questions.value) {
		const answer = answers.value[question.questionid];
	    console.log(`题目ID：${question.questionid}，答案：${answer}`);
	  }
	ElMessage.success('表单提交成功！');
};
const drawerVisible = ref(false);

const showDrawer = () => {
  drawerVisible.value = true;
}

const hideDrawer = () => {
  drawerVisible.value = false;
}
</script>

<template>
<div class="container">
	<!-- 题目显示区域 -->
	<div v-for="(question, index) in questions" :key="question.questionid">
		<div>第{{ index+1 }}题：{{ question.question }}({{ question.score }}分)</div><br>
			<!-- 选择题显示 -->
			<template v-if="question.type=='选择题'">
				<el-radio-group v-model="answers[question.questionid]">
					  <el-radio label="A" size="large">{{question.optionA}}</el-radio>
					  <el-radio label="B" size="large">{{question.optionB}}</el-radio>
					  <el-radio label="C" size="large">{{question.optionC}}</el-radio>
					  <el-radio label="D" size="large">{{question.optionD}}</el-radio>
				</el-radio-group>
				<div style="margin: 20px 0" /><div style="margin: 20px 0" />
			</template>
			<!-- 简答题显示 -->
			<template v-if="question.type=='简答题'">
				<el-input type="textarea" v-model="answers[question.questionid]"></el-input>
			</template>
	</div>
	<div style="margin: 20px 0" /><div style="margin: 20px 0" />
	<!-- 提交按钮 -->
	<div style="text-align: center;"><el-button type="primary" @click="submitForm">提交</el-button></div>
	
    <div class="handle" @mouseenter="showDrawer">
      <span class="handle-icon">目录</span>
    </div>
    <el-drawer
		v-model="drawerVisible"
		title="抽屉内容"
		direction="left to right"
		@mouseleave="hideDrawer"
    >
      <!-- 抽屉内容 -->
      <p>这是一个抽屉的内容。</p>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
	.container {
	  position: relative;
	}
	
	.handle {
	  position: fixed;
	  top: 50%;
	  left: 0;
	  transform: translateY(-50%);
	  width: 20px;
	  height: 60px;
	  background-color: #e2e2e2;
	  cursor: pointer;
	  transition: width ease-out 0.3s;
	}
	
	.handle:hover {
	  width: 80px;
	}
	
	.handle-icon {
	  position: absolute;
	  top: 50%;
	  left: 2px;
	  background-color: #e2e2e2;
	  transform: translateY(-50%);
	  transition: height ease-out 0.3s;
	}
	
	.el-drawer {
		height:100%;
	  transition: opacity 0.3s;
	}
</style>
