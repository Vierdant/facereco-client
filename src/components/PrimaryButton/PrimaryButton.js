import React from 'react';

import './PrimaryButton.css'

const PrimaryButton = ({ style, children, click }) => {
    return (
        <div style={{ display: 'inherit' }}>
            <button className='primary-button' style={style} onClick={click}>{children}</button>
        </div>
    );
}

export default PrimaryButton;