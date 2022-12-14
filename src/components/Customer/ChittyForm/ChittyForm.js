import React, { useState, setState, Fragment } from 'react';
import classes from './ChittyForm.module.css'
import Header from './Header/Header'
import Image from './Header/form.jpg'
import { getByDisplayValue } from '@testing-library/react';
import { isDOMComponent } from 'react-dom/test-utils';
import { isDisabled } from '@testing-library/user-event/dist/utils';

function ChittyForm() {

    const [chittalData,setChittalData] = useState({
        chittalId:,
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
            nomineeId:"",
            chittalId:"",
            name:"",
            age:"",
            dob:"",
            phone:"",
            address:"",
            pincode:"",
            aadhar:""
    })

    
    const handleSubmit = () => {
        console.log(Name, age, dob, address, nomineedob, pincode, relation, userPhone, status, income, chittyType, aadhar, nomineeName, nomineeAge, nomineePincode, nomineePhone, nomineeAddress, nomineeAd);
    }

    return (
        // <header style={ HeaderStyle }>
        <Fragment>
            <Header></Header>
            <div className={classes.form}>


                {/* <h1>Chitty Application Form</h1> */}
                <br></br>

                <div className={classes.form_body}>
                    <h3>Member details</h3>
                    <div>
                        <label className={classes.form__label} for="Name" id="name"> Name </label>
                        <input className={classes.form__input} type="text" value={Name} onChange={(e) => handleInputChange(e)} id="Name" placeholder="Name" />
                    </div>
                    <div>
                        <label className={classes.form__label} for="age" id="age"> Age </label>
                        <input className={classes.form__input} type="text" value={age} onChange={(e) => handleInputChange(e)} id="Name" placeholder="In years" />
                    </div>

                    <div className={classes.dob}>
                        <label className={classes.form__label} for="dob" id="dob"> Date of birth </label>
                        <input className={classes.form__input} type="text" value={dob} onChange={(e) => handleInputChange(e)} id="Name" placeholder="dd/mm/yyyy" />
                    </div>


                    <div className={classes.address}>
                        <label className={classes.form__label} for="address">Address </label>
                        <input type="address" id="address" className={classes.form__input} value={address} onChange={(e) => handleInputChange(e)} placeholder="Address" />
                    </div>

                    <div className={classes.pincode}>
                        <label className={classes.form__label} for="address">Pincode </label>
                        <input type="pincode" id="pincode" className={classes.form__input} value={pincode} onChange={(e) => handleInputChange(e)} placeholder="Eg.695005" />
                    </div>


                    <div className={classes.userPhone}>
                        <label className={classes.form__label} for="userPhone">Contact number </label>
                        <input type="text" id="userPhone" className={classes.form__input} value={userPhone} onChange={(e) => handleInputChange(e)} placeholder="+91 " />
                    </div>

                    <div className={classes.status}>
                        <label>Marital status
                            <select name="">
                                <option disabled={isDisabled} >Select marital status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Widowed">Widowed</option>
                                <option value="Divorced">Divorced</option>
                            </select>
                        </label>
                    </div>

                    <div className={classes.income}>
                        <label className={classes.form__label} for="income">Annual Income </label>
                        <input type="text" id="income" className={classes.form__input} value={userPhone} onChange={(e) => handleInputChange(e)} placeholder="$" />
                    </div>

                    <div className={classes.Chitty_Type}>
                        <label>Chitty Type
                            <select name="">
                                <option disabled={isDisabled} value="">Select chitty type </option>
                                <option value="Onam">Onam</option>
                                <option value="Monsoon">Monsoon</option>
                                <option value="Autumn">Autumn</option>
                            </select>
                        </label>
                    </div>

                    <div className={classes.aadhar}>
                        <label className={classes.form__label} for="aadhar">Aadhar number </label>
                        <input type="text" id="aadhar" className={classes.form__input} value={aadhar} onChange={(e) => handleInputChange(e)} placeholder="Eg.2054 3605 7419 " />
                    </div>
                </div>

                <div className={classes.nominee}>
                    <h3>Nominee details</h3>
                    <div className={classes.nomineeName}>
                        <label className={classes.form__label} for="nomineeName">Name </label>
                        <input type="nomineeName" id="nomineeName" className={classes.form__input} value={nomineeName} onChange={(e) => handleInputChange(e)} placeholder="Name" />
                    </div>

                    <div className={classes.nomineeAge}>
                        <label className={classes.form__label} for="nomineeAge">Age </label>
                        <input type="nomineeAge" id="nomineeAge" className={classes.form__input} value={nomineeAge} onChange={(e) => handleInputChange(e)} placeholder="In years" />
                    </div>

                    <div className={classes.nomineedob}>
                        <label className="form__label" for="nomineedob" id="nomineedob"> Date of birth </label>
                        <input className={classes.form__input} type="text" value={nomineedob} onChange={(e) => handleInputChange(e)} id="nomineedob" placeholder="dd/mm/yyyy" />
                    </div>

                    <div className={classes.nomineeAddress}>
                        <label className="form__label" for="nomineeAddress">Address </label>
                        <input type="nomineeAddress" id="nomineeAddress" className={classes.form__input} value={nomineeAddress} onChange={(e) => handleInputChange(e)} placeholder="Address" />
                    </div>

                    <div className={classes.nomineePincode}>
                        <label className="form__label" for="nomineePincode"> Pincode </label>
                        <input type="nomineePincode" id="nomineePincode" className={classes.form__input} value={nomineePincode} onChange={(e) => handleInputChange(e)} placeholder="Eg.695005" />
                    </div>
                    <div className={classes.nomineeAd}>
                        <label className="form__label" for="nomineeAd"> Aadhar </label>
                        <input type="nomineeAd" id="nomineeAd" className={classes.form__input} value={nomineeAd} onChange={(e) => handleInputChange(e)} placeholder="Eg.2054 3605 7419" />
                    </div>

                    <div className={classes.nomineePhone}>
                        <label className={classes.form__label} for="nomineePhone">Contact number </label>
                        <input type="nomineePhone" id="nomineePhone" className={classes.form__input} value={nomineePhone} onChange={(e) => handleInputChange(e)} placeholder="+91  " />
                    </div>

                    <div className={classes.footer}>
                        <button onClick={() => handleSubmit()} type="submit" className={classes.btn}>Submit</button>
                    </div>
                </div>


                {/* </div> */}
            </div>
        </Fragment>
    )
}


export default ChittyForm;