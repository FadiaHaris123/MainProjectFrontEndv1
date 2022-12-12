import { useState } from 'react';
import { Fragment } from "react";
import Navbar from '../../Navbar'

const ForgotPasswordPage = () => {

    const [changePwd, setChangePwd] = useState("");

    const changePasswordHandler = (event) => {
        event.preventDefault();

        fetch("http://localhost:8080/api/user-profile", {

            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                email: "admin@exp",
                // props.employeeId
                newPassword: changePwd,
            })
        }).then(response => {
            console.log("hello change");
            console.log("request: ", response);
            return response.json();
        })
            .then(resJson => {
                alert("Password Change Successfully")
            })

    };
    const passwordChange = (event) => {
        setChangePwd(event.target.value)
    }

    return (
        <Fragment>
            <Navbar />
            <div className="overlays">
                <div className="Auth-form-container">
                    <form className="Auth-form" onSubmit={changePasswordHandler}>
                        <div className="Auth-form-content" >
                            <h3 className="Auth-form-title">Change Password</h3>
                            <div className="form-group mt-3">
                                <label>Current Password</label>
                                <input
                                    className="form-control mt-1"
                                    type="password"
                                    placeholder='********'
                                /><br></br>
                                <label>New Password</label>
                                <input
                                    className="form-control mt-1"
                                    type="password"
                                    placeholder='********'
                                /><br></br>
                                <label>Confirm Password</label>
                                <input
                                    className="form-control mt-1"
                                    onChange={passwordChange}
                                    type="password"
                                    placeholder='********'
                                /><br></br>
                                <button id="submitButton">Change Password</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
export default ForgotPasswordPage;