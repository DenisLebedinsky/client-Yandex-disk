import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getToken, getinfo, getPath} from "./../../selectors/selectors";
import {appID} from "./../../config";
import {FETCH_INFO_DISK_REQUEST} from './../../ActionType';
import Path from './../../component/path/Path'


class NavBar extends Component {
    //если у адреса есть хеш тогда сохраняем токен
    //это будет только в том случае если мы получим урл от яндекса при успешной авторизации
    componentDidMount() {
        if (this.props.location.hash) {
            const token = /access_token=([^&]+)/.exec(this.props.location.hash)[1];
            const {dispatch} = this.props;
            //выполним запрос на сервер и получим данные по пользователю,
            dispatch({type: FETCH_INFO_DISK_REQUEST, payload: token});
            this.props.history.push('/');

        }
    }


    render() {
        return (
            <div className='container'>
                <nav className="navbar navbar-light bg-light NavBar__main">
                    <ol className="breadcrumb">
                        {this.props.path && this.props.path.map((pth, i) => <Path key={i} pathEl={pth}/>)}
                    </ol>
                    {this.props.info.display_name ? <p>{this.props.info.display_name}</p> :
                        <div>
                            <a className='btn btn-outline-success'
                               href={`https://oauth.yandex.ru/authorize?response_type=token&client_id=${appID}`}
                               target='_self'>Войти</a>
                        </div>}
                </nav>
                <div className='row'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return ({
        token: getToken(state),
        info: getinfo(state),
        path: getPath(state)
    })
};

export default withRouter(connect(mapStateToProps)(NavBar));
