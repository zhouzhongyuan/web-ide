import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const styleSheet = createStyleSheet({
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
});

class LoginPage extends PureComponent {
    static defaultProps = {
        redirectToReferrer: false,
    }
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
        const password = this.state.password; // eslint-disable-line
        // TODO checkLogin action
        const user = { name };
        // Fake login
        document.cookie = `name=${name}`;
        this.props.onFetchUserSuccess(user);
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        if (this.props.redirectToReferrer) {
            return (
                <Redirect to={from} />
            );
        }
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
    classes: PropTypes.shape({
        container: PropTypes.string,
    }).isRequired,
    onFetchUserSuccess: PropTypes.func.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string,
        search: PropTypes.string,
        hash: PropTypes.string,
        key: PropTypes.string,
    }).isRequired,
    redirectToReferrer: PropTypes.bool,
};
const mapStateToProps = (state) => {
    const JSState = state.toJS();
    return ({
    location: JSState.route.location,
    redirectToReferrer: !!JSState.app.user.name,
});
};
const mapDispatchToProps = dispatch => ({
    onFetchUserSuccess: (user) => {
        dispatch({ type: 'USER_FETCH_SUCCEEDED', user });
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(LoginPage));
// export default withRouter(
//     connect(mapStateToProps, mapDispatchToProps)(
//         withStyles(styleSheet)(LoginPage)
//     ));
