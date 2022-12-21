import { useHistory } from "react-router-dom";
import { useState, useEffect, Fragment } from 'react';
import React from "react";
import classes from './NomineeForm.module.css'
import Axios from 'axios';

function NomineeForm(props) {

    const history = useHistory();
    const url = "http://localhost:8080/api/nominee/add";
    const [chits, setChits] = useState([]);
    const [nomineeData, setNomineeData] = useState({
        chittalId: "",
        name: "",
        age: "",
        dob: "",
        phone: "",
        address: "",
        pincode: "",
        aadhar: ""
    })

    function handleInputChange(e) {
        const newdata = { ...nomineeData }
        newdata[e.target.id] = e.target.value
        setNomineeData(newdata)
        console.log(newdata)
    }

    function handleSubmit(e) {
        e.preventDefault();
        setChits(props.chits);
        Axios.post(url, {
            chittalId: props.chittalId,
            name: nomineeData.name,
            age: nomineeData.age,
            dob: nomineeData.dob,
            phone: nomineeData.phone,
            address: nomineeData.address,
            pincode: nomineeData.pincode,
            aadhar: nomineeData.aadhar
        })
        
            .then(() => {
                alert("Nominee Details added");
            })
        history.push("/customer/joinedchits")
    }

    useEffect(() => {
        const updateChittal = () => {
            Axios.put('http://localhost:8080/api/chitty/update', {
                chitNumber: chits.chitNumber,
                installment: chits.installment,
                duration: chits.duration,
                manager: props.managerId,
                numberOfChittal: chits.numberOfChittal,
                currentNumberOfChittal: chits.currentNumberOfChittal + 1,
                category: props.categoryId,
                totalAmount: chits.totalAmount,
                launchDate: chits.launchDate,
                startDate: "",
                status: "launched"
            })
                .then(res => {
                    if (res.data != null) {
                        alert("Chittal information updated successfully")
                    }
                });
        }
        updateChittal();
    })
    return (
        <Fragment>
        {/* <h3 className={classes.head}>Please fill the nominee details below</h3> */}
        <div className={classes.form}>
            <div className={classes.nominee}>
            
                <h3 className={classes.head1}>Nominee details </h3>
                <div className={classes.nomineeName}>
                    <label className={classes.form__label} for="nomineeName">Name <span class="required">*</span></label>
                    <input type="nomineeName" id="name" className={classes.form__input} value={nomineeData.name} onChange={(e) => handleInputChange(e)} placeholder="Name" />
                </div>

                <div className={classes.nomineeAge}>
                    <label className={classes.form__label} for="nomineeAge">Age <span class="required">*</span></label>
                    <input type="nomineeAge" id="age" className={classes.form__input} value={nomineeData.age} onChange={(e) => handleInputChange(e)} placeholder="In years" />
                </div>

                <div className={classes.nomineedob}>
                    <label className={classes.form__label} for="nomineedob" id="nomineedob"> Date of birth <span class="required">*</span></label>
                    <input className={classes.form__input} type="text" value={nomineeData.dob} onChange={(e) => handleInputChange(e)} id="dob" placeholder="yyyy-mm-dd" />
                </div>

                <div className={classes.nomineeAddress}>
                    <label className={classes.form__label} for="nomineeAddress">Address <span class="required">*</span></label>
                    <input type="nomineeAddress" id="address" className={classes.form__input} value={nomineeData.address} onChange={(e) => handleInputChange(e)} placeholder="Address" />
                </div>

                <div className={classes.nomineePincode}>
                    <label className={classes.form__label} for="nomineePincode"> Pincode <span class="required">*</span></label>
                    <input type="nomineePincode" id="pincode" className={classes.form__input} value={nomineeData.pincode} onChange={(e) => handleInputChange(e)} placeholder="Eg.695005" />
                </div>
                <div className={classes.nomineeAd}>
                    <label className={classes.form__label} for="nomineeAd"> Aadhar <span class="required">*</span></label>
                    <input type="nomineeAd" id="aadhar" className={classes.form__input} value={nomineeData.aadhar} onChange={(e) => handleInputChange(e)} placeholder="Eg.2054 3605 7419" />
                </div>

                <div className={classes.nomineePhone}>
                    <label className={classes.form__label} for="nomineePhone">Contact number <span class="required">*</span></label>
                    <input type="nomineePhone" id="phone" className={classes.form__input} value={nomineeData.phone} onChange={(e) => handleInputChange(e)} placeholder="+91  " />
                </div>
            </div>
            <div className={classes.footer}>
                {/* <Link to="./components/Customer/pages/JoinedChits/JoinedChits"> */}
                    <button onClick={handleSubmit} type="submit" className={classes.btn}>Submit</button>
                {/* </Link> */}
            </div>

        </div>
        </Fragment>

    );
}

export default NomineeForm;
