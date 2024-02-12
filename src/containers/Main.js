import React, { createRef } from 'react';
import { Navigate } from 'react-router-dom';
import { updateAuthState } from '../auth';
import { authed } from '../signals';
import Cookies from 'js-cookie';

import './styles/Main.css'

import Cover from '../sections/CoverSection/CoverSection';
import linkIcon from '../assets/link-icon.svg'
import pointArrow from '../assets/pointy-arrow.svg'

const isImageURL = (url) => {
  return(url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null);
}

class Main extends React.Component {
    constructor() {
      super();
      this.state = {
        input: '',
        valid: false,
        imageURL: '',
        model: 'face-detection',
        result: {},
        profile: {},
        detectRequest: false
      };
      
      this.imageInputRef = createRef();
    }

    onInputChange = (event) => {
      this.setState({ input: event.target.value });
      this.setState({ valid: event.target.checkValidity() })
    }

    onModelSelect = (event) => {
      this.setState({ model: event.target.value });
    }
  
    onButtonSubmit = async () => {
      if (!this.state.valid || !isImageURL(this.state.input)) {
        console.log("not valid");
        return;
      }
      
      this.setState({ imageURL: this.state.input });

      await updateAuthState();

      let profile = null;

      if (authed.value) {
        const id = JSON.parse(Cookies.get('_auth_state')).id;
        profile = await fetch(`https://face-reco-alpha-e205c6b29a80.herokuapp.com/profile/${id}`, {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .catch(console.log);
      }

      fetch(`https://face-reco-alpha-e205c6b29a80.herokuapp.com/image/${this.state.model}`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                imageUrl: this.state.input,
                username: profile?.name || null
            })
        })
        .then(response => response.json())
        .then(result => {
          this.setState({ result, detectRequest: true, profile: profile || {} });
        })
        .catch(error => console.log('error', error));
    }
  
    scrollToInput = () => {
        this.imageInputRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }

    render() {
        return (
            <main>
              <Cover handleButtonClick={this.scrollToInput} />
              <section className='inputsection'>
                  <img id='input-arrow-image' src={pointArrow} alt='pointy arrow'/>
                  <div className='form'>
                      <img src={linkIcon} alt='Link: '/>
                      <select onChange={this.onModelSelect}>
                          <option value='face-detection'>Model - Face Detection</option>
                          <option value='celebrity-face-detection'>Model - Celebrity Detection</option>
                      </select>
                      <input ref={this.imageInputRef} onChange={this.onInputChange} id='imageinput' type='url' placeholder='Image Link'/>
                      <button onClick={this.onButtonSubmit}>Detect</button>
                  </div>
              </section>
              {this.state.detectRequest && 
              <Navigate to={`/result?id=${this.state.result.id}&model=${this.state.model}&url=${this.state.imageURL}`} state={{ result: this.state.result.response, profile: this.state.profile}}/>}
            </main>
        );
    }
}

export default Main;