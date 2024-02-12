import React from 'react';

import './SecondaryButton.css'

const SecondaryButton = ({ style, children, click }) => {
    return (
        <div style={{ display: 'inherit'}}>
            <button className="secondary-button" style={style} onClick={click}>{children}</button>
        </div>
    );
}

export default SecondaryButton;