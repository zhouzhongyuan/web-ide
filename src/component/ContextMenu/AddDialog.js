import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
} from 'material-ui/Dialog';

export default class FormDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: '',
        };
    }
    handleRequestClose = () => {
        this.props.handleModalClose(this.props.type);
    };
    handleRequestSubmit = () => {
        // handle path
        this.state.textValue;
        this.props.handleModalSubmit(this.props.type, this.state.textValue);
        this.handleRequestClose();
    };
    handleTextChange = (e) => {
        this.setState({
            textValue: e.target.value,
        });
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.path !== this.props.path) {
            this.setState({ textValue: nextProps.path });
        }
    }
    render() {
        return (
                <Dialog
                    open={this.props.open}
                    onRequestClose={this.handleRequestClose}
                >
                    <DialogContent
                        style={{
                            minWidth: 400,
                        }}
                    >
                        <DialogContentText>
                            请输入新文件路径
                        </DialogContentText>
                        <TextField
                            defaultValue={this.props.path}
                            value={this.state.textValue}
                            autoFocus
                            margin="dense"
                            id="name"
                            type="text"
                            fullWidth
                            onChange={this.handleTextChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.handleRequestSubmit} color="primary">
                            提交
                        </Button>
                    </DialogActions>
                </Dialog>
        );
    }
}
