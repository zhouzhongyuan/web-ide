import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
const theme = createMuiTheme();
ReactDOM.render(
    <MuiThemeProvider
        theme={theme}
    >
        <App />
    </MuiThemeProvider>,
    document.getElementById('root'),
);
