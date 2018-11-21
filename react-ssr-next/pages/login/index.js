import React, { Component } from 'react';
import RoutingNavBarAnimation from 'components/RoutingNavBarAnimation';
@RoutingNavBarAnimation({ key: 'Login', title: '登录' })
class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>Login</div>;
  }
}

export default Login;
