import React from 'react';
import Divider from 'material-ui/Divider';

class VerticalDivider extends React.Component {
    render() {
        return (
            <div
                style={{
                    height: '100%%',
                }}
            >
                <Divider
                    style={{
                        height: '100%',
                        width: 1,
                        display: 'block',
                    }}
                />
            </div>
        );
    }
}

export default VerticalDivider;
