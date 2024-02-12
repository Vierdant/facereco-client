import React from 'react';

import './ResultDisplayTip.css'

const ResultDisplayTip = ({ imageURL, boundingBoxes, onProcessRequest, tipContent, displayIndex }) => {
    return (
        <div id='display-container' className={'result'}>
            <div className='relative'>
                <img id='display-image' src={imageURL} alt='' onLoad={onProcessRequest} />
                {boundingBoxes &&
                    boundingBoxes.map((box, i) => (
                        <div key={i} id={'box' + i} className='boundingBox tooltip' style= {{
                                top: box.topRow, 
                                right: box.rightCol, 
                                bottom: box.bottomRow,
                                left: box.leftCol
                            }}>
                                <div key={i} className='right-tooltip'>
                                    <h2>{(displayIndex ? (i + 1) + ' - ' : '') + tipContent[i]}</h2>
                                    <i></i>
                                </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ResultDisplayTip;