import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
} from 'material-ui/Dialog';

export default class DeleteDialog extends Component {
    constructor(props) {
        super(props);
    }
    handleRequestClose = () => {
        this.props.handleModalClose(this.props.type);
    };
    handleRequestSubmit = () => {
        // handle path
        this.props.handleModalSubmit(this.props.type, this.props.path);
        this.handleRequestClose();
    };
    render() {
        const { path } = this.props;
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
                            {`确定删除${path.slice(path.lastIndexOf('#') + 1)}？`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.handleRequestSubmit} color="primary">
                            确定
                        </Button>
                    </DialogActions>
                </Dialog>
        );
    }
}
