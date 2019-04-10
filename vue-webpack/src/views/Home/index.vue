<template>
  <div>
    <div>{{this.user.username}}</div>
    <mt-button type="primary" @click="submit">提交vuex</mt-button>
    <mt-button type="primary" @click="onPickerHandler">date-picker</mt-button>
    <date-picker v-model="picker" :isPickershow="isPickershow" @onPickerHandler="isPickershow=!isPickershow" />
    {{picker}}
    <dialog-drag @onDragHandler="onDragHandler" />
    <swiper :autoplay="true" :dots="true" :autoplayInterval="3000" :data="list"></swiper>
    <loading :isLoading='isLoading'></loading>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations, mapActions } from 'vuex';
import DatePicker from 'components/date-picker';
import DialogDrag from 'components/dialog-drag';
import Swiper from 'components/swiper';
import Loading from 'components/loading';
export default {
	data () {
		return {
			isLoading: false,
			list: [require('./img/001.jpg'), require('./img/002.jpg'), require('./img/003.jpg')],
			isPickershow: false,
			picker: []
		};
	},
	components: {
		DatePicker,
		DialogDrag,
		Swiper,
		Loading
	},
	created () {
		setTimeout(() => {
			this.isLoading = true;
		}, 3000);
		setTimeout(() => {
			this.isLoading = false;
		}, 6000);
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
		onDragHandler () {
			console.log('onDragHandler');
		},
		onPickerHandler () {
			this.isPickershow = !this.isPickershow;
		}
	},
};
</script>

<style lang="scss">
</style>
