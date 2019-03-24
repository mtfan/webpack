<template>
  <div class="hy-date-picker-mask">
    <div class="hy-date-picker-popup">
      <div class="hy-picker-popup-header">
        <div class="hy-picker-popup-header-left">取消</div>
        <div class="hy-picker-popup-header-title">请选择日期</div>
        <div class="hy-picker-popup-header-right">确定</div>
      </div>
      <div class="hy-picker">
        <div class="hy-picker-col" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend" v-for="(arr,index) in data" :key="index">
          <div class="hy-picker-col-mask" style="width: 100%">{{index}}</div>
          <div class="hy-picker-col-indicator" style="width: 100%">{{index}}</div>
          <div class="hy-picker-col-content" :style="{width:'100%',transition:'all .3s linear',transform: 'translateY(' + y[index] + 'px)'}">
            <div class="hy-picker-col-content-item" v-for="(item,index) in arr" :key="index">{{item.label}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const SPACE = 34;
export default {
	props: {
		list: {
			type: Array,
			default: () => []
		},
		type: {
			type: Number,// 默认为日期类型
			default: 1
		},
		startYears: {
			type: [Number, String],
			default: 2000

		},
		endYears: {
			type: [Number, String],
			default: 2019

		}
	},
	data () {
		return {
			data: this.list,
			index: 0,
			startY: [],
			y: [],
			values: []
		};
	},
	created () {
		this.init();
	},
	methods: {
		init () {
			if (this.type === 1) {
				for (let index = this.startYears; index <= this.endYears; index++) {
					if (!this.data[0]) {
						this.data[0] = [];
					}
					this.data[0].push({ label: `${index}年`, value: index, });
				}
				for (let index = 1; index <= 12; index++) {
					if (!this.data[1]) {
						this.data[1] = [];
					}
					this.data[1].push({ label: `${index}月`, value: index, });
				}
			}
			this.data.forEach(item => {
				this.values.push(item[0]);
				this.y.push(0);
				this.startY.push(0);
			});

			if (this.type === 1) {
				this.getDays(this.values[0].value, this.values[1].value);
			}
		},
		getDays (y, m) {
			for (let index = 1; index <= new Date(y, m, 0).getDate(); index++) {
				if (!this.data[2]) {
					this.data[2] = [];
				}
				this.data[2].push({ label: `${index}日`, value: index, });
			}
			let max = (this.data[2].length - 1) * SPACE;
			if (Math.abs(this.y[2]) > max) {
				this.y.splice(2, 1, -max);
				this.values[2] = this.data[2][this.data[2].length - 1];

			} else if (!this.values[2]) {
				this.values[2] = this.data[2][0];
			}
		},
		touchstart (e) {
			this.index = +e.target.innerHTML;
			this.startY[this.index] = e.targetTouches[0].pageY - (this.y[this.index] || 0);
		},
		touchmove (e) {
			this.onArrChangeHandler(this.y, e.targetTouches[0].pageY - this.startY[this.index]);
		},
		touchend () {
			let y = this.y[this.index];
			let index = this.index;
			let dataItemArr = this.data[this.index];
			let max = (dataItemArr.length - 1) * SPACE;
			if (y > 0) {
				this.onArrChangeHandler(this.y, 0);
				this.values[index] = dataItemArr[0];
			} else if (Math.abs(y) > max) {
				this.onArrChangeHandler(this.y, -max);
				this.values[index] = dataItemArr[dataItemArr.length - 1];
			} else {
				this.onArrChangeHandler(this.y, (Math.ceil(y / SPACE) * SPACE));
				this.values[index] = dataItemArr[Math.abs(Math.ceil(y / SPACE))];
			}
			// eslint-disable-next-line no-console
			console.log(this.values);
			if (this.type === 1 && (index === 0 || index === 1)) {
				this.data.splice(2, 1, []);
				this.getDays(this.values[0].value, this.values[1].value);
			}
		},
		onArrChangeHandler (arr, value) {
			arr.splice(this.index, 1, value);
		},
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

