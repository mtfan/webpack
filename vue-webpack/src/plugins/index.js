import ToastComponent from 'components/Toast';
const Toast = {};
Toast.install = function (Vue) {
	// 创建组件类
	const ToastConstructor = Vue.extend(ToastComponent);
	// 生成该类的实例
	const instance = new ToastConstructor();
	// 将这个实例挂载在我创建的div上
	instance.$mount(document.createElement('div'));
	// 并将此div加入全局挂载点内部
	document.body.appendChild(instance.$el);

	// 提供暴露的操作函数
	let toast = {
		open(options) {
			instance.toastStatus = true;
			instance.toastTip = options.toastTip;
		}
	};
	Vue.prototype.$Toast = toast;
};



export default Toast;
