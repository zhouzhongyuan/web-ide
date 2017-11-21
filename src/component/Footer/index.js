import React, { Component } from 'react';

class ButtonAppBar extends Component {
    render() {
        return (
            <div
                style={{
                    height: 100,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                &copy; Boke app team
            </div>
        );
    }
}

export default ButtonAppBar;
