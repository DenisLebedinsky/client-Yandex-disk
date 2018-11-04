import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import icFolder from './ic_folder.svg';
import { deleteFolderRequest } from '../../actions';
import PropTypes from 'prop-types';

class Folder extends PureComponent {
  handleDelFolder = (e, path) => {
    this.props.deleteFolderRequest(path, this.props.location.pathname);
    e.stopPropagation();
  };

  render() {
    const { item } = this.props;
    return (
      <div className='d-flex justify-content-between'>
        <div>
          <img src={icFolder} alt='folder' className='folder_icon pr-3'/>
          {item.name}
        </div>
        <button onClick={(e) => this.handleDelFolder(e, item.path)}
                className='btn btn-outline-danger'>
          <i className='fas fa-times'/>
        </button>
      </div>

    );
  }
}

Folder.propTypes = {
  item: PropTypes.object,
};

const mapDispatchToProps = {
  deleteFolderRequest,
};

export default connect(null, mapDispatchToProps)(Folder);
