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
            selectAndFocus: false,
        };
    }
    handleRequestClose = () => {
        this.props.handleModalClose(this.props.type);
    };
    handleRequestSubmit = () => {
        const { path } = this.props;
        const relativePath = `${path.slice(0, path.lastIndexOf('#'))}#${this.state.textValue}`;
        this.props.handleModalSubmit(this.props.type, this.props.path, relativePath);
        this.handleRequestClose();
    };
    handleTextChange = (e) => {
        this.setState({
            textValue: e.target.value,
            selectAndFocus: false,
        });
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.open && this.props.open !== nextProps.open) {
            this.setState({
                selectAndFocus: true,
                textValue: nextProps.path,
            });
        }
    }
    componentDidUpdate() {
        this.selectAndFocusInput();
    }
    selectAndFocusInput = () => {
        if (this.nameInput && this.state.selectAndFocus) {
            this.nameInput.select();
            this.nameInput.focus();
        }
    }
    render() {
        const { textValue } = this.state;
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
                            请输入新的billform名称
                        </DialogContentText>
                        <TextField
                            value={textValue.slice(textValue.lastIndexOf('#') + 1)}
                            margin="dense"
                            id="name"
                            type="text"
                            fullWidth
                            onChange={this.handleTextChange}
                            inputRef={(input) => { this.nameInput = input; }}
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
