import React from 'react';

import './LoadingWheel.css'

const LoadingWheel = ({ size }) => {
    return (
        <div className="loader">
            <div className="loader-wheel" style={{height: size, width: size}}></div>
        </div>
    );
}

export default LoadingWheel;