<template>
  <div class="pull-content" :style="{border: `1px solid ${borderColor}`}">
    <img :src="loginBg" alt="">
    <div v-if="isLoading" class="pull-login" :style="{border: `1px solid ${loginBorderColor}`,borderTop: '1px solid transparent',borderLeft: '1px solid transparent',borderRight: '1px solid transparent'}"></div>
  </div>

</template>

<script type="text/ecmascript-6">
export default {
	props: {
		isLoading: {
			type: Boolean,
		},
		loginBg: {
			type: String,
			default: require('static/images/logo.png')
		},
		borderColor: {
			type: String,
			default: 'red'
		},
		loginBorderColor: {
			type: String,
			default: 'red'
		}
	},
	data () {
		return {

		};
	},
	methods: {

	},
};
</script>

<style lang="scss" scope>
.pull-content {
	width: 58px;
	height: 58px;
	border-radius: 50%;
	position: relative;
}
.pull-login {
	position: absolute;
	top: 0;
	left: 0;
	width: 58px;
	height: 58px;
	border-radius: 50%;
	animation: login-animation 1s linear infinite;
}
img {
	position: absolute;
	top: 0;
	left: 0;
	width: 58px;
	height: 58px;
}
@keyframes login-animation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
