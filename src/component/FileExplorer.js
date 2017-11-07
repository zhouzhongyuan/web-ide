import React from 'react';
import TreeView from 'react-treeview';
import { connect } from 'react-redux';

require('../../node_modules/react-treeview/react-treeview.css');

class Lists extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsedBookkeeping: this.props.fileTree.map(() => false),
        };
        this.handleClick = this.handleClick.bind(this);
        this.collapseAll = this.collapseAll.bind(this);
        this.changeCurrentPath = this.changeCurrentPath.bind(this);
    }

    handleClick(i) {
        const [...collapsedBookkeeping] = this.state.collapsedBookkeeping;
        collapsedBookkeeping[i] = !collapsedBookkeeping[i];
        this.setState({ collapsedBookkeeping });
    }

    collapseAll() {
        this.setState({
            collapsedBookkeeping: this.state.collapsedBookkeeping.map(() => true),
        });
    }

    changeCurrentPath(path) {
        this.props.changeCurrentPath(path, this.props.content);
    }

    async componentDidMount() {
        // get fileTree
        const path = 'http://127.0.0.1:3000/fileTree';
        console.log(path);
        const response = await fetch(path);
        const fileTree = await response.json();
        console.log(fileTree);
        this.props.changeFileTree(fileTree);
    }
    render() {
        const collapsedBookkeeping = this.state.collapsedBookkeeping;
        return (
            <div>
                {this.props.fileTree.map((node, i) => (
                        <TreeView
                            key={i}
                            collapsed={collapsedBookkeeping[i]}
                            onClick={this.handleClick.bind(null, i)}
                        >
                            {node.map(entry =>
                                (<div
                                className="info"
                                key={entry}
                                onClick={() => this.changeCurrentPath(entry)}
                                >
                                    {entry}
                                </div>))}
                        </TreeView>
                    ))}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const app = state.get('app');
    return {
        currentPath: app.currentPath,
        fileTree: [app.fileTree],
        content: app.content,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        changeCurrentPath: (path, content) => {
            async function getContentOfPath() {
                // 如果store中已经有了content，不向后台请求。
                if (content[path]) {
                    return;
                }

                const remotePath = `http://127.0.0.1:3000/file?path=${path}`;
                const response = await fetch(remotePath);
                const code = await response.json();
                if (code.success) {
                    dispatch({
                        type: 'FILE_CONTENT_CHANGE',
                        path,
                        content: code.content,
                    });
                }
            }
            setTimeout(getContentOfPath, 0);
            return dispatch({
                type: 'CURRENT_PATH_CHANGE',
                path,
            });
        },
        changeFileTree: fileTree => dispatch({
            type: 'FILE_TREE_CHANGE',
            fileTree,
        }),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Lists);
