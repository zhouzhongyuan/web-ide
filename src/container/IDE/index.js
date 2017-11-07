import React, { Component } from 'react';
import FileExplorer from '../../component/FileExplorer';
import MonacoEditor from '../../component/MonacoEditor';
import Preview from '../../component/Preview';
import MonacoEditorButton from '../../component/MonacoEditorButton';


class IDE extends Component {

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                }}
            >
                {/* <Preview /> */}
                <FileExplorer />
                <div
                    style={{
                        textAlign: 'left',
                        border: '1px solid grey',
                    }}
                >
                    <MonacoEditor />
                    <MonacoEditorButton />
                </div>

            </div>
        );
    }
}

export default IDE;
