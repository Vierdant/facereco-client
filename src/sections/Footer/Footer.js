import React from 'react';

import './Footer.css'
import github from '../../assets/github.svg'
import twitter from '../../assets/twitter.svg'
import linkedin from '../../assets/linkedin.svg'
import copyright from '../../assets/copyright.svg'

const Footer = () => {
    return (
        <footer>
            <div className='socials'>
                <a className='brand-holo' target='_blank' rel='noreferrer' href='https://github.com/Vierdant'>
                    <img src={github} alt='Github'/>
                </a>
                <a className='brand-holo' target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/yamen-khalili-9303b51b5/'>
                    <img src={linkedin} alt='LinkedIn'/>
                </a>
                <a className='brand-holo' target='_blank' rel='noreferrer' href='https://twitter.com/Vierdant1'>
                    <img src={twitter} alt='Twitter'/>
                </a>
            </div>
            <div className='copyright'>
                <p>
                    Copyright <img src={copyright} alt='icon'/> 2024 Yamen Khalili 
                </p>
            </div>
        </footer>
    );
}

export default Footer;