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
        const code = this.props.content[this.props.currentPath];
        const options = {
            selectOnLineNumbers: true,
        };
        return (
        <MonacoEditor
            width="800"
            height="600"
            language="javascript"
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
        content: app.content,
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
