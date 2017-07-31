import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui-icons/Audiotrack';
import getPhonetic from './Phonetic/getPhonetic';

class ListItemCustom extends Component {
    constructor(props) {
        super(props);
        // this.speak = this.speak.bind(this);
        this.state = {
            phonetic: '',
        };
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.hasPhonetic && !this.state.phonetic) {
            const word = this.props.enWord;
            console.log(word);
            const r = await getPhonetic(word);
            const phonetic = r.basic.phonetic;
            this.setState({
                phonetic,
            });
        }
    }
    render() {
        return (
            <ListItem dense button key={this.props.enWord}>
                <ListItemText
                    primary={`${this.props.enWord}`}
                    style={{
                        textAlign: 'left',
                        maxWidth: 200,
                    }}
                />
                {this.props.hasChinese && <ListItemText
                    primary={`${this.props.value}`}
                    style={{
                        textAlign: 'left',
                        maxWidth: 200,
                    }}
                />}
                {this.props.hasPhonetic && <ListItemText
                    primary={this.state.phonetic}
                    style={{
                        textAlign: 'left',
                        maxWidth: 200,
                    }}
                />}
                <ListItemSecondaryAction>
                    <IconButton
                        aria-label="Audiotrack"
                        onClick={() => this.props.speak(this.props.enWord)}
                    >
                        <CommentIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

ListItemCustom.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default ListItemCustom;
