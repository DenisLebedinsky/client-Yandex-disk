import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {getToken, getPath} from "./../../selectors/selectors";

class Path extends Component {
//меняем путь роута при нажатии на ссылку в хлебныхкрошках
    handleClickPath() {
        if (this.props.pathEl !== this.props.currentPath[this.props.currentPath.length - 1]) {
            let poz = this.props.currentPath.indexOf(this.props.pathEl);
            let nexPath = '/' + this.props.currentPath.slice(1, poz + 1).join('/');
            this.props.history.push(nexPath);
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

export default withRouter(connect(mapStateToProps)(Path));
