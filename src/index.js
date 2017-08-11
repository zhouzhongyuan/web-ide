import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import 'normalize.css';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./icon.png';
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
