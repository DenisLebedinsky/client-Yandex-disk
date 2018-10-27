import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import auth from './auth'
import info from './info'
import data from './data'
import folder from './folderLog'
import modal from './modal'


export default combineReducers({
    routing: routerReducer,
    auth,
    info,
    data,
    folder,
    modal
})
