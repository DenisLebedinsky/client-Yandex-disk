import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import Layout from './layout/Layout';
import NavBar from './navbar/NavBar';

//рендер навигационной панели и рабочего экрана
//рабочий экран отображается по текущему пути адресной стр.
function App({location}) {
    return (
        <div>
            <NavBar/>
            <Route path='/:path?' component={Layout} key={location.pathname}/>
        </div>
    )
}

export default withRouter(App);
