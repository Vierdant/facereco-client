import React from 'react';
import Cookies from 'js-cookie';
import RegisterSection from '../sections/RegisterSection/RegisterSection';
import { authed } from '../signals';

import cover from '../assets/cover.svg';

import './styles/Register.css';
import { Navigate } from 'react-router-dom';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            issuesToFix: [],
            validCreds: false,
            invalidCreds: false,
            passwordMismatch: false,
            isFetching: false
        }
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value});
    }

    onPasswordChange = (event, isConfirm) => {
        if (isConfirm) {
            this.setState({ confirmPassword: event.target.value});
        } else {
            this.setState({ password: event.target.value});
        }
    }

    onCredSubmit = async () => {
        const {name, email, password, confirmPassword} = this.state;
        
        this.setState({ isFetching: true });
        this.setState({ passwordMismatch: false });

        const validate = await fetch('https://face-reco-alpha-e205c6b29a80.herokuapp.com/validate/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                otherPassword: confirmPassword
            })
        })
        .then(response => response.json())

        if (!validate.match) {
            this.setState({ passwordMismatch: true });
            return;
        }

        const issuesToFix = [];

        if (!validate.name) {
            issuesToFix.push('Name should be 3 to 16 characters');
        }

        if (!validate.email) {
            issuesToFix.push('Provide a valid email');
        }

        if (!validate.password) {
            issuesToFix.push('Provide a stronger password'
            + '\n    ┣ Min 8 characters'
            + '\n    ┣ Min 1 lowercase char'
            + '\n    ┣ Min 1 uppercase char'
            + '\n    ┣ Min 1 number'
            + '\n    ┗ Min 1 symbol');
        }

        this.setState({ issuesToFix: issuesToFix});

        if (issuesToFix.length !== 0) {
            this.setState({ isFetching: false });
            return;
        }
        
        fetch('https://face-reco-alpha-e205c6b29a80.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                this.setState({ isFetching: false });
                this.setState({ invalidCreds: true });
                return;
            }
            
            Cookies.set('_auth_state', JSON.stringify({ id: data.id, email: data.email }), {expires: 1});
            Cookies.set('_auth_store_date', new Date(), {expires: 1});
            Cookies.set('_auth_type', 'Bearer', {expires: 1});
            Cookies.set('_auth', data.token, {expires: 1});

            authed.value = true;

            this.setState({ validCreds: true });
        })
    }

    render() {
        return (
            <div className='register'>
                <img src={cover} alt='cover'/>
                <RegisterSection
                    nameSignal={this.onNameChange}
                    emailSignal={this.onEmailChange} 
                    passwordSignal={this.onPasswordChange} 
                    submitSignal={this.onCredSubmit}
                    invalidInput={this.state.invalidCreds}
                    mismatch={this.state.passwordMismatch}
                    busyState={this.state.isFetching}
                    issuesList={this.state.issuesToFix} />
                {this.state.validCreds && 
                    <Navigate to={'/'}/>}
            </div>
        );
    }
}

export default Register;