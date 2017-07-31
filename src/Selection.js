import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const styleSheet = createStyleSheet('Checkboxes', theme => ({
    root: {
        width: '100%',
        maxWidth: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
        background: theme.palette.background.paper,
    },
}));
class Checkboxes extends Component {

    handleChange = name => (event, checked) => {
        this.props.changeState(name, checked);
    };

    render() {
        const { classes } = this.props;

        return (
            <FormGroup
                row
                style={{
                    maxWidth: 800,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    background: green,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.props.hasChinese}
                            onChange={this.handleChange('hasChinese')}
                            value="hasChinese"
                        />
                    }
                    label="翻译"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.props.hasPhonetic}
                            onChange={this.handleChange('hasPhonetic')}
                            value="hasPhonetic"
                        />
                    }
                    label="音标"
                />

            </FormGroup>
        );
    }
}

Checkboxes.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Checkboxes);
