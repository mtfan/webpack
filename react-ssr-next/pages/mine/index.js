import React, { Component } from 'react';
import RoutingNavBarAnimation from 'components/RoutingNavBarAnimation';
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
