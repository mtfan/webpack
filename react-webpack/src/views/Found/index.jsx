import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import RoutingNavBarAnimation from 'components/RoutingNavBarAnimation';
@withRouter
@RoutingNavBarAnimation({ key: 'Found', title: '发现' })
class Found extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>Found</div>;
  }
}

export default Found;
