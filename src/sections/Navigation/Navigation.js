import React, { useState } from 'react';
import logo from '../../assets/logo.svg'
import './Navigation.css'
import { BrowserRouter, Link } from 'react-router-dom';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton/SecondaryButton';
import Cookies from 'js-cookie';
import { authed } from '../../signals';
import { useSignalEffect } from '@preact/signals-react';

const Navigation = () => {
    const [signed, setSigned] = useState(false);

    useSignalEffect(() => {
        setSigned(authed.value);
    })

    const logout = () => {
        Cookies.remove('_auth_state');
        Cookies.remove('_auth_store_date');
        Cookies.remove('_auth_type');
        Cookies.remove('_auth');

        authed.value = false;
    }

    return (
        <nav>
            <BrowserRouter>
                <div className='left'>
                        <Link to='/' reloadDocument><img src={logo} alt='Logo'/></Link>
                    <h2>Face<span>:</span>Reco</h2>
                </div>
                { signed ? 
                    <SecondaryButton click={logout}>Log Out</SecondaryButton>
                    :
                    <Link to='/login' reloadDocument>
                        <PrimaryButton>Login</PrimaryButton>
                    </Link>
                }
            </BrowserRouter>
        </nav>
    );
}

export default Navigation;