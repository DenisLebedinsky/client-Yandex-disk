import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FETCH_RESOURCES_REQUEST} from './../../ActionType'
import {getToken, getData, getPath} from './../../selectors/selectors'
import {FETCH_INFO_DISK_REQUEST} from "../../ActionType";
import icFolder from './ic_folder.svg';

class Layout extends Component {
    /*после монирования производим экшен который запустит запрос к api
  и получим данные общего состояния диска и содержание корневого каталога
  */
    componentDidMount() {
        if (this.props.token) {
            const {dispatch} = this.props;
            if (this.props.info && this.props.info.hasOwnProperty('display_name')) {
                dispatch({type: FETCH_INFO_DISK_REQUEST, payload: this.props.token});
            }
            dispatch({type: FETCH_RESOURCES_REQUEST, payload: this.props.location.pathname});
        }
    }

// при нажатии ... (на каталог выше) меняем адресс роута
    handleckickBack() {
        let newpathback = this.props.history.location.pathname.substr(1).split('/');
        newpathback.pop();
        let newStrPath = '/' + newpathback.join('/');
        this.props.history.push(newStrPath);
    }

//при нажатии на папку так же изменяем путь адреса
// и тем самым проваливаемся в неё
    handleclickfolder(type, name) {
        if (type === 'dir') {
            let newpath = this.props.currentPath.slice();
            newpath.shift();
            newpath.push(name);
            let newStrPath = '/' + newpath.join('/');
            this.props.history.push(newStrPath);
        } else {

        }
    }

    handledownload(e) {
        e.stopPropagation();
    }

    handledelfolder(e) {
        e.stopPropagation();
    }


    render() {
        return <div className="container">
            <header className="App-header bd-highlight">
                {this.props.data.items ?
                    <ul className="list-group list-resourse">
                        {this.props.currentPath.length > 1 ?
                            <li className="list-group-item  d-flex justify-content-between"
                                onClick={() => this.handleckickBack()}
                            >...</li> : null}
                        {this.props.data.items.map(item =>
                            <li className="list-group-item  d-flex justify-content-between"
                                onClick={() => this.handleclickfolder(item.type, item.name)}
                                key={item.resource_id}
                            >
                                <div>
                                    {item.type === 'dir' && (<img src={icFolder} alt="folder"
                                                                  className="folder_icon pr-3"/>)}
                                    {item.name}
                                </div>
                                {item.type === 'dir' ?
                                    (<button onClick={(e) => this.handledelfolder(e)}
                                             className="btn btn-outline-danger">
                                        <i className="fas fa-times"/>
                                    </button>) :
                                    (<button onClick={(e) => this.handledownload(e)}
                                             className="btn btn-outline-success">
                                        <i className="fas fa-arrow-down"/>
                                    </button>)
                                }
                            </li>)
                        }
                    </ul>
                    : null}
            </header>
        </div>
    }
}

//добавляем данные из стора в пропсы
const mapStateToProps = state => {
    return ({
        token: getToken(state),
        data: getData(state),
        currentPath: getPath(state)
    })
};

export default connect(mapStateToProps)(Layout);

