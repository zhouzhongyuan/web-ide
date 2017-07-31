import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { MuiThemeProvider } from 'material-ui/styles';
import List from './List';
import Selection from './Selection';
import { createMuiTheme } from 'material-ui/styles';

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
        console.log(this.state);
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>兰兰</h2>
                </div>
                <p className="App-intro">
                    加油！
                </p>
                <MuiThemeProvider
                    theme={theme}
                >
                    <div>
                        <Selection
                            hasChinese={this.state.hasChinese}
                            hasPhonetic={this.state.hasPhonetic}
                            hasSpeaker={this.state.hasSpeaker}
                            changeState={this.changeState}
                        />
                        <List
                            hasChinese={this.state.hasChinese}
                            hasPhonetic={this.state.hasPhonetic}
                            hasSpeaker={this.state.hasSpeaker}
                        />
                    </div>

                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
