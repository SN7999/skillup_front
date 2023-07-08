<script setup>
import { onMounted, ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { getQuestionsAPI, postAnswersAPI } from '@/apis/studentExamAPI';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const examid = route.params.id;
const answers = ref({}); //答案数组
const post = ref([]); //答案数组
const questions = ref([]); //存储后台得到的考试题目内容
const indicatorStatus = reactive([]);
//指示灯
const changeAnswer = (questionId) => {
  if (answers.value[questionId]) {
    indicatorStatus[questionId] = true; // 将对应指示灯状态设置为true（绿色）
  } else {
    indicatorStatus[questionId] = false; // 将对应指示灯状态设置为false（灰色）
  }
};

// 获取试题
const getQuestions = async examid => {
	const result = await getQuestionsAPI(examid);
	questions.value = result.data.data;
	// console.log('questions为'+questions.value);
};

onMounted(() => {
	getQuestions(examid);
});
// 提交答案
const submitForm = async () => {
	for (const question of questions.value) {
		const answer = {questionid:question.questionid,studentanswer:answers.value[question.questionid]};
		post.value.push(answer);
		console.log(answer);
	}
	console.log(post.value);
	// const convertedArr = Object.entries(answers.value).map(([key, value]) => ({ [key]: value }));
	
	// console.log(convertedArr); 
	const result = await postAnswersAPI(post.value, examid);
	// for (const question of questions.value) {
	// 	const answer = answers.value[question.questionid];
	// 	console.log(`题目ID：${question.questionid}，答案：${answer}`);
	// }
	ElMessage.success(result.data.msg);
};
const drawerVisible = ref(false);

const showDrawer = () => {
	drawerVisible.value = true;
	console
};

const hideDrawer = () => {
	drawerVisible.value = false;
};
//控制目录中每道题显示的字数
const truncateText = (value) => {
  if (value.length > 5) {
    return value.substring(0, 5) + '...';
  } else {
    return value;
  }
};
</script>

<template>
	<div class="container">
		<!-- 题目显示区域 -->
		<div v-for="(question, index) in questions" :key="question.questionid">
			<div :id="'question-' + (index + 1)">第{{ index + 1 }}题：{{ question.question }}({{ question.score }}分)</div>
			<br />
			<!-- 选择题显示 -->
			<template v-if="question.type == '选择题'">
				<el-radio-group v-model="answers[question.questionid]">
					<el-radio label="A" size="large" @change="changeAnswer(question.questionid)">{{ question.optionA }}</el-radio>
					<el-radio label="B" size="large" @change="changeAnswer(question.questionid)">{{ question.optionB }}</el-radio>
					<el-radio label="C" size="large" @change="changeAnswer(question.questionid)">{{ question.optionC }}</el-radio>
					<el-radio label="D" size="large" @change="changeAnswer(question.questionid)">{{ question.optionD }}</el-radio>
				</el-radio-group>
				<div style="margin: 20px 0" />
				<div style="margin: 20px 0" />
			</template>
			<!-- 简答题显示 -->
			<template v-if="question.type == '主观题'">
				<el-input type="textarea" v-model="answers[question.questionid]" @input="changeAnswer(question.questionid)"></el-input>
			</template>
		</div>
		<div style="margin: 20px 0" />
		<div style="margin: 20px 0" />
		<!-- 提交按钮 -->
		<div style="text-align: center;"><el-button type="primary" @click="submitForm">提交</el-button></div>

		<div class="handle" @mouseenter="showDrawer">
			<span class="handle-icon">目录</span>
		</div>
		<el-drawer
			v-model="drawerVisible"
			title="目录"
			direction="ltr"
			@mouseleave="hideDrawer"
			style="height: 100%;"
		>
			<div v-for="(question, index) in questions" :key="question.questionid">
				<span class="indicator" :class="{ active: indicatorStatus[question.questionid] }"></span>
			    <a :href="'#question-' + (index + 1)">
					第{{ index + 1 }}题：({{question.type}}){{ truncateText(question.question) }}
				</a>
			</div>
		</el-drawer>
	
	</div>
</template>

<style scoped lang="scss">
	.indicator {
	  display: inline-block;
	  width: 10px;
	  height: 10px;
	  background-color: gray;
	  border-radius: 50%;
	  margin-right: 5px;
	}
	
	.indicator.active {
	  background-color: green;
	}
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

.handle-icon {
	position: absolute;
	top: 50%;
	left: 2px;
	background-color: #e2e2e2;
	transform: translateY(-50%);
	transition: height ease-out 0.3s;
}
a{
	text-decoration: none;
	color: inherit;
}
a:hover {
	color: #4095e5;
}
</style>
