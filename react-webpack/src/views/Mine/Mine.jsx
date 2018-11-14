import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import RoutingNavBarAnimation from 'components/RoutingNavBarAnimation';
@withRouter
@RoutingNavBarAnimation({ key: 'Mine', title: '我的' })
class Mine extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>Mine</div>;
  }
}

export default Mine;
