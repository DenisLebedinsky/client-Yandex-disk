import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getToken, getData, getPath } from './../../selectors/selectors';
import PropTypes from 'prop-types';

import ListItem from './../../components/ListItem/ListItem';
import {
  fetchInfoDiskRequest,
  fetchResourcesRequest,
} from '../../actions/action';

export class Layout extends Component {
  /* после монирования производим экшен который запустит запрос к api
  и получим данные общего состояния диска и содержание корневого каталога */
  componentDidMount() {
    if (this.props.token) {
      if (this.props.info && this.props.info.hasOwnProperty('display_name')) {
        this.props.fetchInfoDiskRequest(this.props.token);
      }
      this.props.fetchResourcesRequest(this.props.location.pathname);
    }
  }

  // при нажатии ... (на каталог выше) меняем адресс роута
  handleCklickBack() {
    let newpathback = this.props.history.location.pathname.substr(1).split('/');
    newpathback.pop();
    let newStrPath = '/' + newpathback.join('/');
    this.props.history.push(newStrPath);
  }

  render() {
    const { data, currentPath } = this.props;
    return <div className='container'>
      <header className='App-header bd-highlight'>
        {data.items &&
        <ul className='list-group list-resourse'>
          {currentPath.length > 1 &&
          <li className='list-group-item  d-flex justify-content-between'
              onClick={() => this.handleCklickBack()}
          >...</li>}
          {data.items.map(item => <ListItem item={item} key={item.resource_id}/>)}
        </ul>
        }
      </header>
    </div>;
  }
}

Layout.propTypes = {
  token: PropTypes.string,
  data: PropTypes.object,
  currentPath: PropTypes.array,
};

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
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);

