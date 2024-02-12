import React from 'react';

import './ModelFooter.css'

const ModelFooter = ({ children }) => {
    return (
        <div className='result-model-footer'>
            {children}
            <div className='stats'>
                <div className='stat-entry'>
                    <h2>Score</h2>
                    <h1><span className='green-stat'>0.0</span>/5</h1>
                </div>
                <div className='stat-entry'>
                    <h2>Uses</h2>
                    <h1 className='green-stat'>1,000+</h1>
                </div>
            </div>
        </div>
    );
}

export default ModelFooter;