import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoutingNavBarAnimation from 'components/RoutingNavBarAnimation';
import AuthRouter from 'components/AuthRouter';
import { userServer } from 'api/UserServer';
import { userAction, getUserInfo } from 'reduxs/action';
@connect(
  state => state.user,
  { userAction, getUserInfo }
)
@AuthRouter
@RoutingNavBarAnimation({ key: 'Home', title: '首页' })
class Home extends Component {
  constructor(props) {
    super(props);
    this.handel = this.handel.bind(this);
    this.state = {
      username: 'lisi'
    };
  }

  componentDidMount() {
    userServer.getUserInfo().then(res => {
      this.setState({ username: res.data.username });
    });
  }

  handel() {
    this.props.userAction({ username: '王五' });
    setTimeout(() => {
      this.props.getUserInfo();
    }, 3000);
  }

  render() {
    return (
      <div>
        Home:{this.state.username}
        <div onClick={this.handel}>redux:{this.props.username}</div>
      </div>
    );
  }
}

export default Home;
