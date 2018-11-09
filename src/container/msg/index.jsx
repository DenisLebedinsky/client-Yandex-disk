import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMSG } from '../../selectors/selectors';
import PropTypes from 'prop-types';

// другие файлы ты называешь по имени класса, а этот файл решил назвать index.js, не надо так, всё надо делать в одном стиле
export class MSG extends Component {

  render() {
    const { show } = this.props.msg;
    if (!show) return null;
    return (
      <div className='alert alert-success fixed-bottom fadeDown'>
        {this.props.msg.status}
      </div>
    );
  }
}

MSG.propTypes = {
  msg: PropTypes.object,
};

const mapStateToProps = (state) => {
  return ({ msg: getMSG(state) });
};

export default connect(mapStateToProps)(MSG);
