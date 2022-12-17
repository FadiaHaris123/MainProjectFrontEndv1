import React, { useEffect, useState, useReducer } from "react"
import { Link, useHistory } from "react-router-dom"
import Image from '../assets/images/login.jpg'
import axios from 'axios';
import '../App.css'
import './Auth.css'
import classes from './Login.module.css';

const Auth = (props) => {

  let [authMode, setAuthMode] = useState("signin")
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
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
    return {
      enteredEmail: '',
      emailIsValid: false
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
    return {
      enteredPassword: '',
      passwordIsValid: false
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

  }, [emailCurrentState, passwordCurrentState]);


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

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailCurrentState.enteredEmail, passwordCurrentState.enteredPassword);
  };

  let [mail, setMailMode] = useState("")
  let [password, setPasswordMode] = useState("")
  const history = useHistory();

  const loginHandler = async (e) => {

    setMailMode(emailCurrentState.enteredEmail);
    setPasswordMode(passwordCurrentState.enteredPassword);
    const data = JSON.stringify({
      email: mail,
      password: password
    });
    console.log(data);
    const response = await axios.post("http://localhost:8080/authenticate", data
      //  JSON.stringify(data),
      ,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
    sessionStorage.setItem('jwt', JSON.stringify(response?.data?.jwtToken));
    sessionStorage.setItem('userId', JSON.stringify(response?.data?.userId));
    sessionStorage.setItem('roleId', JSON.stringify(response?.data?.roleId));
    if (response?.data?.roleId == 1) {
      setauthenticated(true)
      localStorage.setItem("authenticated", true);
      history.push("/admin");
    }

    else if (response?.data?.roleId == 2) {
      setauthenticated(true)
      localStorage.setItem("authenticated", true);
      history.push("/manager");
    }

    else {
      setauthenticated(true)
      localStorage.setItem("authenticated", true);
      history.push("/customer");
    }

  };

  //   Axios.post('http://localhost:8080/api/user/userlogin', {
  //     email: mail,
  //     userPassword: password
  //   })
  //     .then(res => {
  //       if (res.data.roleId == 1) {
  //         history.push("/admin");
  //       }
  //       if (res.data.roleId == 2) {
  //         console.log(res.data.userId);
  //         localStorage.setItem('managerId', res.data.userId);
  //         history.push("/manager");
  //       }
  //       if (res.data.roleId == 3) {
  //         console.log(res.data.userId);
  //         localStorage.setItem('userId', res.data.userId);
  //         history.push("/customer");
  //       }
  //     })

  // };
  return (
    <header style={HeaderStyle}>
      <div className="overlays">
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={submitHandler}>
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
                <button id="submitButton" type="submit" disabled={!formIsValid} onClick={loginHandler}>
                  Submit
                </button>
              </div>
              <p className="text-center mt-2">
                Forgot <a href="/forgotpassword">password?</a>
              </p>
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

