import React from 'react';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
class MonacoEditorButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }
    async handleSave() {
        const code = this.props.content[this.props.currentPath];

        const path = 'http://127.0.0.1:3000/file';
        const response = await fetch(path, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                path: this.props.currentPath,
                code,
            }),
        });
        const result = await response.text();
        console.log(result);
    }

    render() {
        return (
            <Button
                raised
                color="primary"
                onClick={this.handleSave}
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
