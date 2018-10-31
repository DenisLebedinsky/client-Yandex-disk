import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { getPath } from '../../selectors/selectors';
import {file} from './file'
import Folder from './Folder';


class ListItem extends PureComponent {
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

render(){
  const {item} = this.props;
  return(
    <li className='list-group-item  '
        onClick={() => this.handleClickFolder(item.type, item.name)}
    >
      {item.type === 'dir' ? <Folder item={item} location={this.props.history.location}/> : file(item)}
    </li>
  )
}
}

//добавляем данные из стора в пропсы
const mapStateToProps = state => {
  return ({
    currentPath: getPath(state),
  });
};

export default withRouter(connect(mapStateToProps, null)(ListItem))
