import React, { Component } from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import Icon from 'material-ui/Icon';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import deivceAndroidBgImage from './devices-sprite.jpg';
import config from '../../config';

const { previewURL } = config;
console.log(config);
const styleSheet = createStyleSheet({
    root: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 467,
        height: 800,
        // background: center top no-repeat url(/img/devices-sprite.jpg);

        backgroundPositionX: '50%',
        backgroundPositionY: '50%',
        backgroundSize: 467,
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${deivceAndroidBgImage})`,
        display: 'flex',
        position: 'relative',
    },
    frame:{
        width: 360,
        height: 590,
        position: 'absolute',
        top: 68,
    },
    addContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    addDropDownIcon: {
        marginLeft: '-10px',
    },
});
class Preview extends Component {

    render() {
        const classes = this.props.classes;
        return (
            <div
                className={classes.root}
            >
                <iframe
                    className={classes.frame}
                    id="demo-ios"
                    src={previewURL}
                    frameBorder="0"
                    title="demoDevice"
                />
            </div>
        );
    }
}
Preview.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
    }).isRequired,
};
export default withStyles(styleSheet)(Preview);
