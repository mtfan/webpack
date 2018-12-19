# vue--ssr-nuxt

> My primo Nuxt.js project

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

# 服务端渲染应用部署

- 第一步、在本地 npm run build,会生成 nuxt-dist 文件;

- 第二步、把本地文件的 nuxt-dist,static,package.json,nuxt.config.js,上传服务器

- 第三步、用 cmd 进入目录文件夹，安装依赖，npm install;

- 第四步、npm start 此时运行的是 http://localhost:3000;

- 单进程启动 pm2 start npm --name "nuxt" -- run start
