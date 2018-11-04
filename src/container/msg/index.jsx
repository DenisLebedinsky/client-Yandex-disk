import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMSG } from '../../selectors/selectors';
import PropTypes from 'prop-types';

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
