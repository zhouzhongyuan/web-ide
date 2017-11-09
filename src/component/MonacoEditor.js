import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { connect } from 'react-redux';

class MonacoEditorWrap extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.editorDidMount = this.editorDidMount.bind(this);
    }
    /* eslint-disable  */
    editorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);
        editor.focus();
    }
    onChange(newValue, e) {
        this.props.changeCurrentCode(newValue, this.props.currentPath);
    }

    render() {
        console.log('monacoEditor render');
        const code = this.props.pathContent;
        const options = {
            selectOnLineNumbers: true,
        };
        return (
        <MonacoEditor
            width="100%"
            // height="600"
            language="javascript"
            // theme="vs-dark"
            value={code}
            options={options}
            onChange={this.onChange}
            editorDidMount={this.editorDidMount}
        />
        );
    }
}
function mapStateToProps(state) {
    const app = state.get('app');
    return {
        currentPath: app.currentPath,
        pathContent: app.content[app.currentPath],
    };
}
function mapDispatchToProps(dispatch) {
    return {
        changeCurrentCode: (content, path) => dispatch({
            type: 'FILE_CONTENT_CHANGE',
            path,
            content,
        }),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MonacoEditorWrap);
