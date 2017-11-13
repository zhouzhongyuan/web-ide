import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import deepOrange from 'material-ui/colors/deepOrange';

import AddDropDownMenu from '../DropDownMenu';

const styleSheet = createStyleSheet({
    root: {
        width: '100%',
        marginBottom: 24,
    },
    flex: {
        flex: 1,
    },
    avatar: {
        margin: 8,
    },
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
    loginContainer: {
        display: 'flex',
        flexDirection: 'row',
        alginItems: 'center',
    },
});

class ButtonAppBar extends Component {
    static defaultProps = {
        ...Component.defaultProps,
        isLogin: false,
    }
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout() {
        this.props.handleLogout();
    }
    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        {/*<IconButton color="contrast" aria-label="Menu">*/}
                            {/*<MenuIcon />*/}
                        {/*</IconButton>*/}
                        <Typography type="title" color="inherit" className={classes.flex}>
                            Web Editor
                        </Typography>
                        {/*{this.props.isLogin ?*/}
                            {/*<div className={classes.loginContainer}>*/}
                                {/*<AddDropDownMenu />*/}
                                {/*<Avatar className={classes.orangeAvatar}>*/}
                                    {/*{this.props.userName.charAt(0).toUpperCase()}*/}
                                {/*</Avatar>*/}
                                {/*<Button*/}
                                    {/*color="contrast"*/}
                                    {/*onClick={this.handleLogout}*/}
                                {/*>*/}
                                    {/*退出*/}
                                {/*</Button>*/}
                            {/*</div>*/}
                             {/*:*/}
                            {/*<Link to="/login"> <Button color="contrast">登录</Button></Link>*/}
                        {/*}*/}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

ButtonAppBar.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
    }).isRequired,
    handleLogout: PropTypes.func,
    isLogin: PropTypes.bool,
    userName: PropTypes.string,
};

function mapStateToProps(state) {
    const app = state.get('app');
    return {
        isLogin: !!app.user.name,
        userName: app.user.name,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        handleLogout: () => {
            dispatch({ type: 'USER_LOGOUT' });
        },
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(ButtonAppBar));
