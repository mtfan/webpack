<template>
  <div class="hy-dialog-drag" @touchstart.prevent="touchstart" @touchmove.stop.prevent="touchmove" @click.stop.prevent="onDragHandler" :style="{left:x+'px',top:y+'px'}">
    <slot></slot>
  </div>
</template>
<script>
export default {
	props: {
		bottomSistance: {// 初始位置与视口底部的距离
			type: Number,
			default: 50
		},
		rightSistance: {// 初始位置与视口右边的距离
			type: Number,
			default: 20
		}
	},
	data () {
		return {
			clientWidth: document.documentElement.clientWidth,
			clientHeight: document.documentElement.clientHeight,
			boxWidth: 0,
			boxHeight: 0,
			maxY: 0,
			maxX: 0,
			startX: 0,
			startY: 0,
			x: 0,
			y: 0
		};
	},
	mounted () {
		let $dom = document.querySelector('.hy-dialog-drag');
		this.boxWidth = $dom.offsetWidth;
		this.boxHeight = $dom.offsetHeight;
		this.x = this.clientWidth - this.boxWidth - this.rightSistance;
		this.y = this.clientHeight - this.boxHeight - this.bottomSistance;
		this.maxX = this.clientWidth - this.boxWidth;
		this.maxY = this.clientHeight - this.boxHeight;
	},
	methods: {
		touchstart (e) {
			this.startX = e.targetTouches[0].pageX - this.x;
			this.startY = e.targetTouches[0].pageY - this.y;
		},
		touchmove (e) {
			this.x = e.targetTouches[0].pageX - this.startX;
			this.y = e.targetTouches[0].pageY - this.startY;
			if (this.x <= 0) {
				this.x = 0;
			} else if (this.x >= this.maxX) {
				this.x = this.maxX;
			}
			if (this.y <= 0) {
				this.y = 0;
			} else if (this.y >= this.maxY) {
				this.y = this.maxY;
			}
		},
		onDragHandler () {
			this.$emit('onDragHandler');
		}
	}
};
</script>
<style  lang="scss">
.hy-dialog-drag {
	position: fixed;
	width: 80px;
	height: 80px;
	background: red;
	z-index: 1000;
}
</style>
