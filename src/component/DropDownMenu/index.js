import React, { Component } from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import Icon from 'material-ui/Icon';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const styleSheet = createStyleSheet({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    addContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    addDropDownIcon: {
        marginLeft: '-10px',
    },
});
class AddDropDownMenu extends Component {
    state = {
        anchorEl: undefined,
        open: false,
    };

    handleClick = (event) => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <div
                    className={classes.addContainer}
                    onClick={this.handleClick}
                    role="button"
                    tabIndex="0"
                >
                    <Icon >add</Icon>
                    <Icon
                        className={classes.addDropDownIcon}
                    >arrow_drop_down</Icon>
                </div>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    <MenuItem><Link to="/project/new">创建项目</Link></MenuItem>
                    <MenuItem><Link to="/task/new">创建任务</Link></MenuItem>
                </Menu>
            </div>
        );
    }
}
AddDropDownMenu.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
    }).isRequired,
};
export default withStyles(styleSheet)(AddDropDownMenu);
