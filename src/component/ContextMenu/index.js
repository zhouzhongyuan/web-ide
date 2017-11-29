import React, { Component } from 'react';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { ContextMenu as ContextMenuOL } from 'react-contextmenu';
import AddDialog from './AddDialog';
import DeleteDialog from './DeleteDialog';
import RenameDialog from './RenameDialog';
import { addFile as addFileAction, deleteFile as deleteFileAction, renameFile as renameFileAction, changeCurrentPath } from '../../action';
import 'react-contextmenu/public/styles.css';
class ContextMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addDialogOpen: false,
            deleteDialogOpen: false,
            renameDialogOpen: false,
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
                this.setState({
                    deleteDialogOpen: true,
                });
                break;
            case 'rename':
                this.setState({
                    renameDialogOpen: true,
                });
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
    handleModalSubmit(menuType, path, newPath) {
        switch (menuType) {
            case 'add':
                this.props.addFile(path);
                break;
            case 'delete':
                this.props.deleteFile(path);
                break;
            case 'rename':
                this.props.renameFile(path, newPath);
                break;
            default:
        }
    }
    render() {
        return (

            <ContextMenuOL
                hideOnLeave
                style={{
                    position: 'absolute',
                    zIndex: 9999,
                }}
                id={this.props.id}
                collect={props => props}
                onShow={this.handleModalShow}
            >
                <List
                    style={{
                        zIndex: 999,
                    }}
                >
                    {this.props.menuList.map(menu => (
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
                <DeleteDialog
                    type="delete"
                    open={this.state.deleteDialogOpen}
                    handleModalClose={this.handleModalClose}
                    handleModalSubmit={this.handleModalSubmit}
                    path={this.state.path}
                />
                <RenameDialog
                    type="rename"
                    open={this.state.renameDialogOpen}
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
        changeCurrentPath: path => dispatch(changeCurrentPath(path)),
        changeFileTree: fileTree => dispatch({
            type: 'FILE_TREE_CHANGE',
            fileTree,
        }),
        addFile: path => dispatch(addFileAction(path)),
        deleteFile: path => dispatch(deleteFileAction(path)),
        renameFile: (path, newPath) => dispatch(renameFileAction(path, newPath)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
