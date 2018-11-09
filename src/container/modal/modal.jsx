import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import { closeModal, createFolderRequest } from '../../actions';
import PropTypes from 'prop-types';

// все файлы компонентов лучше называть с заглавной буквы, по имени класса, так их потом искать проще

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { enterText: '' };
  }

  handleChange(e) {
    this.setState({ enterText: e.target.value.replace(/[^a-zА-яёЁ\d\s]+/ig, '') });
  }

  /** 
   * если объявляешь методы без стрелочных функций, то их надо баиндить в конструкторе
   * лучше пиши так
   * close = () => {
   *  this.props.closeModal(); 
   * }
  */
  close() {
    this.props.closeModal();
  }
  
  // если объявляешь методы без стрелочных функций, то их надо баиндить в конструкторе
  createFolder() {
    if (this.state.enterText) {
      let pathname = this.props.location;
      if (this.props.location === '/') {
        pathname = pathname + this.state.enterText;
      } else {
        pathname = pathname + '/' + this.state.enterText;
      }
      this.props.createFolderRequest(pathname, this.props.location);
      this.props.closeModal();
      this.setState({ enterText: '' });
    }
  }

  render() {
    const { isOpen } = this.props.modal;
    if (!isOpen) return null;
    return (<div className='modal fadeIn'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Наименование папки</h5>
              <button type='button'
                      className='close'
                      onClick={() => this.close() /* не надо так */}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <input type='text'
                     className='form-control'
                     value={this.state.enterText}
                     onChange={(e) => this.handleChange(e) /* и так */}
              />
            </div>
            <div className='modal-footer'>
              <button type='button'
                      id='closeModal'
                      className='btn btn-secondary'
                      onClick={() => this.close() /** и так */}
              >Закрыть
              </button>
              <button type='button'
                      className='btn btn-primary'
                      id='CreateFolder'
                      onClick={() => this.createFolder() /** и так */}
              >Создать
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  modal: PropTypes.object,
  location: PropTypes.string,
};

const mapStateToProps = (state) => {
  return ({ modal: state.modal });
};
const mapDispatchToProps = {
  closeModal,
  createFolderRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
