import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// import { sendEmail } from '../util/sendEmail';

const ForgotPasswordPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const history = useHistory();

    const onSubmitClicked = async () => {
        try {
            await axios.post("http://localhost:8080/send-password", {
                email: `${emailValue}`
            });
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    return success ? (
        <div className="content-container">
            <h1>Success</h1>
            <p>Check your email for a reset link</p>
        </div>
    ) : (
        <div className="overlays">
            <div className="Auth-form-container">
                <div className="Auth-form" >
                    <div className="Auth-form-content" >
                        <h3 className="Auth-form-title">Forgot Password</h3>
                        {errorMessage && <div className="fail">{errorMessage}</div>}
                        <div className="form-group mt-3" >
                            <label>Email address</label>
                            <span class="required">*</span>
                            <input
                                id="email"
                                type="email"
                                className="form-control mt-1"
                                value={emailValue}
                                onChange={e => setEmailValue(e.target.value)}
                                placeholder="someone@gmail.com" />
                            <button
                                id="submitButton"
                                disabled={!emailValue}
                                onClick={onSubmitClicked}
                            >Send Reset Link</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ForgotPasswordPage;