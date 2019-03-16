import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
class Alert extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.state = {
      alertStatus: false,
      alertTip: '',
      ...this.props
    };
  }

  close() {
    this.setState({
      alertStatus: false
    });
  }
  render() {
    return (
      <div>
        {this.state.alertStatus && (
          <div className="alert-box" onClick={this.close}>
            {this.state.alertTip}
          </div>
        )}
      </div>
    );
  }
}

Alert.open = function(properties) {
  let div = document.createElement('div');
  let props = { alertStatus: true, ...properties };
  document.body.appendChild(div);
  ReactDOM.render(React.createElement(Alert, props), div);
  return {
    destroy() {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    }
  };
};

export default Alert;
