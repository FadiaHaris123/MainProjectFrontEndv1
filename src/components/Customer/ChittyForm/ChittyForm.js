import React, { useState,setState, Fragment } from 'react';
import { Link,useLocation } from "react-router-dom"
import classes from './ChittyForm.module.css'
import Header from './Header/Header'
import Image from './Header/form.jpg'
import { getByDisplayValue } from '@testing-library/react';
import { isDOMComponent } from 'react-dom/test-utils';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import NomineeForm from './NomineeForm';
import Axios from 'axios';

function ChittyForm() {

  let location = useLocation();
  const chittyId = location.state.id;
    const url= "http://localhost:8080/api/chittal/add";
    const [chittalId,setChittalId] = useState(0);
    const [showNominee, setShowNominee] = useState(false);
    const id = window.localStorage.getItem('userId');
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

    function handleInputChange(e){
        const newdata = {...chittalData}
        newdata[e.target.id] = e.target.value
        setChittalData(newdata)
        console.log(newdata)
    }
    
    function handleSubmit(e){
        e.preventDefault();
        Axios.post(url,{
            userId:id,
            chittyId:parseInt(chittyId),
            age:parseInt(chittalData.age),
            address:chittalData.address,
            pinCode:chittalData.pinCode,
            userPhone:parseInt(chittalData.userPhone),
            dob:chittalData.dob,
            status:chittalData.status,
            income:chittalData.income,
            aadhar:chittalData.aadhar
        })
        .then(res=>{
          if(res.data != null){
            alert("Chittal added")
          }
        //   console.log("chittalID"+res.data.chittalId)
        // when chittal information is passed chittal id is obtained as response
          setChittalId(res.data.chittalId)
        })
        setShowNominee(true);
      }
         
 
    return (
        <Fragment>
            <Header/>
            <div className={classes.form}>
                <br></br>

                <div className={classes.form_body}>
                    <h3>Member details</h3>
                    <div>
                        <label className={classes.form__label} for="Name" id="name"> Name </label>
                        <input className={classes.form__input} type="text"  id="Name" placeholder="Name" />
                    </div>
                    <div>
                        <label className={classes.form__label} for="age"> Age </label>
                        <input className={classes.form__input} type="text" value={chittalData.age} onChange={(e) => handleInputChange(e)} id="age" placeholder="In years" />
                    </div>

                    <div className={classes.dob}>
                        <label className={classes.form__label} for="dob"> Date of birth </label>
                        <input className={classes.form__input} type="text" value={chittalData.dob} onChange={(e) => handleInputChange(e)} id="dob" placeholder="yyyy-mm-dd" />
                    </div>


                    <div className={classes.address}>
                        <label className={classes.form__label} for="address">Address </label>
                        <input type="address" id="address" className={classes.form__input} value={chittalData.address} onChange={(e) => handleInputChange(e)} placeholder="Address" />
                    </div>

                    <div className={classes.pincode}>
                        <label className={classes.form__label} for="address">Pincode </label>
                        <input type="pincode" id="pinCode" className={classes.form__input} value={chittalData.pinCode} onChange={(e) => handleInputChange(e)} placeholder="Eg.695005" />
                    </div>


                    <div className={classes.userPhone}>
                        <label className={classes.form__label} for="userPhone">Contact number </label>
                        <input type="text" id="userPhone" className={classes.form__input} value={chittalData.userPhone} onChange={(e) => handleInputChange(e)} placeholder="+91 " />
                    </div>

                    <div className={classes.status}>
                        <label>Marital status
                            <select name="">
                                <option disabled={isDisabled} value={chittalData.status} >Select marital status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                            </select>
                        </label>
                    </div>

                    <div className={classes.income}>
                        <label className={classes.form__label} for="income">Annual Income </label>
                        <input type="text" id="income" className={classes.form__input} value={chittalData.income} onChange={(e) => handleInputChange(e)} placeholder="$" />
                    </div>

                    <div className={classes.Chitty_Type}>
                        <label>Chitty Type
                            <select name="">
                                <option disabled={isDisabled}>Select chitty type </option>
                                <option value="Onam">Onam</option>
                                <option value="Monsoon">Monsoon</option>
                                <option value="Autumn">Autumn</option>
                            </select>
                        </label>
                    </div>

                    <div className={classes.aadhar}>
                        <label className={classes.form__label} for="aadhar">Aadhar number </label>
                        <input type="text" id="aadhar" className={classes.form__input} value={chittalData.aadhar} onChange={(e) => handleInputChange(e)} placeholder="Eg.2054 3605 7419 " />
                    </div>
                </div>

                <div className={classes.footer}>
                
                    <button onClick={handleSubmit} type="submit" className={classes.btn}>Next</button>
              {showNominee && <NomineeForm chittalId={chittalId}/>}
                </div>
            </div>
        </Fragment>
    )
}


export default ChittyForm;