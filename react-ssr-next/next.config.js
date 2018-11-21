const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
module.exports = withCSS(
  withSass({
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:8]'
    }
  })
);
