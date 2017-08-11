import React, { Component } from 'react';
import FileExplorer from './component/FileExplorer';
import MonacoEditor from './component/MonacoEditor';
import AppBar from './component/AppBar';

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
            default:
        }
    }
    render() {
        return (
            <div className="App">
                <AppBar />
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
            </div>
        );
    }
}

export default App;
