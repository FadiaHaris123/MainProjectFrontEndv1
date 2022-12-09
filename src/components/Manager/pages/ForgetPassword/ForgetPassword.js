import { useState } from 'react';
import { Fragment } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ChangePassword from './ChangePassword';
import Navbar from '../../Navbar'
// import { sendEmail } from '../util/sendEmail';

const ForgotPasswordPage = () => {

    const [changePwd, setChangePwd] = useState(false);
    const changePasswordForm = () => {
        setChangePwd(true)
    }
    // const [errorMessage, setErrorMessage] = useState('');
    // const [success, setSuccess] = useState(false);
    // const [emailValue, setEmailValue] = useState('');
    // const history = useHistory();

    // const onSubmitClicked = async () => {
    //     try {
    //         await axios.post("http://localhost:8080/send-password", {
    //             email: `${emailValue}`
    //         });

    // await axios.get("http://localhost:8080/send-password");
    // setSuccess(true);

    // setTimeout(() => {
    //     history.push('/login');
    // }, 3000);
    // await sendEmail({
    //     to: 'sarath.s@experionglobal.com',
    //     from: 'vivin.abraham@experionglobal.com',
    //     subject: 'Password Reset',
    //     text: `
    //         To reset your password, click this link:
    //         http://localhost:3000/resetpassword/
    //     `
    // });

    // await axios.put(`/api/forgot-password/${emailValue}`);
    // setSuccess(true);
    // setTimeout(() => {
    //     history.push('/login');
    // }, 3000);

    //     } catch (e) {
    //         setErrorMessage(e.message);
    //     }
    // }

    // return success ? (
    //     <div className="content-container">
    //         <h1>Success</h1>
    //         <p>Check your email for a reset link</p>
    //     </div>
    // ) : (
    //     <div className="content-container">
    //         <h1>Forgot Password</h1>
    //         <p>Enter your email and we'll send you a reset link</p>
    //         {errorMessage && <div className="fail">{errorMessage}</div>}
    //         <input
    //             value={emailValue}
    //             onChange={e => setEmailValue(e.target.value)}
    //             placeholder="someone@gmail.com" />
    //         <button
    //             disabled={!emailValue}
    //             onClick={onSubmitClicked}
    //         >Send Reset Link</button>
    //     </div>
    // );


    return (
        // <div className={classes.profileImg}>
        // <div>
        //     <img src={DefaultUserPic} alt="profils pic" />
        //     <h1>{props.name}</h1>
        //     <input type="file" name="profileImage" />
        //     {/* onChange={this.changeProfileImage} */}
        //     <Button variant="primary">Update Profile</Button>
        //     {/* onClick={this.UpdateProfileHandler} */}
        // </div>
        <Fragment>
            <Navbar />
            <div className="overlays">
                <div className="Auth-form-container">
                    <div className="Auth-form">
                        <div className="Auth-form-content" >
                            <h3 className="Auth-form-title">Change Password</h3>
                            <div className="form-group mt-3">
                                <div>
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control mt-1"
                                        placeholder="Enter password"
                                        value="**********"
                                    />
                                </div>
                                <div className="submitButton">
                                    <button id="submitButton" onClick={changePasswordForm}>
                                        Change Your Password
                                    </button>
                                    {changePwd && <ChangePassword />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default ForgotPasswordPage;