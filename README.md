# 修复 sass 报错

## sass 重新编译

```
npm rebuild node-sass
```

## vue/react 解决es6 7 新api 不兼容
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