import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/signin" component={SignIn} />
    <Route exact path="/signup" component={SignUp} />
  </Switch>
);

export default Routes;
