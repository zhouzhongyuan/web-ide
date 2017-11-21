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
                    width: '100%',
                    display: 'flex',
                }}
            >
                <FileExplorer />
                <VerticalDivider />
                <div
                    style={{
                        display: 'flex',
                        flexShrink: 1,
                        flexGrow: 1,
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
                        flexGrow: 0,
                        flexShrink: 0,
                    }}
                >
                    <Preview />
                </div>
            </div>
        );
    }
}

export default IDE;
