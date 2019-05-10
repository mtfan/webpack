function handlerClick() {
	console.log(this);
	this.homeMutation({ username: 'tom' });
	this.$Toast.open({
		toastTip: '全局组件测试',
	});
	setTimeout(() => {
		this.getUserInfo({
			username: 'hulei',
		});
	}, 2000);
}
export default handlerClick;
