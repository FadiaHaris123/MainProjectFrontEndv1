import React, { useEffect, useState, useReducer } from "react"
import { Link, useHistory } from "react-router-dom"
import Image from '../assets/images/login.jpg'
import axios from 'axios';
import { AxiosResponse, AxiosError } from 'axios'

import '../App.css'
import './Auth.css'
import classes from './Login.module.css';


//Authentication page
const Auth = (props) => {

  let [emailError,setEmailError] = useState('')
  let [authMode, setAuthMode] = useState("signin")
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const emailInitialState = {
    enteredEmail: '',
    emailIsValid: null
  };

  const passwordInitialState = {
    enteredPassword: '',
    passwordIsValid: null
  };

  //email and password validation

  const emailHandler = (prevState, action) => {

    if (action.type === 'emailchange') {
      return {
        enteredEmail: action.payload,
        emailIsValid: action.payload.includes('@')
      }
    }
    if (action.type === 'emailvalidity') {
      return {
        enteredEmail: prevState.enteredEmail,
        emailIsValid: prevState.enteredEmail.includes('@')
      }
    }
  };

  const passwordHandler = (prevState, action) => {
    if (action.type === 'passwordchange') {
      return {
        enteredPassword: action.payload,
        passwordIsValid: action.payload.trim().length > 6
      }
    }
    if (action.type === 'passwordvalidity') {
      return {
        enteredPassword: prevState.enteredPassword,
        passwordIsValid: prevState.enteredPassword.trim().length > 6
      }
    }
  };


  const [emailCurrentState, dispatchEmail] = useReducer(emailHandler, emailInitialState);
  const [passwordCurrentState, dispatchPassword] = useReducer(passwordHandler, passwordInitialState);
  const [formIsValid, setFormIsValid] = useState(false);


  ///************ useEffect returning cleanup function ***************///

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("validity check");
      setFormIsValid(
        emailCurrentState.enteredEmail.includes('@') && passwordCurrentState.enteredPassword.trim().length >= 6
      );
    }, 500);
    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  },[emailCurrentState, passwordCurrentState]);


  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'emailchange', payload: event.target.value })
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'emailvalidity' })
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'passwordchange', payload: event.target.value })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'passwordvalidity' })
  };


  const history = useHistory();
  const loginHandler = async (e) => {
   
    e.preventDefault();
    const data =JSON.stringify({
      email: emailCurrentState.enteredEmail,
      password: passwordCurrentState.enteredPassword
  }) ;

  const response = await axios.post("http://localhost:8080/authenticate",data
,
  {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
  }).then()
  .catch(function(error) {
      if(error.response)
      {
        console.log("data",error.response.data)
        console.log("status",error.request.status)
        console.log("request",error.request)
        console.log(JSON.stringify(error))
        console.log(data)
        alert("UnAuthorized")
      }
      // else{
      //   alert("hello")
      // }
      throw error
  })
  let token=null;
  token = JSON.stringify(response?.data?.jwtToken);
  // console.log(token)

   if(token!=null)
   {
    sessionStorage.setItem('jwt', JSON.stringify(response?.data?.jwtToken));
    sessionStorage.setItem('userId', JSON.stringify(response?.data?.userId));
    sessionStorage.setItem('roleId', JSON.stringify(response?.data?.roleId));
    alert("Authorised User");
    if(response?.data?.roleId==1)
    {
      history.push("/admin");
    }
    else if(response?.data?.roleId==2){
      history.push("/manager");
    }
    else{
      history.push("/customer");
    }
    console.log("authorized")
  }
  // props.onLogin(emailCurrentState.enteredEmail, passwordCurrentState.enteredPassword);
};
    
  return (
    <header style={HeaderStyle}>
      <div className="overlays">
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={loginHandler}>
            <div className="Auth-form-content" >
              <h3 className="Auth-form-title">Log In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <Link to="/register">
                  <span className="link-primary" onClick={changeAuthMode}>
                    Sign Up
                  </span>
                </Link>
              </div>
              <div className="form-group mt-3" >
                <div className={`${classes.control} ${emailCurrentState.emailIsValid === false ? classes.invalid : ''
                  }`}>
                  <label>Email address</label>
                  <span class="required">*</span>
                  <input
                    id="email"
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    value={emailCurrentState.enteredEmail}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                    required
                  />
                </div>
              </div>
              <div className="form-group mt-3">
                <div className={`${classes.control} ${passwordCurrentState.passwordIsValid === false ? classes.invalid : ''
                  }`}>
                  <label>Password</label>
                  <span class="required">*</span>
                  <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    value={passwordCurrentState.enteredPassword}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                    required
                  />
                </div>
              </div>
              <div className="submitButton">
                <button id="submitButton" type="submit" disabled={!formIsValid} >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </header>
  )
}

const HeaderStyle = {
  width: "210vh",
  height: "100vh",
  background: `url(${Image})`,
  backgroundPosition: 'fixed',
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  backgroundAttachment: "fixed"
}

export default Auth;

