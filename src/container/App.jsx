import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import Layout from './layout/layout';
import NavBar from './../component/navbar/NavBar';

function App({location}) {
    return (
        <div>
        <NavBar />
            <Route path="/:path?" component={Layout} key={location.pathname}/>
        </div>
    )
}

export default withRouter(App);
