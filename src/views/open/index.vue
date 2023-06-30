<script setup>
	import { useRouter } from 'vue-router'
	const router = useRouter()
	const goforLogin = ()=>{
		router.replace({ path: '/login' })
	}
</script>

<template>
    <div id="building">
    	<div id="mask">
			<el-button size="large" class="subBtn" @click="goforLogin">测试用按钮跳转到登录界面</el-button>
		</div>
	</div>
</template>

<style scoped>
	#building{
		/* background: url("@/assets/images/backgroud1.jpg"); */
		width: 100%;
		height: 100%;
		position: fixed;
		background-size: 100% 100%;
	}
	/* 蒙版 */
	#mask{
		background-color: rgba(0, 0, 0, 0.6);
		width: 100%;
		height: 100%;
		position: fixed;
		background-size: 100% 100%;
	}
</style>