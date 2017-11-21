import React from 'react';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import ExpadnLess from 'material-ui-icons/ExpandLess';
import ExpadnMore from 'material-ui-icons/ExpandMore';

import config from '../config';

const { server } = config;
const styles = {
    nested: {
        paddingLeft: 30,
    },
};

class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.changeCurrentPath = this.changeCurrentPath.bind(this);
    }

    changeCurrentPath(path) {
        this.setState({
            selectedKey: path,
        });
        this.props.changeCurrentPath(path);
    }

    handleNestedClick(key) {
        this.setState({
            [key]: !this.state[key],
        });
    }

    async componentDidMount() {
        // get fileTree
        const path = `${server}/fileTree`;
        const response = await fetch(path);
        const fileTree = await response.json();
        this.props.changeFileTree(fileTree.data);
    }

    render() {
        const { fileTree } = this.props;
        const { selectedKey } = this.state;
        const itemSet = [];
        for (const key of Object.keys(fileTree)) {
            const path = fileTree[key].path;

            if (fileTree[key].children && fileTree[key].children.length > 0) {
                itemSet.push(
                    <ListItem
                        key={path}
                        onClick={() => this.handleNestedClick(`${key}Open`)}
                        button
                        style={this.state.selectedKey === path ? { backgroundColor: 'rgba(0,0,0,0.2)' } : {}}
                    >
                        <ListItemText
                            primary={key}
                        />
                        {this.state[`${key}Open`] ? <ExpadnLess /> : <ExpadnMore />}
                    </ListItem>,
                );

                itemSet.push(
                    <Collapse
                        component="li"
                        in={this.state[`${key}Open`]}

                    >
                        <List>
                            {fileTree[key].children.map(item => (
                                <ListItem
                                    key={item}
                                    onClick={() => this.changeCurrentPath(`${path}#${item}`)}
                                    button
                                    style={selectedKey === `${path}#${item}` ? Object.assign({}, styles.nested, { backgroundColor: 'rgba(0,0,0,0.2)' }) : styles.nested}
                                >
                                    <ListItemText
                                        primary={item}
                                    />
                                </ListItem>
                            ))
                            }
                        </List>
                    </Collapse>,
                );
            } else {
                itemSet.push(
                    <ListItem
                        key={path}
                        onClick={() => this.changeCurrentPath(path)}
                        button
                        style={this.state.selectedKey === path ? { backgroundColor: 'rgba(0,0,0,0.2)' } : {}}
                    >
                        <ListItemText
                            primary={key}
                        />
                    </ListItem>,
                );
            }
        }
        return (
            <List
                style={{
                    width: 246,
                    maxWidth: 246,
                    flexShrink: 0,
                    flexGrow: 0,
                }}

            >
                {itemSet}
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
        changeCurrentPath: path => dispatch({
            type: 'CURRENT_PATH_CHANGE',
            path,
        }),
        changeFileTree: fileTree => dispatch({
            type: 'FILE_TREE_CHANGE',
            fileTree,
        }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
