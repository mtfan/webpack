import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import Home from '../Home';
import Found from '../Found';
import MinePage from '../Mine';
import './index.css';
import { withRouter } from 'react-router-dom';
@withRouter
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      navList: [
        {
          path: '/home',
          text: '首页',
          icon: 'home',
          title: '首页',
          component: <Home />
        },
        {
          path: '/found',
          text: '发现',
          icon: 'found',
          title: '发现',
          component: <Found />
        },
        {
          path: '/mine',
          text: '我的',
          icon: 'mine',
          title: '我的',
          component: <MinePage />
        }
      ]
    };
  }

  render() {
    return (
      <div className="tab-bar-router">
        <TabBar
          tabBarPosition="bottom"
          tintColor="#FE546D"
          unselectedTintColor="#C6B5B9"
        >
          {this.state.navList.map(item => {
            return (
              <TabBar.Item
                icon={{
                  uri: require(`./../../static/images/tabs/${
                    item.icon
                  }-off.png`)
                }}
                selectedIcon={{
                  uri: require(`./../../static/images/tabs/${item.icon}-on.png`)
                }}
                key={item.path}
                title={item.text}
                selected={this.state.selectedTab === item.icon}
                onPress={() => {
                  this.setState({
                    selectedTab: item.icon
                  });
                }}
              >
                {this.state.selectedTab == item.icon ? item.component : ''}
              </TabBar.Item>
            );
          })}
        </TabBar>
      </div>
    );
  }
}

export default Dashboard;
