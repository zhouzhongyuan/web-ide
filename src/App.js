import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import logo from './logo.svg';
import './App.css';
import FileExplorer from './FileExplorer';
import MonacoEditor from './MonacoEditor';
import AppBar from './component/AppBar';
const theme = createMuiTheme({
    status: {
        danger: 'orange',
    },
});
class App extends Component {
    constructor(props) {
        super(props);
        this.changeState = this.changeState.bind(this);
        this.state = {
            hasChinese: false,
            hasPhonetic: false,
            hasSpeaker: false,
        };
    }
    changeState(key, value) {
        console.log(key, value);
        switch (key) {
            case 'hasChinese':
                this.setState({ hasChinese: value });
                break;
            case 'hasPhonetic':
                this.setState({ hasPhonetic: value });
                break;
            case 'hasSpeaker':
                this.setState({ hasSpeaker: value });
                break;
        }
    }
    render() {
        return (
            <div className="App">
                <AppBar />
                <MuiThemeProvider
                    theme={theme}
                >
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >
                        <FileExplorer />
                        <div
                            style={{
                                textAlign: 'left',
                                border: '1px solid grey',
                            }}
                        >
                                <MonacoEditor />
                        </div>

                    </div>

                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
