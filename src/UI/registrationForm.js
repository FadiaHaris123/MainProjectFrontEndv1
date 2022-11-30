import React, { useState } from "react"
import { Link } from "react-router-dom"
import Axios from 'axios';

import Image from '../assets/images/joinus.jpg'

const Auth = (props) => {

const url = "http://localhost:8080/api/user-profile"

const [data,setData] = useState({
  firstName:"",
  lastName:"",
  email:"",
  mobileNo:"",
  passWord:""
})

function handle(e){
  const newdata = {...data}
  newdata[e.target.id] = e.target.value
  setData(newdata)
  console.log(newdata)
}

function submit(e){
  e.preventDefault();
  Axios.post(url,{
    firstName:data.firstName,
    lastName:data.lastName,
    email:data.email,
    mobileNo:parseInt(data.mobileNo),
    passWord:data.passWord
  })
  .then(res=>{
    if(res.data != null){
      alert("Registration Successful...")
    }
    console.log(res.data)
  })
}

let [authMode, setAuthMode] = useState("signup")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signup" ? "signin" : "signup")
  }
  
  if (authMode === "signup") {
    return (
      <header style={ HeaderStyle }>
      <div className="overlays">
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={(e)=>submit(e)}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <Link to = "/login">
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>First Name</label>
              <input
                onChange={(e)=>handle(e)}
                id="firstName"
                value={data.firstName}
                type="name"
                className="form-control mt-1"
                placeholder="e.g Jane "
              />
            </div>
            <div className="form-group mt-3">
              <label>Last Name</label>
              <input
              onChange={(e)=>handle(e)}
              id="lastName"
              value={data.lastName}
                type="name"
                className="form-control mt-1"
                placeholder="e.g Doe"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
              onChange={(e)=>handle(e)}
              id="email"
              value={data.email}
                type="email"
                className="form-control mt-1"
                placeholder="e.g abc@gmail.com"
              />
            </div>
            <div className="form-group mt-3">
              <label>Mobile No.</label>
              <input
              onChange={(e)=>handle(e)}
              id="mobileNo"
              value={data.mobileNo}
                type="number"
                className="form-control mt-1"
                placeholder="Mobile No."
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
              onChange={(e)=>handle(e)}
              id="passWord"
              value={data.passWord}
                type="password"
                className="form-control mt-1"
                placeholder="Password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
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

}



const HeaderStyle = {
  width: "100%",
  height: "100vh",
  background: `url(${Image})`,
  backgroundPosition:'fixed',
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  backgroundAttachment: "fixed"
}

export default Auth;






