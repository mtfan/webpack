import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import './index.scss';
@withRouter
class TabBarLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { pathname } = this.props.location;
    return (
      <TabBar
        tabBarPosition="bottom"
        tintColor="#FE546D"
        unselectedTintColor="#C6B5B9"
      >
        {this.props.navList.map(item => {
          return (
            <TabBar.Item
              icon={{ uri: require(`static/images/tabs/${item.icon}-off.png`) }}
              selectedIcon={{
                uri: require(`static/images/tabs/${item.icon}-on.png`)
              }}
              key={item.path}
              title={item.text}
              selected={item.path === pathname}
              onPress={() => this.props.history.push(item.path)}
            />
          );
        })}
      </TabBar>
    );
  }
}

export default TabBarLink;
