import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from 'containers/Home';
import Product from 'containers/Product';

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path='/home' component={Home}></Route>
          <Route path='/product' component={Product}></Route>
          <Route  component={Home}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}
export default Router;


