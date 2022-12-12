import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PasswordResetSuccess } from './PasswordResetSuccess';
import { PasswordResetFail } from './PasswordResetFail';
// import { N } from 'chart.js/dist/chunks/helpers.core';

const PasswordResetLandingPage = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    const { passwordResetCode } = useParams();

    const onResetClicked = async () => {
        try {
            await axios.put(`/api/users/${passwordResetCode}/reset-password`, { newPassword: passwordValue });
            setIsSuccess(true);
        } catch (e) {
            setIsFailure(true);
        }
    }

    if (isFailure) return <PasswordResetFail />
    if (isSuccess) return <PasswordResetSuccess />

    return (
        <div className="overlays">
            <div className="Auth-form-container">
                <div className="Auth-form" >
                    <div className="Auth-form-content" >
                        <h3 className="Auth-form-title">Reset Password</h3>
                        <div className="form-group mt-3" >
                            <label>New Password</label>
                            <span class="required">*</span>
                            <input
                                className="form-control mt-1"
                                type='password'
                                value={passwordValue}
                                onChange={e => setPasswordValue(e.target.value)}
                                placeholder="Password" />
                            <label>Confirm Password</label>
                            <span class="required">*</span>
                            <input
                                className="form-control mt-1"
                                type='password'
                                value={confirmPasswordValue}
                                onChange={e => setConfirmPasswordValue(e.target.value)}
                                placeholder="Confirm Password" />
                            <button
                                id="submitButton"
                                disabled={!passwordValue || !confirmPasswordValue || passwordValue !== confirmPasswordValue}
                                onClick={onResetClicked}
                            >Reset Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PasswordResetLandingPage;