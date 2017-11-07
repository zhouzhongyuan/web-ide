import React, { Component } from 'react';
import FileExplorer from '../../component/FileExplorer';
import MonacoEditor from '../../component/MonacoEditor';
import Preview from '../../component/Preview';
import MonacoEditorButton from '../../component/MonacoEditorButton';
import VerticalDivider from '../../component/VerticalDivider';

class IDE extends Component {
    render() {
        return (
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    paddingLeft: 24,
                    marginRight: 24,
                }}
            >
                <FileExplorer />
                <VerticalDivider />
                <div
                    style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                    }}
                >
                    <MonacoEditorButton />
                    <MonacoEditor />
                </div>
                <VerticalDivider />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Preview />
                </div>
            </div>
        );
    }
}

export default IDE;
