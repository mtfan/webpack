import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RoutingNavBarAnimation from 'components/RoutingNavBarAnimation';
import { userAction, getUserInfo } from 'reduxs/action';
import Alert from 'components/Alert';

@connect(
  state => state.user,
  { userAction, getUserInfo }
)
@withRouter
@RoutingNavBarAnimation({ key: 'Home', title: '首页' })
class Home extends Component {
  constructor(props) {
    super(props);
    this.handel = this.handel.bind(this);
  }
  componentDidMount() {}

  handel() {
    let alert = Alert.open({
      alertTip: '全局组件测试'
    });
    this.props.userAction({ username: '王五' });
    setTimeout(() => {
      alert.destroy();
      this.props.getUserInfo();
    }, 3000);
  }
  render() {
    return <div onClick={this.handel}>{this.props.username}</div>;
  }
}

export default Home;
