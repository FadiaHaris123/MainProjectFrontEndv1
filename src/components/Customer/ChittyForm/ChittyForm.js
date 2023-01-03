import React, { useState, Fragment } from 'react';
import classes from './ChittyForm.module.css'
import NomineeForm from './NomineeForm';
import Axios from 'axios';
import Navbar from '../Navbar';

//Form to add chittal details
function ChittyForm() {

    console.log("In chitty form")
    const [errorMessage, setErrorMessage] = useState('')
    let chittyId = JSON.parse(sessionStorage.getItem('chittyId'));
  
    const url = "http://localhost:8080/chittal/add";
    const [chits, setChits] = useState([]);
    const [chittalId, setChittalId] = useState(0);
    const [name, setName] = useState("");
    const [showNominee, setShowNominee] = useState(false);
    const [managerId, setManagerId] = useState([]);
    const [categoryId, setCategoryId] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;
    let id = JSON.parse(sessionStorage.getItem('userId'));

    Axios.get(`http://localhost:8080/user-details/${id}`,{
    headers:{
        'Authorization':token
    }}
    )
  .then(response=>{
    // console.log(response.data)
    setName(response.data.firstName+" "+response.data.lastName);
  })


    const [chittalData, setChittalData] = useState({
        userId: "",
        chittyId: "",
        age: "",
        address: "",
        pinCode: "",
        userPhone: "",
        dob: "",
        status: "",
        income: "",
        aadhar: ""
    })

    function handleInputChange(e) {
        const newdata = { ...chittalData }
        newdata[e.target.id] = e.target.value
        setChittalData(newdata)
        if(e.target.id === "userPhone"){
            validatePhoneNumber(e.target.value)
        }
    }

    function validatePhoneNumber(value)
    {
        const indiaRegex = /\d{10}/;
        if(value.match(indiaRegex)) {
            setErrorMessage("")    
        } else {
            setErrorMessage("Not Valid Phone Number")
        }
    }


    function handleSubmit(e) {
        e.preventDefault();
        Axios.post(url, {
            userId: id,
            chittyId: chittyId,
            age: parseInt(chittalData.age),
            address: chittalData.address,
            pinCode: chittalData.pinCode,
            userPhone: parseInt(chittalData.userPhone),
            dob: chittalData.dob,
            status: chittalData.status,
            income: chittalData.income,
            aadhar: chittalData.aadhar
        },{
            headers:{
              'Authorization':token  
            }}
        )
        .then(res => {
                if (res.data != null) {
                    alert("Chittal Details added, Please add Nominee details")
                    fetchChitDetail();
                }
                setShowNominee(true);
                console.log(res.data.chittalId)
                setChittalId(res.data.chittalId)
            })
    }

    const fetchChitDetail = () => {
        Axios.get(`http://localhost:8080/chitty/${chittyId}`,
        {
            headers:{
              'Authorization':token  
        }})
        .then((response) => {
            setChits(response.data);
        });
        getManagerId();
    }

    const getManagerId = () => {
        Axios.get(`http://localhost:8080/chitty/${chittyId}/manager`,
        {
            headers:{
              'Authorization':token 
            }}).then((response) => {
            setManagerId(response.data.emp_id);
        });
        getCategoryId();
    }

    const getCategoryId = () => {
        Axios.get(`http://localhost:8080/chitty/${chittyId}/category`,
        {
            headers:{
              'Authorization':token
            }})
            .then((response) => {
            setCategoryId(response.data.id);
        });
    }

    
        Axios.get(`http://localhost:8080/chitty/${chittyId}/category`,
        {
            headers:{
              'Authorization':token
              
            }}).then((response) => {
            setCategoryName(response.data.categoryName);
        });

    return (
        <Fragment>
            <Navbar/>
            <h2 className={classes.head}>Chitty Application Form</h2>
            <form onSubmit={handleSubmit} className={classes.form}>
                <br></br>

                <div className={classes.form_body}>
                    <h3 className={classes.head1}>Chittal details</h3>
                    <div>
                        <label className={classes.form__label} for="Name" id="name"> Name: </label>
                        <input className={classes.form__input}  readOnly id="Name" value={name} required />
                    </div>
                    <div>
                        <label className={classes.form__label} for="age"> Age:<span class="required">*</span> </label>
                        <input className={classes.form__input} type="number" min="18" max="70" value={chittalData.age} onChange={(e) => handleInputChange(e)} id="age" placeholder="In years"  required/>
                    </div>

                    <div className={classes.dob}>
                        <label className={classes.form__label} for="dob"> Date of birth:<span class="required">*</span> </label>
                        
                        <input className={classes.form__input} type="text" value={chittalData.dob} onChange={(e) => handleInputChange(e)} id="dob" placeholder="yyyy-mm-dd" required/>
                    </div>

                    <div className={classes.address}>
                        <label className={classes.form__label} for="address">Address <span class="required">*</span></label> 
                        <input type="address" id="address" className={classes.form__input} value={chittalData.address} onChange={(e) => handleInputChange(e)} placeholder="Address" required/>
                    </div>

                    <div className={classes.pincode}>
                        <label className={classes.form__label} for="pincode">Pincode: <span class="required">*</span></label>
                        <input  id="pinCode" type="text"  maxlength="6" className={classes.form__input} value={chittalData.pinCode} onChange={(e) => handleInputChange(e)} placeholder="Eg.695005" required/>
                    </div>

                    <div className={classes.userPhone}>
                        <label className={classes.form__label} for="userPhone">Contact number: <span class="required">*</span> </label>
                        <input type="text"  id="userPhone" maxlength="10" className={classes.form__input} value={chittalData.userPhone} onChange={(e) => handleInputChange(e)} required /><br/>
                        {errorMessage === '' ? null :<span className={classes.errorMessage}>{errorMessage}</span>}
                    </div>

                    <br></br>
                    <div className={classes.status}>
                      
                        <label className={classes.form__label}>Marital status:
                            <select name="" className={classes.form__input} id="status" value={chittalData.status} onChange={(e) => handleInputChange(e)} required>
                                <option>Select marital status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                            </select>
                        </label>
                    </div>

                    <div className={classes.income}>
                        <label className={classes.form__label} for="income">Annual Income: <span class="required">*</span></label>
                        <input type="text"  id="income" className={classes.form__input} value={chittalData.income} onChange={(e) => handleInputChange(e)} placeholder="₹" required/>
                    </div>

                    <div className={classes.Chitty_Type}>
                        <label className={classes.form__label}>Chitty Type:</label>
                        <input className={classes.form__input}  readOnly  value={categoryName} />
                    </div>

                    <div className={classes.aadhar}>
                        <label className={classes.form__label} for="aadhar">Aadhar number: <span class="required">*</span> </label>
                        <input type="text" id="aadhar" maxlength="12" className={classes.form__input} value={chittalData.aadhar} onChange={(e) => handleInputChange(e)} placeholder="Eg.2054 3605 7419 " re />
                    </div>
                </div>

                <div className={classes.footer}>
                    <button type="submit" className={classes.btn}>Next</button>
                </div>
            </form>
            <div className={classes.nominee}>
                {showNominee && <NomineeForm chittalId={chittalId} chits={chits} managerId={managerId} categoryId={categoryId}/>}
            </div>   
        </Fragment>
    )
}

export default ChittyForm;