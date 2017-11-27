import React, { Component } from 'react';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { ContextMenu as ContextMenuOL } from 'react-contextmenu';
import AddDialog from './AddDialog';
import { addFile as addFileAction } from '../../action';

class ContextMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addDialogOpen: false,
            path: '/',
        };
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalSubmit = this.handleModalSubmit.bind(this);
    }
    handleMenuClick(menuType) {
        switch (menuType) {
            case 'add':
                this.setState({
                    addDialogOpen: true,
                });
                break;
            case 'delete':
                break;
            case 'rename':
                break;
            default:
        }
    }
    handleModalClose(type) {
        this.setState({
            [`${type}DialogOpen`]: false,
        });
    }
    handleModalShow(e) {
        this.setState({
            path: e.detail.data.path,
        });
    }
    handleModalSubmit(menuType, path) {
        switch (menuType) {
            case 'add':
                this.props.addFile(path);
                break;
            case 'delete':
                break;
            case 'rename':
                break;
            default:
        }
    }
    render() {
        const menuList = [
            {
                label: '增加',
                type: 'add',
            },
            {
                label: '删除',
                type: 'delet',
            },
            {
                label: '重命名',
                type: 'rename',
            },
        ];
        return (

            <ContextMenuOL
                id="some_unique_identifier"
                collect={props => props}
                onShow={this.handleModalShow}
            >
                <List
                    style={{
                        width: 140,
                        backgroundColor: 'grey',
                        position: 'absolute',
                        zInde: 999,
                    }}

                >
                    {menuList.map(menu => (
                        <ListItem
                            key={menu.actionType}
                            button
                            onClick={() => this.handleMenuClick(menu.type)}
                        >
                            <ListItemText
                                primary={menu.label}
                            />
                        </ListItem>
                    ))
                    }
                </List>
                <AddDialog
                    type="add"
                    open={this.state.addDialogOpen}
                    handleModalClose={this.handleModalClose}
                    handleModalSubmit={this.handleModalSubmit}
                    path={this.state.path}
                />
            </ContextMenuOL>

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
        addFile: path => dispatch(addFileAction(path)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
