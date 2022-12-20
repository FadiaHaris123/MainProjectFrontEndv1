import React, { Fragment } from 'react';
import firebase_demo from './firebase_demo';
import firebase from 'firebase';
import classes from './Otp.module.css'
// import Navbar from '../Navbar';
import Navbar from '../Navbar';
class Otp 
 extends 

 React.Component
 {
  // handleChange = (e) =>{
  //   const {name, value } = e.target
  //   this.setState({
  //       [name]: value
  //     })
  // }
  // configureCaptcha = () =>{
  //   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
  //     'size': 'invisible',
  //     'callback': (response) => {
  //       // reCAPTCHA solved, allow signInWithPhoneNumber.
  //       this.onSignInSubmit();
  //       console.log("Recaptca verified")
  //     },
  //     defaultCountry: "IN"
  //   });
  // }
  
  // onSignInSubmit = (e) => {
  //   e.preventDefault()
  //   this.configureCaptcha()
  //   const phoneNumber = "+91" + this.state.mobile
  //   console.log(phoneNumber)
  //   const appVerifier = window.recaptchaVerifier;
  //   firebase_demo.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
  //       .then((confirmationResult) => {
  //         // SMS sent. Prompt user to type the code from the message, then sign the
  //         // user in with confirmationResult.confirm(code).
  //         window.confirmationResult = confirmationResult;
  //         console.log("OTP has been sent")
  //         // ...
  //       }).catch((error) => {
  //         // Error; SMS not sent
  //         // ...
  //         console.log("SMS not sent")
  //       });
  // }
  // onSubmitOTP = (e) =>{
  //   e.preventDefault()
  //   const code = this.state.otp
  //   console.log(code)
  //   window.confirmationResult.confirm(code).then((result) => {
  //     // User signed in successfully.
  //     const user = result.user;
  //     console.log(JSON.stringify(user))
  //     alert("User is verified")
  //     // ...
  //   }).catch((error) => {
  //     // User couldn't sign in (bad verification code?)
  //     // ...
  //   });
  // }
  render() {
    return (
        <Fragment>
        <Navbar/>
      <div>
        <h3 className={classes.heading}>OTP VERIFICATION</h3>
        <div  className={classes.box}>
        <h4 className={classes.head}>Mobile number</h4>
        <form>
          <div id="sign-in-button"></div>
          <input type="number" className={classes.input} name="mobile" placeholder="Mobile number" required onChange={this.handleChange}/>
          <button type="submit" className={classes.button} >Proceed</button>
        </form>

        <h4 className={classes.head}>Enter OTP</h4>
        <form>
          <input type="number" className={classes.input}  name="otp" placeholder="OTP Number" required onChange={this.handleChange}/>
          <button type="submit" className={classes.button}>Submit</button>
        </form>
      </div>
      </div>
      </Fragment>
    )
  }
}
export default Otp;
