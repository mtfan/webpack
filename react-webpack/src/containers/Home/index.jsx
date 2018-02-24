import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd-mobile';
import axios from 'axios'

import {homeAction} from 'reduxs/action';

@connect(
  state => state.home,
  {homeAction}
)
class Home extends Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    axios.get('/api/current')
      .then(res => {
        console.log(res);
      }).catch(err => console.log(err))

  }

  onChange(){
    this.props.homeAction({react:"webpack3"});
  }

  render() {
    return (
      <section>
        {this.props.react}
        <Button onClick={this.onChange}>click</Button>
        </section>
    );
  }
}

export default Home;