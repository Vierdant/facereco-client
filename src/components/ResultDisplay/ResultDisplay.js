import React from 'react';

import './ResultDisplay.css'

const ResultDisplay = ({ imageURL, boundingBoxes, onProcessRequest }) => {
    return (
        <div id='display-container' className={'result'}>
            <div className='relative'>
                <img id='display-image' src={imageURL} alt='' onLoad={onProcessRequest} />
                {boundingBoxes &&
                    boundingBoxes.map((box, i) => (
                        <div key={i} className='boundingBox' style= {{
                                top: box.topRow, 
                                right: box.rightCol, 
                                bottom: box.bottomRow,
                                left: box.leftCol
                            }}>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ResultDisplay;