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
  passWord:"",
  roleId:3
})

function handle(e){
  const newdata = {...data}
  newdata[e.target.id] = e.target.value 
  setData(newdata)
  console.log(newdata)
}

function submit(e){
  e.preventDefault();
  // fetch(url, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     firstName:data.firstName,
  //   lastName:data.lastName,
  //   email:data.email,
  //   mobileNo:parseInt(data.mobileNo),
  //   passWord:data.passWord,
  //   roleId:data.roleId
  //   }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }).then((res) => {
  //     if (res.ok) {
  //       alert("Registration Successful, Please check your email")
  //       return res.json();
  //     } else {
  //       return res.json().then((data) => {
  //         let errorMessage = 'Dupilcate Mail Id';
  //         console.log(data)
  //         if (data && data.error && data.error.message) {
  //           errorMessage = data.error.message;
  //           console.log(JSON.stringify(errorMessage))
  //         }})}})
  Axios.post(url,{
    firstName:data.firstName,
    lastName:data.lastName,
    email:data.email,
    mobileNo:parseInt(data.mobileNo),
    passWord:data.passWord,
    roleId:data.roleId
  })
  .then(res=>{
    if(res.data == "Duplicate email"){
      console.log(res.data)
      alert("Duplicate Email ID entered")
    }
    else{
        alert("Registration Successful")
    }
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
              <span class="required">*</span>
              <input
                onChange={(e)=>handle(e)}
                id="firstName"
                value={data.firstName}
                type="name"
                className="form-control mt-1"
                placeholder="e.g Jane "
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Last Name</label>
              <span class="required">*</span>
              <input
              onChange={(e)=>handle(e)}
              id="lastName"
              value={data.lastName}
                type="name"
                className="form-control mt-1"
                placeholder="e.g Doe"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <span class="required">*</span>
              <input
              onChange={(e)=>handle(e)}
              id="email"
              value={data.email}
                type="email"
                className="form-control mt-1"
                placeholder="e.g abc@gmail.com"
              required/>
            </div>
            <div className="form-group mt-3">
              <label>Mobile No.</label>
              <span class="required">*</span>
              <input
              onChange={(e)=>handle(e)}
              id="mobileNo"
              value={data.mobileNo}
                type="number"
                className="form-control mt-1"
                placeholder="Mobile No."
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <span class="required">*</span>
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






