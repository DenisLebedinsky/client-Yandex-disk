import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import './bootstrap.min.css'
import './index.css';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers/reducer';
import mySaga from './saga/saga';
import NavBar from './component/navbar/NavBar';
import App from './container/App';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
));
sagaMiddleware.run(mySaga);


ReactDOM.render(
  <Provider store={store}>
    <Router>
        <NavBar>
      <App/>
        </NavBar>
    </Router>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
