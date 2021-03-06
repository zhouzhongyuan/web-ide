import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import 'normalize.css';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import thunk from 'redux-thunk';
import { HashRouter } from 'react-router-dom';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import createHistory from 'history/createBrowserHistory';
import '!file-loader?name=[name].[ext]!./icon.png'; // eslint-disable-line
import createReducer from './reducer';
import App from './App';

const history = createHistory();

const routerMW = routerMiddleware(history);
const middleware = [routerMW, thunk];

const theme = createMuiTheme();
/* eslint-disable no-underscore-dangle */
const store = createStore(
    createReducer(),
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
);

/* eslint-enable */

function render(Component) {
    ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider
                theme={theme}
            >
                <ConnectedRouter history={history}>
                    <HashRouter>
                        <Component />
                    </HashRouter>
                </ConnectedRouter>
            </MuiThemeProvider>
        </Provider>,
        document.getElementById('root'),
    );
}

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./App', () => { render(App); });
}
