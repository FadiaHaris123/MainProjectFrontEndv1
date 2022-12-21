import React, { useState } from 'react';
import mainbg from './img/pay1.png'
import shape from './img/shape.png'
import icons from './img/icons.png'
import Header from './Header/Header'
import { Fragment } from "react"
import './payment.css';
import Navbar from '../Navbar';

function Payment() {
    const [amount, setamount] = useState('');
    const APP_KEY=process.env.REACT_APP_KEY;
    const KEY_SECRET=process.env.REACT_APP_API_KEY;
    
    const handlesubmit = (e) => {
        e.preventDefault();
        if (amount === "") {
            alert("Please enter amount");
        }
        else {
            var options = {
                key:APP_KEY,
                key_secret:KEY_SECRET,
                
                amount: amount * 100,
                currenty: "INR",
                name: "Anagha",
                description: "Razorpay project",
                handler: function (response) {
                    alert(response.razorpay_payment_id);
                },
                prefill: {
                    name: "",
                    email: "",
                    contact: ""
                },
                notes: {
                    address: "",
                },
                theme: {
                    color: "#000"
                }
            };
            var pay = new window.Razorpay(options);
            pay.open();
        }
    }
    return (
        <Fragment>
        <section className='main'>
        <Header></Header>
            {/* <div className="page-shape">
                <img src={shape} alt="razorpay paygateway integration" />
            </div> */}
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-8'>
                        <div className='column-wrap justify-content-between'>
                        <div className="title">
                                <div className="title-content">
                                    <br></br>
                                    <h2>Pay Online </h2>
                                    {/* <p className='mt-3'>I hope the tutorial has helped you learn how to integrate Paytm payment gateway in ReactJS.</p>
                                    <a href="https://dev.to/rajamanickam/how-to-integrate-razorpay-payment-gateway-in-reactjs-5fnb" target="_blank" className='btn btn-success'>View Tutorial</a> */}
                                </div>
                            </div>
                            <div className="banner-img">
                                
                                <img src={mainbg} alt="Razorpay demo reacjs" height="530px" width="650px"/>
                            </div>
                           
                            <div className="technology">
                                {/* <div className="tech-logo">
                                    <img src={icons} alt="Razorpay test payment" />
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className="column-wrap justify-content-center">
                            <div className="fxt-form">
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <h3 className='mb-3'>Complete your payment here </h3>
                                <p>Enter the amount to be transferred to the account as the <strong>chitty installment.</strong></p>
                                <form>
                                    <div className="form-group mt-5">
                                        <input type="text" className="form-control" value={amount} onChange={(e) => setamount(e.target.value)} placeholder="Enter chitty amount" />
                                    </div>
                                    <div className="form-group">
                                        <br></br>
                                        <button type="submit" onClick={handlesubmit} className="btn-submit" >Pay</button>
                                    </div>
                                </form>
                            </div>
                            {/* <p><i>*This is a dummy transaction, only for testing purpose.</i></p> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </Fragment>
    );
    
}

export default Payment;