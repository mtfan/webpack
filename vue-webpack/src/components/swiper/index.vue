<template>
  <div class="hy-swiper">
    <ul ref="swiper" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend" :style="{'width':clientWidth*list.length+'px','transform':'translate3d('+x+'px,0,0)'}">
      <slot>
        <li v-for="(item,i) in list" :key="i">
          <img :src="item" :style="{'width':clientWidth+'px'}">
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
		if (this.list.length > 1) {
			this.list = [this.data[this.data.length - 1], ...this.data, this.data[0]];
			this.x = -this.clientWidth;
		}
		if (this.autoplays && this.list.length > 1) {
			this.auto();
			this.autoplays = false;
		}
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
			this.n = Math.round(Math.abs(this.x) / this.clientWidth);
			this.$refs.swiper.style.transition = '.3s all ease';
			this.x = -(this.n * this.clientWidth);
			this.boundsHandler();
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
			display: inline-block;
			border-radius: 50%;
			background: #dddddd;
			margin: 5px;
		}
		.active {
			background: #f60;
		}
	}
}
</style>
