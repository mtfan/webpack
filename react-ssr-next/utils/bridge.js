export class JsBridge {
  static connectWebViewJavascriptBridge(callback) {
    const standalone = window.navigator.standalone,
      userAgent = window.navigator.userAgent.toLowerCase(),
      ios = /iphone|ipod|ipad/.test(userAgent);
    if (ios && standalone) {
      if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
      }
      window.WVJBCallbacks = [callback];
      let WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe);
      }, 0);
    } else {
      if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
      } else {
        document.addEventListener(
          'WebViewJavascriptBridgeReady',
          function () {
            callback(WebViewJavascriptBridge);
          },
          false
        );
      }
    }
  }

  static init(fn) {
    // 只能初始化一次
    this.connectWebViewJavascriptBridge(function (WebViewJavascriptBridge) {
      WebViewJavascriptBridge.init(function (message, responseCallback) {});
      fn && fn();
    });
  }

  static toAppHandler(obj, callback) {
    WebViewJavascriptBridge.callHandler(
      'toAppHandler', {
        type: obj.type,
      }, (response) => {
        callback(response);
      }
    );
  }
}