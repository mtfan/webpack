import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import TabBarLink from 'components/TabBarLink';

import Home from 'views/Home';
import Found from 'views/Found';
import MinePage from 'views/Mine';
import './index.scss';
import { withRouter } from 'react-router-dom';
@withRouter
class Tabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pathname } = this.props.location;
    const navList = [
      {
        path: '/home',
        text: '首页',
        icon: 'home',
        title: '首页',
        component: Home
      },
      {
        path: '/found',
        text: '发现',
        icon: 'found',
        title: '发现',
        component: Found
      },
      {
        path: '/mine',
        text: '我的',
        icon: 'mine',
        title: '我的',
        component: MinePage
      }
    ];
    let page = navList.find(v => v.path == pathname);

    return (
      <Fragment>
        <Route key={page.path} path={page.path} component={page.component} />
        <div className="tab-bar-router">
          <TabBarLink navList={navList} />
        </div>
      </Fragment>
    );
  }
}

export default Tabs;
