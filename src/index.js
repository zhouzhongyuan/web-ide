import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import 'normalize.css';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import createHistory from 'history/createBrowserHistory';
import '!file-loader?name=[name].[ext]!./icon.png'; // eslint-disable-line
import createReducer from './reducer';
import App from './App';


import  mySaga from "./getContentSaga";

const sagaMiddleware = createSagaMiddleware();


const history = createHistory();

const routerMW = routerMiddleware(history);

const theme = createMuiTheme();
/* eslint-disable no-underscore-dangle */
const store = createStore(
    createReducer(),
    compose(
        applyMiddleware(routerMW, sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
);

sagaMiddleware.run(mySaga);
/* eslint-enable */
ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider
            theme={theme}
        >
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'),
);
