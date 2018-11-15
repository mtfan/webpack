import csshook from 'css-modules-require-hook/preset';
import express from 'express';
import path from 'path';

import assetHook from 'asset-require-hook';
assetHook({
  extensions: ['png', 'jpg', 'svg']
});

import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { compose } from 'redux';
import reducer from './../src/redux/reducers';

import staticPath from './../build/manifest.json';
let cssArr = [];
let jsArr = [];

let h = Object.values(staticPath);
h.forEach(item => {
  if (item.endsWith('.js')) {
    jsArr.push(
      `<script type="text/javascript" src="/static/${item}"></script>`
    );
  } else if (item.endsWith('.css')) {
    cssArr.push(
      `<link type="text/css" href=/static/${item} rel="stylesheet"/>`
    );
  }
});
import CommonRouter from '../src/common/router';
const app = express();

app.get('/api/userInfo', (req, res) => {
  res.json({
    succeed: true,
    errorCode: '0000000',
    errorMessage: '成功',
    data: {
      username: 'hulei',
      qq: '123456'
    }
  });
});

app.post('/api/userInfo', (req, res) => {
  res.json({
    succeed: true,
    errorCode: '0000000',
    errorMessage: '成功',
    data: null
  });
});

app.use(function(req, res, next) {
  if (req.url.startsWith('/static/')) {
    return next();
  }
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  const context = {};
  const store = createStore(reducer, compose(applyMiddleware(thunk)));

  res.write(`<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>react ssr</title>
        <meta name="description" content="react">
        <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, width=device-width, viewport-fit=cover">
        <meta name="format-detection" content="telephone=no">
        <!-- safari full screen -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta id="apple-mobile-web-app-title" name="apple-mobile-web-app-title" content="react">
        <link rel="apple-touch-icon" href="static/images/logo.png">
        <link rel="icon" href="static/images/logo.png">
        ${cssArr.join('')}
       </head>
        <body>
            <div id="app" style="width:100%;height:100%">`);
  const MarkupStream = renderToNodeStream(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <CommonRouter />
      </StaticRouter>
    </Provider>
  );
  // 以流的形式返回数据
  MarkupStream.pipe(
    res,
    { end: false }
  );
  MarkupStream.on('end', function() {
    res.write(`
          </div>
          <script type="text/javascript">
            const standalone = window.navigator.standalone,
              userAgent = window.navigator.userAgent.toLowerCase(),
              ios = /iphone|ipod|ipad/.test(userAgent);
        
            if ((/terminal=4/.test(window.location.href) || (ios && standalone)) && (!/iphoneX=1/.test(window.location.href))) {
              document.querySelector('body').className += 'platform-ios';
            }
            if (/iphoneX=1/.test(window.location.href)) {
              document.querySelector('body').className += 'platform-iphonex';
            }
         </script>
          ${jsArr.join('')}
          </body>
      </html>`);
    res.end();
  });
});
// 设置静态资源目录
app.use('/static', express.static(path.resolve('./build')));
app.listen(8080, () => console.log('app listening on port 8080!'));
