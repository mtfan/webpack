import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Tabs from 'views/Tabs';
const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="*" component={Tabs} />
      </Switch>
    </HashRouter>
  );
};
export default Router;
