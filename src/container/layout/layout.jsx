import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FETCH_RESOURCES_REQUEST} from './../../ActionType'
import {getToken, getData, getPath} from './../../selectors/selectors'


class Layout extends Component {

    componentDidMount() {
        if (this.props.token) {
            const {dispatch} = this.props;
            dispatch({type: FETCH_RESOURCES_REQUEST, payload: this.props.location.pathname});
        }
    }


    componentDidUpdate(prevProps) {
        if (this.location) {
            if (this.props.token && prevProps.location.pathname !== '/'
                && prevProps.location.pathname !== this.location.pathname) {
                const {dispatch} = this.props;
                dispatch({type: FETCH_RESOURCES_REQUEST, payload: this.props.location.pathname});
            }
        }
    }

    handleckickBack() {
        let newpathback = this.props.currentPath;
        newpathback.pop();
        newpathback.shift();
        let newStrPath = newpathback.join('');
        this.props.history.push(newStrPath);
    }

    handleclickfolder(type, name) {
        if (type === 'dir') {
            let newpath = this.props.currentPath.slice();
            newpath.shift();
            newpath.push(name);
            let newStrPath = newpath.join('/');
            this.props.history.push(newStrPath);
        }
    }

    render() {
        return (
            <div className="container">

                <header className="App-header bd-highlight">
                    {this.props.data.items ?
                        <ul className="list-group list-group-flush ">
                            {this.props.currentPath.length > 1 ? <li className="list-group-item app_li"
                                                                     onClick={() => this.handleckickBack()}>...</li> : null}
                            {this.props.data.items.map(item => <li className="list-group-item app_li"
                                                                   onClick={() => this.handleclickfolder(item.type, item.name)}
                                                                   key={item.resource_id}>{item.name}</li>)}
                        </ul>
                        : null}
                </header>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return ({
        token: getToken(state),
        data: getData(state),
        currentPath: getPath(state)
    })
};

export default connect(mapStateToProps, null)(Layout);

