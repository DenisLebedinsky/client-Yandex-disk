import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getToken, getPath} from "./../../selectors/selectors";
import {FETCH_RESOURCES_REQUEST} from '../../ActionType';


class Path extends Component {
    handleClickPath() {
        if (this.props.pathEl !== this.props.currentPath[this.props.currentPath.length - 1]) {
            const {dispatch} = this.props;
            let poz = this.props.currentPath.indexOf(this.props.pathEl);
            let nexPath = this.props.currentPath.slice(1, poz + 1).join('/');
            dispatch({type: FETCH_RESOURCES_REQUEST, payload: nexPath});
        }
    }

    render() {
        return (
            <li className="breadcrumb-item " aria-current="page">
                <button className='btn btn-link pl-0 pr-0'
                        onClick={() => this.handleClickPath()}>{this.props.pathEl}</button>
            </li>
        );
    }
}

const mapStateToProps = state => {
    return ({
        token: getToken(state),
        currentPath: getPath(state)
    })
};

export default connect(mapStateToProps)(Path);
