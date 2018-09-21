if (navigator.serviceWorker && __DEV__) {
  // 执行注册
  navigator.serviceWorker
    .register('./sw.js', { scope: './' }) //当前作用域
    .then(function(registration) {
      console.log('ServiceWorker 注册成功！作用域为: ', registration.scope);
    })
    .catch(err => console.log('ServiceWorker 注册失败: ', err));
} else {
  console.log('开发环境或者此浏览器不支持serviceWorker');
}
