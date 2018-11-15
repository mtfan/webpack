import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from '../../views/Dashboard';
const CommonRouter = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Redirect to="/" />
    </Switch>
  );
};
export default CommonRouter;
