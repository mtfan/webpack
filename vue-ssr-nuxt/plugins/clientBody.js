if (process.client) {
  const standalone = window.navigator.standalone,
    userAgent = window.navigator.userAgent.toLowerCase(),
    ios = /iphone|ipod|ipad/.test(userAgent);

  if (
    (/terminal=4/.test(window.location.href) || (ios && standalone)) &&
    !/iphoneX=1/.test(window.location.href)
  ) {
    document.querySelector('body').className += 'platform-ios';
  }
  if (/iphoneX=1/.test(window.location.href)) {
    document.querySelector('body').className += 'platform-iphonex';
  }
}
