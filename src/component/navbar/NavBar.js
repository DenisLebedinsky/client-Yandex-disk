import React, {PureComponent} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getToken, getinfo} from './../../selectors/selectors';
import {appID} from './../../config';
import Modal from './../modal/modal'
import {
    fetch_info_disk_request,
    fetch_Resources_request,
    clear_info_disk,
    clear_Resources,
    clear_token,
    open_modal,
    upload_file_request
} from './../../actions'
import Path from './../../component/path/Path'


class NavBar extends PureComponent {
    //если у адреса есть хеш тогда сохраняем токен
    //это будет только в том случае если мы получим урл от яндекса при успешной авторизации
    componentDidMount() {
        if (this.props.location.hash) {
            const token = /access_token=([^&]+)/.exec(this.props.location.hash)[1];
            //выполним запрос на сервер и получим данные по пользователю,
            this.props.fetch_info_disk_request(token);
            this.props.history.push('/');
            this.props.fetch_Resources_request(this.props.location.pathname);
        } else if (this.props.token && !this.props.info.hasOwnProperty('display_name')) {
            //выполним запрос на сервер и получим данные по пользователю,
            this.props.fetch_info_disk_request(this.props.token);
        }
    }

    signout() {
        //очищаем токен
        localStorage.setItem('token', '');
        this.props.clear_token();
        this.props.clear_info_disk();
        this.props.clear_Resources();
        this.props.history.push('/');
    }

    handleCreactFolder() {
        this.props.open_modal();
    }

    handleLoadFile(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.props.upload_file_request(this.props.history.location.pathname+file.name, reader.result,file.size)
        };
     reader.readAsDataURL(file);
    }


    render() {
        return (
            <div className='container'>
                <nav className='navbar navbar-light bg-light NavBar__main'>
                    <ol className='breadcrumb'>
                        {this.props.info.display_name ? <Path key={'01'} pathEl={'Файлы'}/> : null}
                        {this.props.history.location.pathname.substr(1).split('/').map((pth, i) =>
                            <Path key={i} pathEl={pth}/>
                        )}
                    </ol>
                    {this.props.info.display_name ?
                        <div className='btn-group'>
                            <span className='btn btn-success disabled'>{this.props.info.display_name}</span>
                            <button className='btn btn-success'
                                    onClick={() => this.signout()}
                            >Выйти
                            </button>
                        </div>
                        :
                        <div>
                            <a className='btn btn-outline-success'
                               href={`https://oauth.yandex.ru/authorize?response_type=token&client_id=${appID}`}
                               target='_self'>Войти</a>
                        </div>}
                </nav>

                {this.props.info.display_name &&
                <div className='row justify-content-center mt-3 mb-3'>
                    <div className='btn-group'>
                        <button className='btn btn-outline-warning'
                                onClick={() => this.handleCreactFolder()}
                        >Создать папку
                        </button>
                        <label className='btn btn-outline-primary mb-0'>
                            <input type='file' className='NavBar__input_LoadFile'
                                   onChange={(e) => this.handleLoadFile(e)}/>
                            Отправить файл
                        </label>
                    </div>
                </div>}
                <Modal location={this.props.location.pathname}/>
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

const mapDispatchToProps = {
    fetch_info_disk_request,
    fetch_Resources_request,
    clear_info_disk,
    clear_token,
    clear_Resources,
    open_modal,
    upload_file_request
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
