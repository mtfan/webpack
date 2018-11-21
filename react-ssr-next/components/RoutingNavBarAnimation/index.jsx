import React, { Component, Fragment } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { relative } from 'path';
const RoutingNavBarAnimation = ({ key, title }) => Comp =>
  class WrapperComp extends Component {
    render() {
      return (
        <Fragment>
          <NavBar
            style={{ position: 'relative', zIndex: 999 }}
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => console.log('onLeftClick')}
            rightContent={[
              <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
              <Icon key="1" type="ellipsis" />
            ]}
          >
            {title}
          </NavBar>
          <QueueAnim type="scale" duration={500}>
            <Comp key={key} state={this.state} {...this.props} />
          </QueueAnim>
        </Fragment>
      );
    }
  };

export default RoutingNavBarAnimation;
