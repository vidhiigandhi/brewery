import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import DetailScreen from './DetailScreen';
import IntroScreen from './IntroScreen';

const Routes = (props) => (
  <Router>
    <Redirect exact from="/" to="/home" />
    <Route path="/home">
      <IntroScreen />
    </Route>
    <Switch>
      <Route path="/details/:id" component={DetailScreen} />
    </Switch>
  </Router>
);

export default Routes;
