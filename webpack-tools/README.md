# webpack

## loader

> 什么是 loader?loader 能做什么？

- webpack 可以使用 loader 来预处理文件,比如 js(es5 转 es6),scss 转 css ,处理图片等等

> loader 执行？如何自定义 loader？

- loader 执行的顺序从下到上，从右往左
- loader 其实就是一个暴露的函数，webpack 调用 loader 的时候，其实就是在调用一个函数，会把源代码通过参数传递过去,loader 定义的 options，可以通过 loaderUtils 得到，做好处理后在返回即可
