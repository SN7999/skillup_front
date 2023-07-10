<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import { useRouter } from 'vue-router';
import { useUserStoreA } from '@/stores/user';

const router = useRouter();
const userStore = useUserStoreA();
// 表单对象-登录
const formLog = ref({
	name: 'dk',
	password: 'dk'
});
// 规则对象-登录
const rulesLog = {
	name: [
		{
			required: true,
			message: '邮箱不能为空',
			trigger: 'blur'
		}
	],
	password: [
		{
			required: true,
			message: '密码不能为空',
			trigger: 'blur'
		}
	]
};

const formRefLog = ref(null);
const doLogin = () => {
	const { name, password } = formLog.value;
	console.log( name+'-'+password)
	// 调用实例方法
	formRefLog.value.validate(async valid => {
		console.log(valid + '登录表单合法');
		if (valid) {
			await userStore.getUserInfo({ name, password });
		}
	});
};
</script>

<template>
	<header class="login-header">
		<div class="container m-top-20">
			<h1 class="logo"><RouterLink to="/">Skillup</RouterLink></h1>
		</div>
	</header>

	<section class="login-section">
		<div class="wrapper">
			<nav><a>管理员登录</a></nav>
			<div class="account-box">
				<div class="form">
					<!-- ————————————————————登录模块———————————————— -->
					<el-form ref="formRefLog" :model="formLog" :rules="rulesLog" label-position="right" label-width="60px" status-icon>
						<el-form-item prop="name" label="账号"><el-input type="text" v-model="formLog.name" /></el-form-item>

						<el-form-item prop="password" label="密码"><el-input type="password" v-model="formLog.password" /></el-form-item>
						<br />
						<el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
					</el-form>
				</div>
			</div>
		</div>
	</section>

	<footer class="login-footer">
		<div class="container">
			<p>技术支持：Skillup小组</p>
			<p>联系我们：1234567895@qq.com</p>
		</div>
	</footer>
</template>

<style scoped lang="scss">
.subBtn {
  background: #4095e5;
  width: 100%;
  color: #fff;
}
.account-box {
	.form {
		padding: 0 10px 10px 10px;
	}
	.formBox {
		.leftBox {
			width: 60%;
			margin-left: 0px;
			float: left;
		}
		.rightBox {
			width: 35%;
			margin-right: 0px;
			float: right;
		}
	}
}

.login-section {
	background: url('@/assets/images/background3.jpg') no-repeat center 18px / 100% 100%;
	/* background-repeat: repeat;  */
	height: 630px;
	position: relative;

	.wrapper {
		width: 380px;
		background: #fff;
		position: absolute;
		left: 50%;
		top: 25%;
		transform: translate3d(100px, 0, 0);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

		nav {
			font-size: 14px;
			height: 55px;
			margin-bottom: 20px;
			border-bottom: 1px solid #f5f5f5;
			display: flex;
			padding: 0 40px;
			text-align: right;
			align-items: center;

			a {
				flex: 1;
				line-height: 1;
				display: inline-block;
				font-size: 18px;
				position: relative;
				text-align: center;
			}
		}
	}
}

.login-footer {
	padding: 0px 0 0px;
	background: #fff;

	p {
		text-align: center;
		color: #999;
		padding-top: 10px;
	}
}

.login-header {
	background: #fff;
	border-bottom: 1px solid #e4e4e4;

	.container {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.logo {
		width: 100px;
		height: 60px;
		margin-top: 0%;
		margin-bottom: 10px;
		a {
			margin-bottom: 0%;
			display: block;
			height: 60px;
			width: 100%;
			text-indent: -9999px;
			background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
		}
	}

	.sub {
		flex: 1;
		font-size: 24px;
		font-weight: normal;
		margin-bottom: 38px;
		margin-left: 20px;
		color: #666;
	}

	.entry {
		width: 120px;
		margin-bottom: 20px;
		font-size: 16px;

		i {
			font-size: 14px;
			color: #666;
			letter-spacing: -5px;
		}
	}
}
</style>
