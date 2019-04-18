<template>
  <div>
    <div>{{this.user.username}}</div>
    <mt-button type="primary" @click="submit">提交vuex</mt-button>
    <mt-button type="primary" @click="onPickerHandler">date-picker</mt-button>
    <date-picker v-model="picker" :isPickershow="isPickershow" @onPickerHandler="isPickershow=!isPickershow" />
    {{picker}}
    <dialog-drag @onDragHandler="onDragHandler" />
    <loading :isLoading='isLoading'></loading>
    <swiper :data="list" @swiperOnClickHandler="swiperOnClickHandler"></swiper>
    <swiper ref="swiper" @swiperOnChangeHandler="swiperOnChangeHandler" :loop="false" :autoplay="false" :dots="true" :autoplayInterval="3000" :data="list">
      <li v-for="(item,i) in list" :key="i" @click.stop.prevent="swiperOnClickHandler(item)">
        <img :src="item.imgUrl">
      </li>
    </swiper>
    <mt-button clsss="button" type="primary" :class="[currentIndex==index?'active':'']" v-for="(item,index) in list" :key="index" @click="tabOnClickHandler(index)">00000{{index}}</mt-button>
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
			isPickershow: false,
			picker: [],
			currentIndex: 0,
			list: [{ imgUrl: require('./img/001.jpg') }, { imgUrl: require('./img/002.jpg') }, { imgUrl: require('./img/003.jpg') }],
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
		},
		swiperOnClickHandler (item) {
			console.log(item);
		},
		swiperOnChangeHandler (i) {
			this.currentIndex = i;
		},
		tabOnClickHandler (i) {
			this.$refs.swiper.tabOnClickHandler(true, i);
		}
	},
};
</script>

<style lang="scss" scoped>
.active {
	color: aquamarine;
}
</style>
