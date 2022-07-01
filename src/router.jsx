import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

import HomePage from './pages/home.page.jsx';
import NotFoundPage from './pages/not-found.page.jsx';

const Routes = () => {
  const app = useSelector(state => state.app);
  console.log(app);

  return (
    <Switch>
      <Route path='/' exact component={props => <HomePage {...props} />} />

      <Route path='/not-found' exact component={props => <NotFoundPage {...props} />} />
      <Redirect from='*' to='/not-found' />
    </Switch>
  );
};

export default Routes;
