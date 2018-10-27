import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {getToken, getPath} from './../../selectors/selectors';

class Path extends PureComponent {
//меняем путь роута при нажатии на ссылку в хлебныхкрошках
    handleClickPath() {
        if (this.props.pathEl !== this.props.history.location.pathname.substr(1).split('/')[this.props.history.location.pathname.substr(1).split('/').length - 1]) {
            let poz = this.props.history.location.pathname.substr(1).split('/').indexOf(this.props.pathEl);
            if (poz === -1) {
                this.props.history.push('/');
            } else {
                let nexPath = '/' + this.props.history.location.pathname.substr(1).split('/').slice(0, poz + 1).join('/');
                this.props.history.push(nexPath);
            }
        }
    }

    render() {
        return (
            <li className='breadcrumb-item ' aria-current='page'>
                <button className='btn btn-link pl-0 pr-0'
                        onClick={() => this.handleClickPath()}>
                    {this.props.pathEl}</button>
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
