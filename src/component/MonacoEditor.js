import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { connect } from 'react-redux';
import config from '../config';

const { server } = config;

const leftWidth = 246;
const rightWidth = 467;

class MonacoEditorWrap extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.editorDidMount = this.editorDidMount.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.state = {
            width: '100%',
        };
    }
    /* eslint-disable  */
    editorDidMount(editor, monaco) {
        this.editor = editor;
        editor.focus();
    }
    onChange(newValue, e) {
        this.props.changeCurrentContent(newValue, this.props.currentPath);
    }
    handleResize(e,f){
        this.setState({
            width: window.innerWidth - leftWidth - rightWidth,
        });
        this.editor.layout();
    }
    componentDidMount(){
        window.addEventListener('resize', this.handleResize);
    }
    async componentDidUpdate(){

        const {pathContent, currentPath, changeCurrentContent} = this.props;

        if(!pathContent){

            const currentPathArr = currentPath.split('#');
            const path = currentPathArr[0];
            const childPath = currentPathArr[1] || '';
            let queryString = `path=${path}&childPath=${childPath}`;

            const remotePath = `${server}/file?${queryString}`;
            const response = await fetch(remotePath);
            const code = await response.json();
            if (code.success) {
                if(Object.prototype.toString.call(code.content) === '[object Object]'){
                    code.content = JSON.stringify(code.content, null, 4);
                }
                changeCurrentContent(code.content, currentPath);
            } else {
                console.log(`get ${currentPath}'s content error`);
            }
        }
    }

    render() {

        const { pathContent, currentPath } = this.props;
        const { width } = this.state;
        const options = {
            selectOnLineNumbers: true,
        };
        const path = currentPath.split('#')[0];
        const language = path.slice(path.lastIndexOf('.') + 1) || 'javascript';
        return (
        <MonacoEditor
            width={width}
            language={language}
            value={pathContent}
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
        changeCurrentContent: (content, path) => dispatch({
            type: 'FILE_CONTENT_CHANGE',
            path,
            content,
        }),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MonacoEditorWrap);
