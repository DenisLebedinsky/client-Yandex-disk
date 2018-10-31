import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getToken, getData, getPath } from './../../selectors/selectors';
import icFolder from './ic_folder.svg';
import icFile from './file.svg';
import {
  fetchInfoDiskRequest,
  fetchResourcesRequest,
  deleteFolderRequest,
} from '../../actions';

class Layout extends PureComponent {
  /*после монирования производим экшен который запустит запрос к api
  и получим данные общего состояния диска и содержание корневого каталога
  */
  componentDidMount() {
    if (this.props.token) {
      if (this.props.info && this.props.info.hasOwnProperty('display_name')) {
        this.props.fetchInfoDiskRequest(this.props.token);
      }
      this.props.fetchResourcesRequest(this.props.location.pathname);
    }
  }

  // при нажатии ... (на каталог выше) меняем адресс роута
  handleCkickBack() {
    let newpathback = this.props.history.location.pathname.substr(1).split('/');
    newpathback.pop();
    let newStrPath = '/' + newpathback.join('/');
    this.props.history.push(newStrPath);
  }

  //при нажатии на папку так же изменяем путь адреса
  // и тем самым проваливаемся в неё
  handleClickFolder(type, name) {
    if (type === 'dir') {
      let newpath = this.props.currentPath.slice();
      newpath.shift();
      newpath.push(name);
      let newStrPath = '/' + newpath.join('/');
      this.props.history.push(newStrPath);
    }
  }


  handleDelFolder(e, itempath) {
    this.props.deleteFolderRequest(itempath, this.props.location.pathname);
    e.stopPropagation();
  }


  render() {
    return <div className='container'>
      <header className='App-header bd-highlight'>
        {this.props.data.items ?
          <ul className='list-group list-resourse'>
            {this.props.currentPath.length > 1 ?
              <li className='list-group-item  d-flex justify-content-between'
                  onClick={() => this.handleCkickBack()}
              >...</li> : null}
            {this.props.data.items.map(item =>
              <li className='list-group-item  d-flex justify-content-between'
                  onClick={() => this.handleClickFolder(item.type, item.name)}
                  key={item.resource_id}
              >
                {item.type === 'dir' ?
                  <div>
                    <img src={icFolder} alt='folder'
                         className='folder_icon pr-3'/>
                    {item.name}
                  </div>
                  :
                  <div>
                    <img src={icFile} alt='folder'
                         className='file_icon pr-3'/>
                    {item.name}
                  </div>}

                {item.type !== 'dir' ? (
                  <a href={item.file}>
                    <button className='btn btn-outline-success'
                    >
                      <i className='fas fa-arrow-down'/>
                    </button>
                  </a>
                ) : (<button onClick={(e) => this.handleDelFolder(e, item.path)}
                             className='btn btn-outline-danger'>
                  <i className='fas fa-times'/>
                </button>)
                }
              </li>)
            }
          </ul>
          : null}
      </header>
    </div>;
  }

}

//добавляем данные из стора в пропсы
const mapStateToProps = state => {
  return ({
    token: getToken(state),
    data: getData(state),
    currentPath: getPath(state),
  });
};

const mapDispatchToProps = {
  fetchInfoDiskRequest,
  fetchResourcesRequest,
  deleteFolderRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);

