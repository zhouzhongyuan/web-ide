import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';

class MonacoEditorWrap extends Component {
    constructor(props) {
        super(props);
        this.state = {
        code: '// type your code...',
        };
        this.onChange = this.onChange.bind(this);
        this.editorDidMount = this.editorDidMount.bind(this);
    }
    /* eslint-disable  */
    editorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);
        editor.focus();
    }
    onChange(newValue, e) {
        console.log('onChange', newValue, e);
    }
    /* eslint-enable  */

    render() {
        const code = this.state.code;
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
export default MonacoEditorWrap;
