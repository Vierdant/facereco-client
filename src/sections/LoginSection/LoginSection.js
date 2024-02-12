import React from "react";
import { Link } from "react-router-dom";

import './LoginSection.css';
import LoadingWheel from "../../components/LoadingWheel/LoadingWheel";
import FormInput from "../../components/FormInput/FormInput";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

const LoginSection = ({ emailSignal, passwordSignal, submitSignal, invalidInput, busyState }) => {
    const invalid = invalidInput ? 'invalid-border' : '';
    const inputStyle = {
        display: 'flex', 
        flexDirection: 'column'
    };

    return (
        <div className='loginForm'>
            <h2>LOG<span>:</span>IN</h2>
            {invalidInput &&
                <div className='invalid-box'>
                    <p>☒ There was an issue with<br/>either your Email or Password.<br/>Try again.</p>
                </div>
            }
            <FormInput id='email' type='email' inputSignal={emailSignal} className={invalid} containerStyle={inputStyle}/>
            <FormInput id='password' type='password' inputSignal={passwordSignal} className={invalid} containerStyle={inputStyle}/>
            {busyState ?
                <LoadingWheel size={45}/>:
                <PrimaryButton click={submitSignal} style={{ fontWeight: 700 }}>Login</PrimaryButton>
            }
            <p>Don't have an account? <Link to='/register' reloadDocument>Register</Link></p>
        </div>
    );
}

export default LoginSection;