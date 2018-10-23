import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getToken, getinfo, getPath} from "./../../selectors/selectors";
import {appID} from "./../../config";
import {FETCH_INFO_DISK_REQUEST, CLEAR_TOKEN, CLEAR_INFO,CLEAR_DATA,FETCH_RESOURCES_REQUEST} from './../../ActionType';
import Path from './../../component/path/Path'


class NavBar extends Component {
    //если у адреса есть хеш тогда сохраняем токен
    //это будет только в том случае если мы получим урл от яндекса при успешной авторизации
    componentDidMount() {
        if (this.props.location.hash ) {
            const token = /access_token=([^&]+)/.exec(this.props.location.hash)[1];
            const {dispatch} = this.props;
            //выполним запрос на сервер и получим данные по пользователю,
            dispatch({type: FETCH_INFO_DISK_REQUEST, payload: token});
            this.props.history.push('/');
            dispatch({type: FETCH_RESOURCES_REQUEST, payload: this.props.location.pathname});
        }else if(this.props.token && !this.props.info.hasOwnProperty('display_name')){
            const {dispatch} = this.props;
            //выполним запрос на сервер и получим данные по пользователю,
            dispatch({type: FETCH_INFO_DISK_REQUEST, payload: this.props.token});
        }
    }

    signout(){
        const {dispatch} = this.props;
        //очищаем токен в сторе и локалсторедж
        localStorage.setItem('token','');
        dispatch({type: CLEAR_TOKEN});
        dispatch({type:CLEAR_INFO});
        dispatch({type:CLEAR_DATA});
        this.props.history.push('/');
    }

    render() {
        return (
            <div className='container'>
                <nav className="navbar navbar-light bg-light NavBar__main">
                    <ol className="breadcrumb">
                        {this.props.info.display_name ? <Path key={'01'} pathEl={"Файлы"}/>:null}
                        {this.props.history.location.pathname.substr(1).split('/').map((pth, i) => <Path key={i} pathEl={pth}/>)}
                    </ol>
                    {this.props.info.display_name ?
                        <div className='btn-group'>
                            <span className='btn btn-success disabled'>{this.props.info.display_name}</span>
                            <button className='btn btn-success'
                                    onClick={()=>this.signout()}
                            >Выйти</button>
                        </div>
                        :
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
        info: getinfo(state)
    })
};

export default withRouter(connect(mapStateToProps)(NavBar));
