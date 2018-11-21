const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');

if (typeof require !== 'undefined') {
  // eslint-disable-next-line
  require.extensions['.css'] = file => {};
}

module.exports = withCSS(
  withSass({
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:8]'
    }
  })
);
