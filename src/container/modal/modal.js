import React, {Component} from 'react'
import {connect} from 'react-redux'
import './style.css'
import {close_modal, create_folder_request} from '../../actions';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {enterText: ''};
        this.handle_change = this.handle_change.bind(this);
        this.create_folder = this.create_folder.bind(this);
    }

    handle_change(e) {
        this.setState({enterText: e.target.value.replace(/[^a-zА-яёЁ\d\s]+/ig, '')})
    }

    close() {
        this.props.close_modal();
    }

    create_folder() {
        if(this.state.enterText) {
            let pathname = this.props.location;
            if (this.props.location === '/') {
                pathname = pathname + this.state.enterText;
            } else {
                pathname = pathname + '/' + this.state.enterText;
            }
            this.props.create_folder_request(pathname,this.props.location);
            this.props.close_modal();
            this.setState({enterText: ''})
        }
    }

    render() {
        const {isOpen} = this.props.modal;
        if (!isOpen) return null;
        return (<div className='modal fadeIn'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Наименование папки</h5>
                            <button type='button'
                                    className='close'
                                    onClick={() => this.close()}
                            >
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <input type='text'
                                   className='form-control'
                                   value={this.state.enterText}
                                   onChange={this.handle_change}
                            />
                        </div>
                        <div className='modal-footer'>
                            <button type='button'
                                    className='btn btn-secondary'
                                    onClick={() => this.close()}
                            >Закрыть
                            </button>
                            <button type='button'
                                    className='btn btn-primary'
                                    onClick={this.create_folder}
                            >Создать
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToprops = (state) => {
    return ({modal: state.modal})
};
const mapDispatchToProps = {
    close_modal,
    create_folder_request
};
export default connect(mapStateToprops, mapDispatchToProps)(Modal)
