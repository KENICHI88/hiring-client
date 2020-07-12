import React, { useState } from 'react'
import LoginForm from '../components/Login/LoginForm';

import {api_setDefaultHeaderAxios} from '../api/callAPI';

import {userLogin} from '../controllers/userController';

import {
  withRouter
} from "react-router-dom";

const LoginPage =(props) => {
  
  const [user, setUser] = useState({});
  
  const actionLogin = (dataForm) => {
    userLogin(dataForm, (data)=> {
      const userResponse = data;
      localStorage.setItem('userInfor', JSON.stringify(userResponse.user));
      localStorage.setItem('token', userResponse.token);
      api_setDefaultHeaderAxios();
      window.location = '/empty';
      // props.history.push('/dashboard')
    });
  }

  return (
    <LoginForm  actionLogin={actionLogin} />
  )
}


export default withRouter(LoginPage);
