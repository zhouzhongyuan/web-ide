import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
} from 'material-ui/Dialog';

export default class AddDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: '',
        };
    }
    handleRequestClose = () => {
        this.setState({
            textValue: '',
        });
        this.props.handleModalClose(this.props.type);
    };
    handleRequestSubmit = () => {
        const { path } = this.props;
        const relativePath = `${path.slice(0, path.lastIndexOf('#') === -1 ? path.length : path.lastIndexOf('#') )}#${this.state.textValue}`;
        this.props.handleModalSubmit(this.props.type, relativePath);
        this.handleRequestClose();
    };
    handleTextChange = (e) => {
        this.setState({
            textValue: e.target.value,
        });
    };
    handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            this.handleRequestSubmit();
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
                            请输入billform名称
                        </DialogContentText>
                        <TextField
                            value={this.state.textValue}
                            autoFocus
                            margin="dense"
                            id="name"
                            type="text"
                            fullWidth
                            onChange={this.handleTextChange}
                            onKeyUp={this.handleKeyUp}

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
