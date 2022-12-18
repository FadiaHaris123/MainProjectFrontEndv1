import { useState, useEffect } from 'react';
import { Fragment } from "react";
import { useHistory } from "react-router-dom"
import Navbar from '../../Navbar'

const ForgotPasswordPage = () => {

    const id = window.localStorage.getItem('managerId');
    const [managerEmail, setManagerEmail] = useState();
    const history = useHistory();

    const [data, setData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    useEffect(() => {
        const fetchManagers = async () => {
            const response = await fetch(
                'http://localhost:8080/api/managers'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseData = await response.json();
            const manager = [...responseData._embedded.manager]

            for (const key in manager) {
                if (manager[key].emp_id == id) {
                    setManagerEmail(manager[key].email)
                }
            }
        };
        fetchManagers();
    }, []);

    const changePasswordHandler = (event) => {
        event.preventDefault();
        if (data != null) {
            if (data.newPassword == data.confirmPassword) {
                fetch("http://localhost:8080/api/user/change-password", {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify({
                        email: managerEmail,
                        newPassword: data.newPassword,
                        currentPassword: data.currentPassword,
                    })
                }).then(response => {
                    alert("Password Changed Successfully")
                    return (
                        response.json(),
                        history.push("/manager")
                    );
                })
            }
            else {
                alert("Password doesnot match.")
            }
        }
        else {
            alert("Enter password")
        }
    };

    function passwordChange(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
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
                                    onChange={(e) => passwordChange(e)}
                                    id="currentPassword"
                                    value={data.currentPassword}
                                    className="form-control mt-1"
                                    type="password"
                                    placeholder='*******'
                                /><br></br>
                                <label>New Password</label>
                                <input
                                    onChange={(e) => passwordChange(e)}
                                    id="newPassword"
                                    value={data.newPassword}
                                    className="form-control mt-1"
                                    type="password"
                                    placeholder='*******'
                                /><br></br>
                                <label>Confirm Password</label>
                                <input
                                    onChange={(e) => passwordChange(e)}
                                    id="confirmPassword"
                                    value={data.confirmPassword}
                                    className="form-control mt-1"
                                    type="password"
                                    placeholder='*******'
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