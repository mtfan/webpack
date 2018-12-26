# 修复 sass 报错

## sass 重新编译

```
npm rebuild node-sass
```

## vue/react 解决  低端机不兼容(白屏)

```
npm install --save babel-polyfill
// 在入口js文件引入
import 'babel-polyfill'
```
