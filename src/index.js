import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import 'normalize.css';
import App from './App';

const theme = createMuiTheme();
ReactDOM.render(
    <MuiThemeProvider
        theme={theme}
    >
        <App />
    </MuiThemeProvider>,
    document.getElementById('root'),
);
