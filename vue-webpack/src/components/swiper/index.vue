<template>
  <div class="hy-swiper">
    <ul ref="swiper" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" :style="{'width':clientWidth*list.length+'px','transform':'translate3d('+x+'px,0,0)'}">
      <slot>
        <li v-for="(item,i) in list" :key="i" @click.stop.prevent="swiperOnClickHandler(item)">
          <img :src="item.imgUrl">
        </li>
      </slot>
    </ul>
    <ol v-if="dots">
      <li v-for="(item,i) in data" :key="i" :class="[n-1==i?'active':'']"></li>
    </ol>
  </div>
</template>
<script>
export default {
	props: {
		data: {
			type: Array, // 数据
			required: true
		},
		autoplay: {
			type: Boolean, //自动轮播
			default: true
		},
		dots: {
			type: Boolean, //指示点
			default: true
		},
		autoplayInterval: {
			type: Number, //轮播的时间秒
			default: 3000
		},
		distance: {
			type: Number, // 不是全屏模式下，需要传入margin或者padding 左或者右的间距
			default: 0
		},
		loop: {
			type: Boolean, // 是否循环显示
			default: true
		}
	},
	data () {
		return {
			startX: 0,
			x: 0,
			n: 1,
			timer: null,
			list: this.data,
			autoplays: this.autoplay,
			clientWidth: document.documentElement.clientWidth,
		};
	},
	mounted () {
		if (this.distance > 0) {
			this.clientWidth = this.clientWidth - (this.distance * 2);
		}
		if (this.loop) {
			if (this.list.length > 1) {
				this.list = [this.data[this.data.length - 1], ...this.data, this.data[0]];
				this.x = -this.clientWidth;
			}
		}

		if (this.autoplays && this.list.length > 1) {
			this.auto();
			this.autoplays = false;
		}
		this.$nextTick(() => {
			Array.from(this.$refs.swiper.children).forEach(el => {
				el.style.width = `${this.clientWidth}px`;
			});
		});
	},
	methods: {
		touchstart (e) {
			clearInterval(this.timer);
			this.autoplays = true;
			this.$refs.swiper.style.transition = 'none';
			this.startX = e.targetTouches[0].pageX - this.x;
		},
		touchmove (e) {
			this.x = e.targetTouches[0].pageX - this.startX;
		},
		touchend () {
			if (this.list.length === 1) {
				this.x = 0;
				return;
			}
			if (this.loop) {
				this.n = Math.round(Math.abs(this.x) / this.clientWidth);
				this.$refs.swiper.style.transition = '.3s all ease';
				this.x = -(this.n * this.clientWidth);
				this.boundsHandler();
			} else {
				this.tabOnClickHandler();
			}

		},
		boundsHandler () {
			if (this.n >= this.list.length - 1) {
				setTimeout(() => {
					this.n = 1;
					this.$refs.swiper.style.transition = 'none';
					this.x = -this.clientWidth;
				}, 300);
			}

			if (this.n <= 0) {
				setTimeout(() => {
					this.n = this.list.length - 2;
					this.$refs.swiper.style.transition = 'none';
					this.x = -(this.n * this.clientWidth);
				}, 300);
			}
			if (this.autoplay && this.autoplays && this.list.length > 1) {
				this.autoplays = false;
				this.auto();
			}

		},
		auto () {
			this.timer = setInterval(() => {
				this.$refs.swiper.style.transition = '.3s all ease';
				this.n++;
				this.x = -(this.n * this.clientWidth);
				this.boundsHandler();
			}, this.autoplayInterval);
		},
		tabOnClickHandler (isTab = false, index) {
			if (isTab) {
				this.x = -(index * this.clientWidth);
			}
			if (this.x > 0) {
				this.n = 1;
				this.$refs.swiper.style.transition = '.3s all ease';
				this.x = 0;
			} else if (Math.abs(this.x) > (this.list.length - 1) * this.clientWidth) {
				this.n = this.list.length - 1;
				this.$refs.swiper.style.transition = '.3s all ease';
				this.x = -(this.n * this.clientWidth);
				this.n += 1;
			} else {
				this.n = Math.round(Math.abs(this.x) / this.clientWidth);
				this.$refs.swiper.style.transition = '.3s all ease';
				this.x = -(this.n * this.clientWidth);
				this.n += 1;
			}
			this.swiperOnChangeHandler(this.n - 1);
		},
		swiperOnClickHandler (item) {
			this.$emit('swiperOnClickHandler', item);
		},
		swiperOnChangeHandler (index) {
			this.$emit('swiperOnChangeHandler', index);
		}
	}
};
</script>
<style lang="scss" scoped>
.hy-swiper {
	height: 200px;
	position: relative;
	overflow: hidden;
	ul {
		display: flex;
		height: 200px;
	}
	img {
		width: 100%;
		height: 200px;
	}
	ol {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 0px;
		li {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			display: inline-block;
			background: rgba(0, 0, 0, 0.1);
			margin: 5px;
		}
		.active {
			background: #ffffff;
		}
	}
}
</style>
