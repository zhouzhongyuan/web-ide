import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card from 'material-ui/Card';
import Icon from 'material-ui/Icon';

const styleSheet = createStyleSheet(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 370,
        paddingTop: 48,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 36,
    },
    loginButton: {
        marginTop: 32,
    },
}));

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }
    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    handleSubmit() {
        const name = this.state.name;
        const password = this.state.password;
        console.log(name, password);
        // TODO checkLogin action
        // Fake login
        document.cookie = `name=${name}`;
    }
    render() {
        const classes = this.props.classes;
        return (

            <Card className={classes.container}>
                <Icon color="primary" style={{ fontSize: 36 }}>
                    account_circle
                </Icon>
                <TextField
                    id="name"
                    label="用户名"
                    value={this.state.name}
                    onChange={this.handleChangeName}
                    margin="normal"
                />
                <TextField
                    id="password"
                    label="密码"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChangePassword}
                    margin="normal"
                />
                <Button
                    raised
                    color="primary"
                    className={classes.loginButton}
                    onClick={this.handleSubmit}
                >
                    登录
                </Button>

            </Card>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styleSheet)(LoginPage);
