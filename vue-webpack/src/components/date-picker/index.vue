<template>
  <div class="hy-date-picker-mask">
    <div class="hy-date-picker-popup">
      <div class="hy-picker-popup-header">
        <div class="hy-picker-popup-header-left">取消</div>
        <div class="hy-picker-popup-header-title">请选择日期</div>
        <div class="hy-picker-popup-header-right">确定</div>
      </div>
      <div class="hy-picker">
        <div class="hy-picker-col" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend" v-for="(arr,index) in list" :key="index">
          <div class="hy-picker-col-mask" style="width: 100%">{{index}}</div>
          <div class="hy-picker-col-indicator" style="width: 100%">{{index}}</div>
          <div class="hy-picker-col-content" :style="{width:'100%',transition:'all .3s linear',transform: 'translateY(' + y[index] + 'px)'}">
            <div class="hy-picker-col-content-item" v-for="(item,index) in arr" :key="index">{{item}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	data () {
		return {
			index: 0,
			startY: [],
			y: [],
			list: [[], [], []],
			listItemTotal: [],
		};
	},
	created () {
		this.test();
	},
	methods: {
		test () {
			for (let index = 0; index < 10; index++) {
				this.list[0].push(index);
				this.list[1].push(index);
				this.list[2].push(index);
			}
			this.list[0].push(10);
			this.list[0].push(11);
			this.list[1].push(10);
			this.listItemTotal.push(this.list[0].length - 1);
			this.listItemTotal.push(this.list[1].length - 1);
			this.listItemTotal.push(this.list[2].length - 1);
		},
		touchstart (e) {
			this.index = +e.target.innerHTML;
			this.onArrChangeHandler(this.startY, e.targetTouches[0].pageY - (this.y[this.index] || 0));
		},
		touchmove (e) {
			this.onArrChangeHandler(this.y, e.targetTouches[0].pageY - this.startY[this.index]);
		},
		touchend () {
			let y = this.y[this.index];
			if (y > 0) {
				this.onArrChangeHandler(this.y, 0);
				return;
			}
			let max = this.listItemTotal[this.index] * 34;
			if (Math.abs(y) > max) {
				this.onArrChangeHandler(this.y, -max);
				return;
			}
			this.onArrChangeHandler(this.y, (Math.ceil(y / 34) * 34));
			// eslint-disable-next-line no-console
			console.log(this.list[this.index][Math.abs(Math.ceil(y / 34))]);
		},
		onArrChangeHandler (arr, value) {
			arr.splice(this.index, 1, value);
		}
	}
};
</script>
<style lang="scss">
.hy-date-picker-mask {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	background: rgba(0, 0, 0, 0.5);
}
.hy-date-picker-popup {
	width: 100%;
	height: 280px;
	background: #ffffff;
	position: absolute;
	bottom: 0;
	.hy-picker-popup-header {
		display: flex;
		justify-content: space-between;
		height: 40px;
		line-height: 40px;
		padding: 0 20px;
		border-bottom: 1px #eeeeee solid;
		color: #108ee9;
		font-size: 18px;
	}
	.hy-picker-popup-header-title {
		color: #000000;
	}
	.hy-picker {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.hy-picker-col {
		flex: 1 1 0%;
		display: block;
		position: relative;
		height: 238px;
		overflow: hidden;
		width: 100%;
	}
	.hy-picker-col-mask {
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-size: 100% 102px;
		background-position: top, bottom;
		background-repeat: no-repeat;
		color: transparent;
		z-index: 3;
		margin: 0 auto;
		background-image: -webkit-linear-gradient(
				top,
				hsla(0, 0%, 100%, 0.95),
				hsla(0, 0%, 100%, 0.6)
			),
			-webkit-linear-gradient(bottom, hsla(0, 0%, 100%, 0.95), hsla(0, 0%, 100%, 0.6));
	}
	.hy-picker-col-indicator {
		width: 100%;
		height: 34px;
		box-sizing: border-box;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		color: transparent;
		top: 102px;
		position: absolute;
		left: 0;
		z-index: 3;
	}
	.hy-picker-col-content {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		padding: 102px 0;
		transform: translateY(0px);
	}
	.hy-picker-col-content-item {
		height: 34px;
		line-height: 34px;
		text-align: center;
	}
}
</style>

