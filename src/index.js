import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import 'normalize.css';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware, ConnectedRouter } from 'react-router-redux';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./icon.png';
import App from './App';
import webIDEApp from './reducer';

import createHistory from 'history/createBrowserHistory';

const history = createHistory();

const routerMW = routerMiddleware(history);

const theme = createMuiTheme();
/* eslint-disable no-underscore-dangle */
const store = createStore(
    combineReducers({
        app: webIDEApp,
        router: routerReducer,
    }),
    applyMiddleware(routerMW),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider
                theme={theme}
            >
                <App />
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
