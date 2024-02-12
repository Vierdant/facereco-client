import React from 'react';

import './FormInput.css'

const FormInput = ({ inputSignal = () => {}, className = '', id, type, name, 
    containerStyle = {}, labelStyle = {}, InputStyle = {} }) => {

    const display = name ? name : id.charAt(0).toUpperCase() + id.slice(1);
    return (
        <div className='formInput' style={containerStyle}>
            <label htmlFor={id} style={labelStyle}>{display}</label>
            <input className={className} style={InputStyle} onChange={inputSignal} type={type} id={id} name={display} />
        </div>
    );
}

export default FormInput;