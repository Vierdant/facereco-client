import React from 'react';
import Cookies from 'js-cookie';
import LoginSection from '../sections/LoginSection/LoginSection';
import { authed } from '../signals';

import cover from '../assets/cover.svg';

import './styles/Login.css';
import { Navigate } from 'react-router-dom';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            validCreds: false,
            invalidCreds: false,
            isFetching: false
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value});
    }

    onCredSubmit = () => {
        this.setState({ isFetching: true });
        fetch('https://face-reco-alpha-e205c6b29a80.herokuapp.com:9000/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
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
            <div className='login'>
                <img src={cover} alt='cover'/>
                <LoginSection 
                    emailSignal={this.onEmailChange} 
                    passwordSignal={this.onPasswordChange} 
                    submitSignal={this.onCredSubmit} 
                    invalidInput={this.state.invalidCreds}
                    busyState={this.state.isFetching}/>
                {this.state.validCreds && 
                    <Navigate to={'/'}/>}
            </div>
        );
    }
}

export default Login;