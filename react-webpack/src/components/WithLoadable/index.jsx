import React from 'react';
import Loadable from 'react-loadable';

export default function withLoadable(comp) {
  debugger;
  return Loadable({
    loader: comp,
    loading: props => {
      if (props.error) {
        return <div>加载错误,请刷新</div>;
      } else if (props.pastDelay) {
        return <div>加载中...</div>;
      } else {
        return null;
      }
    }
  });
}
