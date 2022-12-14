import { Link } from "react-router-dom";
import  { useState, setState, Fragment } from 'react';
import React from "react";
import classes from './NomineeForm.module.css'

function NomineeForm() {
    const [chittalData,setChittalData] = useState({
        userId:"",
        chittyId:"",
        age:"",
        address:"",
        pinCode:"",
        userPhone:"",
        dob:"",
        status:"",
        income:"",
        aadhar:""
    })

 
    const [nomineeData,setNomineeData] = useState({
        chittalId:"",
        name:"",
        age:"",
        dob:"",
        phone:"",
        address:"",
        pincode:"",
        aadhar:""
})

function handleInputChange(e){
    const newdata = {...chittalData}
    newdata[e.target.id] = e.target.value
    setChittalData(newdata)
    console.log(newdata)
}

const handleSubmit = () => {
     }

    return(
        <div className={classes.form}>

                <div className={classes.nominee}>
                    
                <h3>Nominee details</h3>
                <div className={classes.nomineeName}>
                    <label className={classes.form__label} for="nomineeName">Name </label>
                    <input type="nomineeName" id="nomineeName" className={classes.form__input} value={nomineeData.name} onChange={(e) => handleInputChange(e)} placeholder="Name" />
                </div>

                <div className={classes.nomineeAge}>
                    <label className={classes.form__label} for="nomineeAge">Age </label>
                    <input type="nomineeAge" id="nomineeAge" className={classes.form__input} value={nomineeData.age} onChange={(e) => handleInputChange(e)} placeholder="In years" />
                </div>

                <div className={classes.nomineedob}>
                    <label className="form__label" for="nomineedob" id="nomineedob"> Date of birth </label>
                    <input className={classes.form__input} type="text" value={nomineeData.dob} onChange={(e) => handleInputChange(e)} id="nomineedob" placeholder="dd/mm/yyyy" />
                </div>

                <div className={classes.nomineeAddress}>
                    <label className="form__label" for="nomineeAddress">Address </label>
                    <input type="nomineeAddress" id="nomineeAddress" className={classes.form__input} value={nomineeData.address} onChange={(e) => handleInputChange(e)} placeholder="Address" />
                </div>

                <div className={classes.nomineePincode}>
                    <label className="form__label" for="nomineePincode"> Pincode </label>
                    <input type="nomineePincode" id="nomineePincode" className={classes.form__input} value={nomineeData.pincode} onChange={(e) => handleInputChange(e)} placeholder="Eg.695005" />
                </div>
                <div className={classes.nomineeAd}>
                    <label className="form__label" for="nomineeAd"> Aadhar </label>
                    <input type="nomineeAd" id="nomineeAd" className={classes.form__input} value={nomineeData.aadhar} onChange={(e) => handleInputChange(e)} placeholder="Eg.2054 3605 7419" />
                </div>

                <div className={classes.nomineePhone}>
                    <label className={classes.form__label} for="nomineePhone">Contact number </label>
                    <input type="nomineePhone" id="nomineePhone" className={classes.form__input} value={nomineeData.phone} onChange={(e) => handleInputChange(e)} placeholder="+91  " />
                </div>

            
            </div>
        
        </div>
    );
}


export default NomineeForm;