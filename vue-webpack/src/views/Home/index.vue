<template>
<div>
  <div>{{this.user.username}}</div>
  <mt-button type="primary" @click="submit">提交vuex</mt-button>
</div>

</template>

<script type="text/ecmascript-6">
let pre = "test pre-commit";
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
	computed: {
		...mapGetters(['user'])
	},
	methods: {
		...mapMutations({
			homeMutation: 'USER'
		}),
		...mapActions(['userAction', 'getUserInfo']),
		submit() {
			this.homeMutation({ username: "tom" });
			setTimeout(() => {
				this.getUserInfo({ username: 'hulei' });
			}, 2000);
		}
	}
};
</script>

<style lang="scss">
</style>
