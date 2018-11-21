import React, { Component } from 'react';
import RoutingNavBarAnimation from 'components/RoutingNavBarAnimation';

@RoutingNavBarAnimation({ key: 'Home', title: '首页' })
class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>Home</div>;
  }
}

export default Home;
