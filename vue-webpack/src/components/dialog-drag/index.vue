<template>
  <div class="dialog-drag" @touchstart.prevent="touchstart" @touchmove.stop.prevent="touchmove" @click.stop.prevent="onHandler" :style="{left:x+'px',top:y+'px'}"></div>
</template>
<script>
export default {
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
		let $dom = document.querySelector('.dialog-drag');
		this.boxWidth = $dom.offsetWidth;
		this.boxHeight = $dom.offsetHeight;
		this.x = this.clientWidth - this.boxWidth - 10;
		this.y = this.clientHeight - this.boxHeight - 10;
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
			e.preventDefault();
		},
		onHandler () {
			console.log('onHandler');
		}
	}
};
</script>
<style  lang="scss" scoped>
.dialog-drag {
	position: fixed;
	width: 100px;
	height: 100px;
	background: red;
	z-index: 1000;
}
</style>
