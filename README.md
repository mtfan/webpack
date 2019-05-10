# 修复 sass 报错

## sass 重新编译

```
npm rebuild node-sass
```

## vue/react 解决 es6 7 新 api 不兼容

- babel 7 可以配置按需加载

```
npm install --save babel-polyfill
// 在入口js文件引入
import 'babel-polyfill'
```

## babel 升级工具修改配置

```
npx babel-upgrade --write
```

## 或是安裝

```
npm install babel-upgrade -g
babel-upgrade --write
```

## Chrome DevTools 代码覆盖率功能(coverage)

- command+shift+p 输入 coverage
- More tools 添加的控制面板

## import 懒加载(性能优化点)

- import 默认情况下,被执行调用的时候才会加载
- 配置 webpackPrefetch 核心代码加载完成，线程空闲的时候加载(好处可以提前加载)

```
import(/* webpackPrefetch: true */ './prefetch.js').then(({ default: fn }) => {
     	fn();
     });
```
