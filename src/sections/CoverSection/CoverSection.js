import React from 'react';

import cover from '../../assets/cover.svg'
import './CoverSection.css'



const CoverSection = ({ handleButtonClick }) => {

    return (
        <section className='cover'>
            <div className='text-container'>
                <h2>Face Detection</h2>
                <h3>Technology</h3>
                <p>Renowned for its unparalleled efficiency and accuracy</p>
                <button onClick={handleButtonClick}>Try it now</button>
            </div>
            <img src={cover} alt='cover'/>
            
        </section>
    );
}

export default CoverSection;