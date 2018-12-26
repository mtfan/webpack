# 修复 sass 报错

## sass 重新编译

```
npm rebuild node-sass
```

## react 解决  低端机不兼容(白屏)

```
npm install core-js
// 在入口js文件引入
import  'core-js/fn/Map';
import  'core-js/fn/set';

```

## vue/react 解决  低端机不兼容(白屏)

```
npm install --save babel-polyfill
// 在入口js文件引入
import 'babel-polyfill'
```
