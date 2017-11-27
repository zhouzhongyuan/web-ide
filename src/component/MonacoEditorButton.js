import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import config from '../config';

const { server } = config;
class MonacoEditorButton extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }
    async handleSave() {
        const code = this.props.content[this.props.currentPath];

        const path = `${server}/file`;
        const response = await fetch(path, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                path: this.props.currentPath,
                code,
            }),
        });
        const result = await response.text();
        // TODO SHOW_NOTIFICATION_WITH_TIMEOUT
    }

    render() {
        return (
            <Button
                raised
                color="primary"
                onClick={this.handleSave}
                style={{
                    alignSelf: 'flex-end',
                    marginBottom: 24,
                }}
            >
                保存
            </Button>
        );
    }
}

function mapStateToProps(state) {
    const app = state.get('app');
    return {
        currentPath: app.currentPath,
        content: app.content,
    };
}
export default connect(mapStateToProps)(MonacoEditorButton);
