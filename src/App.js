import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Navigation from './sections/Navigation/Navigation';
import Footer from './sections/Footer/Footer';

import './App.css';
import Main from './containers/Main';
import Result from './containers/Result'
import Login from './containers/Login'
import Register from './containers/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/result',
    element: <Result />
  }
])

const App = () => {
  return (
    <div className="App">
      <Navigation />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
