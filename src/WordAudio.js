import React, { Component } from 'react';

class WordAudio extends Component {
    constructor(props) {
        super(props);
        // this.speak = this.speak.bind(this);
        this.state = {
            phonetic: '',
        };
    }
    async componentDidUpdate(prevProps, prevState) {
        console.log(this.refs.vidRef);
        this.refs.vidRef.load();
        this.refs.vidRef.play();
    }
    render() {
        return (
                <video
                    ref="vidRef"
                    width={0}
                    height={0}
                    controls=""
                    name="media"
                    autoPlay
                >
                    <source src={this.props.audioSrc} type="audio/mpeg" />
                </video>
        );
    }
}

export default WordAudio;
