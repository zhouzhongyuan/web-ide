import React from 'react';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText } from 'material-ui/List';
import config from '../config';

const { server } = config;
class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.changeCurrentPath = this.changeCurrentPath.bind(this);
    }

    changeCurrentPath(path, i) {
        this.setState({
            selectedIndex: i,
        });
        this.props.changeCurrentPath(path, this.props.pathContent);
    }

    async componentDidMount() {
        // get fileTree
        const path = `${server}/fileTree`;
        const response = await fetch(path);
        const fileTree = await response.json();
        this.props.changeFileTree(fileTree);
    }
    render() {
        return (
            <List
                style={{
                    width: 246,
                    maxWidth: 246,
                }}

            >
                {this.props.fileTree.map((node, i) => (
                        <ListItem
                            key={i}
                            onClick={() => this.changeCurrentPath(node, i)}
                            button
                            style={this.state.selectedIndex === i ? { backgroundColor: 'rgba(0,0,0,0.2)' } : {}}
                        >
                            <ListItemText
                                primary={node}
                            />
                        </ListItem>
                    ))
                }
            </List>
        );
    }
}

function mapStateToProps(state) {
    const app = state.get('app');
    return {
        currentPath: app.currentPath,
        fileTree: app.fileTree,
        pathContent: app.content[app.currentPath],

    };
}
function mapDispatchToProps(dispatch) {
    return {
        changeCurrentPath: (path, pathContent) => dispatch({
                type: 'CURRENT_PATH_CHANGE',
                path,
                pathContent,
            }),
        changeFileTree: fileTree => dispatch({
            type: 'FILE_TREE_CHANGE',
            fileTree,
        }),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Lists);
