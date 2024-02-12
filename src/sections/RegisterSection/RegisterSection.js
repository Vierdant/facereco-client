import React from "react";
import { Link } from "react-router-dom";

import './RegisterSection.css';
import FormInput from "../../components/FormInput/FormInput";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import LoadingWheel from "../../components/LoadingWheel/LoadingWheel";

const RegisterSection = ({ nameSignal, emailSignal, passwordSignal, submitSignal, invalidInput, busyState, mismatch, issuesList }) => {
    const invalid = invalidInput || issuesList.length !== 0 ? 'invalid-border' : '';
    const pInvalid = mismatch || invalidInput || issuesList.length !== 0 ? 'invalid-border' : '';
    const inputStyle = {
        display: 'flex', 
        flexDirection: 'column'
    };

    return (
        <div className='registerForm'>
            <h2>REGIST<span>:</span>ER</h2>
            {invalidInput &&
                <div className='invalid-box'>
                    <p>☒ The name or the email<br/>or both, are already taken.<br/>Try again with new information.</p>
                </div>
            }
            {mismatch && !invalidInput &&
                <div className='invalid-box'>
                    <p>☒ Your passwords do not match.<br/>Please make sure you entered<br/>the same password in both inputs.</p>
                </div>
            }
            {issuesList.length !== 0 &&
                <div className='invalid-box' style={{whiteSpace: 'pre-line', textAlign: 'left'}}>
                    <p>☒ Some issues to fix:
                        {issuesList.map((issue) => {
                            return `\n● ${issue}`
                        })}
                    </p>
                </div>
            }
            <FormInput id='name' type='text' inputSignal={nameSignal} className={invalid} containerStyle={inputStyle}/>
            <FormInput id='email' type='email' inputSignal={emailSignal} className={invalid} containerStyle={inputStyle}/>
            <FormInput id='password' type='password' inputSignal={(event) => passwordSignal(event, false)} className={pInvalid} containerStyle={inputStyle}/>
            <FormInput id='c-password' type='password' name='Confirm Password' inputSignal={(event) => passwordSignal(event, true)} className={pInvalid} containerStyle={inputStyle}/>
            {busyState ?
                <LoadingWheel size={45}/>:
                <PrimaryButton click={submitSignal} style={{ fontWeight: 700 }}>Register</PrimaryButton>
            }
            <p>Already have an account? <Link to='/login' reloadDocument>Login now!</Link></p>
        </div>
    );
}

export default RegisterSection;