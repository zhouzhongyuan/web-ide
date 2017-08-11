import React, { Component } from 'react';
import FileExplorer from '../../component/FileExplorer';
import MonacoEditor from '../../component/MonacoEditor';

class IDE extends Component {
    render() {
        return (
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
        );
    }
}

export default IDE;
