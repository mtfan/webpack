<template>
  <div>
    <div>{{this.user.username}}</div>
    <mt-button type="primary" @click="submit">提交vuex</mt-button>
    <date-picker />
  </div>

</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations, mapActions } from 'vuex';
import DatePicker from 'components/date-picker';
export default {
	components: {
		DatePicker
	},
	computed: {
		...mapGetters(
			[
				'user',
			],
		),
	},
	methods: {
		...mapMutations(
			{
				homeMutation:
          'USER',
			},
		),
		...mapActions(
			[
				'userAction',
				'getUserInfo',
			],
		),
		submit () {
			this.homeMutation(
				{
					username:
            'tom',
				},
			);
			this.$Toast.open(
				{
					toastTip:
            '全局组件测试',
				},
			);
			setTimeout(
				() => {
					this.getUserInfo(
						{
							username:
                'hulei',
						},
					);
				},
				2000,
			);
		},
	},
};
</script>

<style lang="scss">
</style>
