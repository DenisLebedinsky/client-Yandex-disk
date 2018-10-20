import React from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import Layout from './layout/layout';


function App({ location }) {
  return <Route path="/:path?" component={Layout} key={location.pathname} />;
}

export default withRouter(App);
