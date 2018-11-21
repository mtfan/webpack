import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'next/router';
import './index.scss';
@withRouter
class TabBarLink extends Component {
  render() {
    let { router, navList } = this.props;
    return (
      <TabBar
        tabBarPosition="bottom"
        tintColor="#FE546D"
        unselectedTintColor="#C6B5B9"
      >
        {navList.map(item => {
          return (
            <TabBar.Item
              icon={{
                uri: `/static/images/tabs/${item.icon}-off.png`
              }}
              selectedIcon={{
                uri: `/static/images/tabs/${item.icon}-on.png`
              }}
              key={item.path}
              title={item.text}
              selected={item.path === router.pathname}
              onPress={() => router.push(item.path)}
            />
          );
        })}
      </TabBar>
    );
  }
}

export default TabBarLink;
