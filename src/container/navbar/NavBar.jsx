import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getToken, getinfo } from '../../selectors/selectors';
import { appID } from '../../config';
import Modal from '../modal/Modal';
import MSG from '../msg/Msg';
import {
  fetchInfoDiskRequest,
  fetchResourcesRequest,
  clearInfoDisk,
  clearResources,
  clearToken,
  openModal,
  uploadFileRequest,
} from '../../actions/action';
import Path from '../path/Path';


export class NavBar extends PureComponent {
  //если у адреса есть хеш тогда сохраняем токен
  //это будет только в том случае если мы получим урл от яндекса при успешной авторизации
  componentDidMount() {
    if (this.props.location.hash) {
      const token = /access_token=([^&]+)/.exec(this.props.location.hash)[1];
      //выполним запрос на сервер и получим данные по пользователю,
      this.props.fetchInfoDiskRequest(token);
      this.props.history.push('/');
      this.props.fetchResourcesRequest(this.props.location.pathname);
    } else if (
      this.props.token &&
      !this.props.info.hasOwnProperty('display_name')
    ) {
      //выполним запрос на сервер и получим данные по пользователю,
      this.props.fetchInfoDiskRequest(this.props.token);
    }
  }

  signOut = () => {
    //очищаем токен
    localStorage.setItem('token', '');
    this.props.clearToken();
    this.props.clearInfoDisk();
    this.props.clearResources();
    this.props.history.push('/');
  };

  handleCreatFolder = () => {
    this.props.openModal();
  };

  handleLoadFile = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.props.uploadFileRequest(
        this.props.history.location.pathname,
        file.name, reader.result,
      );
    };
    reader.readAsDataURL(file);
  };


  render() {
    const { info, history, location, children } = this.props;
    return (
      <div className='container'>
        <nav className='navbar navbar-light bg-light NavBar__main'>
          <ol className='breadcrumb'>
            {info.display_name ? (
              <Path key={'01'} pathEl={'Файлы'}/>
            ) : null}
            {history.location.pathname
              .substr(1)
              .split('/')
              .map((pth, i) => (
                <Path key={i} pathEl={pth}/>
              ))}
          </ol>
          {info.display_name ? (
            <div className='btn-group'>
              <span className='btn btn-success disabled'>
                {info.display_name}
              </span>
              <button
                className='btn btn-success'
                id='signOut'
                onClick={() => this.signOut()}
              >Выйти
              </button>
            </div>
          ) : (
            <div>
              <a className='btn btn-outline-success'
                 href={`https://oauth.yandex.ru/authorize?response_type=token&client_id=${appID}`}
                 target='_self'>Войти</a>
            </div>)}
        </nav>

        {info.display_name && (
          <div className='row justify-content-center mt-3 mb-3'>
            <div className='btn-group'>
              <button
                className='btn btn-outline-warning'
                id='createFolderBtn'
                onClick={this.handleCreatFolder}
              >Создать папку
              </button>
              <label className='btn btn-outline-primary mb-0'>
                <input
                  type='file'
                  className='NavBar__input_LoadFile'
                  onChange={this.handleLoadFile}/>
                Загрузить файл
              </label>
            </div>
          </div>
        )}
        <Modal location={location.pathname}/>

        <div className='row'>{children}</div>
        <div className='row'>
          <MSG/>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  token: PropTypes.string,
  info: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    token: getToken(state),
    info: getinfo(state),
  };
};

const mapDispatchToProps = {
  fetchInfoDiskRequest,
  fetchResourcesRequest,
  clearInfoDisk,
  clearResources,
  clearToken,
  openModal,
  uploadFileRequest,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NavBar),
);
