import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

@withRouter
class TabBarNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'home'
    }

    this.onClickTab = this.onClickTab.bind(this);
  }

  onClickTab(v) {
    this.setState({
      selected: v
    });
    console.log(this.props)
  }

  render() {
    const {selected} = this.state;
    return (
      <TabBar>
        <TabBar.Item
          icon={{uri: require(`./img/boss.png`)}}
          selectedIcon={{uri: require(`./img/boss-active.png`)}}
          key='home'
          title='home'
          selected={selected === 'home'}
          onPress={() => this.onClickTab('home')}
        />
        <TabBar.Item
          icon={{uri: require(`./img/user.png`)}}
          selectedIcon={{uri: require(`./img/user-active.png`)}}
          key='product'
          title='product'
          selected={selected === 'product'}
          onPress={() => this.onClickTab('product')}
        />
      </TabBar>

    );
  }
}

export default TabBarNav;
