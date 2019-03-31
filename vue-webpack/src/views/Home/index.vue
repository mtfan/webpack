<template>
  <div>
    <div>{{this.user.username}}</div>
    <mt-button type="primary" @click="submit">提交vuex</mt-button>
    <mt-button type="primary" @click="onPickerHandler">picker</mt-button>
    <date-picker v-model="picker" :isPickershow="isPickershow" @onPickerHandler="isPickershow=!isPickershow" />
    {{picker}}
    <dialog-drag @onDragHandler="onDragHandler" />
  </div>

</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations, mapActions } from 'vuex';
import DatePicker from 'components/date-picker';
import DialogDrag from 'components/dialog-drag';
export default {
	data () {
		return {
			isPickershow: false,
			picker: []
		};
	},
	components: {
		DatePicker,
		DialogDrag,
	},
	computed: {
		...mapGetters(['user']),
	},
	methods: {
		...mapMutations({
			homeMutation: 'USER',
		}),
		...mapActions(['userAction', 'getUserInfo'],
		),
		submit () {
			this.homeMutation({ username: 'tom' });
			this.$Toast.open({
				toastTip: '全局组件测试'
			});
			setTimeout(() => {
				this.getUserInfo({
					username: 'hulei',
				});
			}, 2000);
		},
		onPickerHandler () {
			this.isPickershow = !this.isPickershow;
		},
		onDragHandler () {
			console.log('onDragHandler');
		}
	},
};
</script>

<style lang="scss">
</style>
