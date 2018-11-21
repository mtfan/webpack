import React, { Component } from 'react';
import RoutingNavBarAnimation from 'components/RoutingNavBarAnimation';
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
