import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card from 'material-ui/Card';

const styleSheet = createStyleSheet({
    container: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 700,
        paddingTop: 48,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 36,
    },
    loginButton: {
        marginTop: 32,
    },
    ownerAndNameGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 58,
    },
    ownerGroup: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: 7,
        boxSizing: 'border-box',
    },
    projectNameGroup: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    slash: {
        display: 'block',
        marginLeft: 8,
        marginRight: 8,
        paddingBottom: 7,
    },
    ownerGroupKey: {
        fontWeight: 'bold',
    },
});

class LoginPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            projectDescription: '',
            disableCreateButton: true,
        };
        this.handleChangeProjectName = this.handleChangeProjectName.bind(this);
        this.handleProjectNameKeyUp = this.handleProjectNameKeyUp.bind(this);
        this.handleChangeProjectDescription = this.handleChangeProjectDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeProjectName(event) {
        this.setState({ projectName: event.target.value });
    }
    handleProjectNameKeyUp(e) {
        const v = e.target.value;
        let valid = v.length >= 1 && /^[A-z]+$/.test(v);
        valid = !!valid;
        // TODO check if project name is valid,
        // TODO check if project name is duplicated, to server
        this.setState({
            disableCreateButton: !valid,
        });
    }
    handleChangeProjectDescription(event) {
        this.setState({ projectDescription: event.target.value });
    }

    handleSubmit() {
        /*eslint-disable*/
        const { projectName, projectDescription } = this.state;
        console.log(projectName, projectDescription);
        // TODO, save it to server
        /*eslint-enable*/
    }

    render() {
        const classes = this.props.classes;
        return (
            <Card className={classes.container}>
                <div className={classes.ownerAndNameGroup}>
                    <div className={classes.ownerGroup}>
                        <div className={classes.ownerGroupKey}>用户</div>
                        <div className={classes.ownerGroupValue}>zhongyuan</div>
                    </div>
                    <span className={classes.slash}>/</span>
                    <div className={classes.projectNameGroup}>
                        <div className={classes.ownerGroupKey}>
                            <label
                                htmlFor="projectName"
                            >
                                项目名
                            </label>
                        </div>
                        <TextField
                            style={{
                                marginTop: 0,
                                marginBottom: 0,
                            }}
                            autoFocus
                            id="projectName"
                            value={this.state.projectName}
                            onChange={this.handleChangeProjectName}
                            margin="normal"
                            onKeyUp={this.handleProjectNameKeyUp}
                        />
                    </div>
                </div>
                <p>{'项目名称必须为英文字母，不可包含汉字、数字、特殊字符。例如，国资委:"gzw",紫江: "zijiang"。'}</p>
                <div>
                    <div className={classes.ownerGroupKey} ><label htmlFor="projectDescription">简介(可选)</label></div>
                    <TextField
                        id="projectDescription"
                        type="text"
                        value={this.state.projectDescription}
                        onChange={this.handleChangeProjectDescription}
                        margin="normal"
                        fullWidth
                    />
                </div>

                <Button
                    raised
                    color="primary"
                    className={classes.loginButton}
                    onClick={this.handleSubmit}
                    disabled={this.state.disableCreateButton}
                >
                    创建项目
                </Button>

            </Card>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.shape({
        container: PropTypes.string,
    }).isRequired,
};
export default withStyles(styleSheet)(LoginPage);
