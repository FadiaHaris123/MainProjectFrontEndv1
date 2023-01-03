import React, { useState, Fragment } from 'react';
import classes from './ChittyForm.module.css'
import NomineeForm from './NomineeForm';
import Axios from 'axios';
import Navbar from '../Navbar';
import TextField from '@material-ui/core/TextField';
//Form to add chittal details
const ChittyForm = () => {



    const chittyId = JSON.parse(sessionStorage.getItem('chittyId'));
    let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;
    let id = JSON.parse(sessionStorage.getItem('userId'));

    const url = "http://localhost:8080/chittal/add";
    const [chits, setChits] = useState([]);

    console.log(chittyId)
    const [chittalId, setChittalId] = useState(0);
    const [name, setName] = useState("");
    const [showNominee, setShowNominee] = useState(false);
    const [managerId, setManagerId] = useState([]);
    const [categoryId, setCategoryId] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [errorAgeMessage, setErrorAgeMessage] = useState('')
    const [errorPhoneMessage, setErrorPhoneMessage] = useState('')


    Axios.get(`http://localhost:8080/user-details/${id}`, {
        headers: {
            'Authorization': token
        }
    }
    )
        .then(response => {
            // console.log(response.data)
            setName(response.data.firstName + " " + response.data.lastName);
        })


    const initialValues={
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
    }

    const [chittalData, setChittalData] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    function handleInputChange(e) {
        e.preventDefault();
        const newdata = { ...chittalData }
        newdata[e.target.id] = e.target.value
        setChittalData(newdata)
        const { value, id } = e.target;
        setChittalData({ ...chittalData, [e.target.id]: e.target.value });
        setFormErrors(validate(value, id));
   
       

      
        // if(e.target.id === "age"){
        //     validateAge(e.target.value)
        // }
        // if(e.target.id === "userPhone"){
        //     validatePhoneNumber(e.target.value)
        // }
    }
    function handleAge(e){
        e.preventDefault();
        const newdatas = { ...chittalData }
        newdatas[`age`] = birthday
        setChittalData(newdatas)
        const { value, id } = e.target;
        setChittalData({ ...chittalData, [`age`]:birthday });
        setFormErrors(validate(value, id));
    }



    const [birthday, setBirthday] = useState('');
    const [dob, setDob] = useState('');

    console.log("dob", dob);
    console.log("dob", chittalData.dob);
    const handleFunction = (event) => {
        handleChange_age(event);
        
    }

    // const [ages,setAges]= useState(0);
    const calculate_age = (event) => {
        event.preventDefault();
        var today = new Date();
        var birthDate = new Date(dob);  // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age_now--;
        }
        setBirthday(age_now)
        
        // console.log("in side calculate",age_now);
        // const newdata = { ...chittalData }
        // newdata[`age`] = age_now
        console.log("new DOB:", age_now);
        // setChittalData(newdata)
        console.log("inside calculate", chittalData)
        console.log("age display", chittalData.age)
        

    }



    const handleChange_age = (event) => {
        event.preventDefault();
        const newdata = { ...chittalData }
        newdata[event.target.id] = event.target.value
        setChittalData(newdata)
        console.log("DOB:", event.target.value);
        console.log("DOB: aa", event.target.id);

        setDob(event.target.value)
        console.log("inside handle", chittalData)
        console.log("date display", chittalData.dob)
        calculate_age(event);
        const { value, id } = event.target;
        setChittalData({ ...chittalData, [event.target.id]: event.target.value });
        setFormErrors(validate(value, id));

    }



    const validate = (values, id) => {
        const errors = {};
        console.log("check" + values)
        const alphabets = /[a-zA-Z\s]/
        const add_check=/(?!^\d+$)^[a-zA-Z0-9\s,'-]{8,}$/ 
        const pin=/^[0-9]{6}$/
        const salary=/^[0-9]{3,}$/
        const aadhar=/(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)/
        if (id == "dob") {
          if (values == '') {
            errors.age = "Age is required!";
          }
     
        } else if (id == "address") {
          if (values == '') {
            errors.address = "Address is required!";
          }

        else if (!add_check.test(values)) {
            errors.address = "Invalid Address";
          
        }
          
        } else if (id == "pinCode") {
          if (values == '') {
            errors.pinCode = "Pincode is required!";
          } 
           else 
          if (!pin.test(values)) {
              errors.pinCode = "Invalid Pincode";
            }
     
        } else if (id == "userPhone") {
          if (values == '') {
            errors.userPhone = "Mobile No. is required";
          } else if (alphabets.test(values) || values.length != 10) {
            errors.userPhone = "Invalid Mobile Number";
          }
        } else if (id == "status") {
            if (values == '') {
              errors.status = "Select your status";
            }  else if (values == 'Select marital status') {
                errors.status = "Select your status";
              }
          }else if (id == "income") {
            if (values == '') {
              errors.status = "Income is required";
            } 
            else 
            if (!salary.test(values)) {
                errors.income = "Invalid income";
              }
            
          }else if (id == "aadhar") {
            if (values == '') {
              errors.aadhar = "Aadhar is required";
            } 
            else 
            if (!aadhar.test(values)) {
                errors.aadhar = "Invalid Aadhaar Number";
              }
          }
        return errors;
      };

    function handleSubmit(e) {
        e.preventDefault();
        if (chittalData.age != '' && chittalData.address != '' && chittalData.pinCode != '' &&
        chittalData.userPhone != ''&&
        chittalData.status != '' &&
        chittalData.income != '' &&
        chittalData.aadhar != '' && formErrors.age == null && formErrors.address == null
        && formErrors.pinCode == null && formErrors.userPhone == null && formErrors.status == null&& formErrors.income == null&& formErrors.aadhar == null) {
        finalsubmit(e);
      }
      else {
        setFormErrors(finalvalidate(chittalData));
      }
    }


    const finalvalidate = (values) => {
        const errors = {};
      
        const phone=/^[0-9]{10}$/
        const add_check=/(?!^\d+$)^[a-zA-Z0-9\s,'-]{8,}$/ 
        const pin=/^[0-9]{6}$/
        const salary=/^[0-9]{3,}$/
        const aadhar=/(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)/
        if (!values.dob) {
            errors.dob = "Select your date of birth!";
        }
        if (!values.age){
            errors.age = "Click the field to see your age!";
        }
    
        
        else if (values.age<18 ) {
            errors.age = "Minimum Age To Join The Chitty Is 18!";
          }
        if (!values.address) {
            errors.address = "Address is required!";
        }else if (!add_check.test(values.address)) {
            errors.address = "Invalid Address";
          
        }
        if (!values.pinCode) {
            errors.pinCode = "Pincode is required!";
        }
        else 
        if (!pin.test(values.pinCode)) {
            errors.pinCode = "Invalid Pincode";
          }
        if (!values.userPhone) {
            errors.userPhone = "Mobile Number is required!";
        }
        else 
        if (!phone.test(values.userPhone)) {
            errors.userPhone = "Invalid Mobile Number";
          }
        if (!values.status) {
            errors.status = "Select Your Status";
       
        }else if (values.status == 'Select marital status') {
            errors.status = "Select your status";
          }
        if (!values.income) {
            errors.income = "Income is required!";
        }
        else 
        if (!salary.test(values.income)) {
            errors.income = "Invalid income";
          }
        if (!values.aadhar) {
            errors.aadhar = "Aadhar Number is required!";
       
        }
        else 
        if (!aadhar.test(values.aadhar)) {
            errors.aadhar = "Invalid Aadhaar Number";
          }
        
        
        return errors;
      };


    function finalsubmit(e) {
        console.log("details",chittyId)
        console.log("userid",id)
        console.log("doos",chittalData.dob)
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
        }, {
            headers: {
                'Authorization': token
            }
        }
        )
            .then(res => {
                if (res.data != null) {
                    alert("Chittal Details added, Please add Nominee details")
                    fetchChitDetail();
                }
                setShowNominee(true);
             
                setChittalId(res.data.chittalId)
            })
    }
console.log("chitty",chittalData)
    const fetchChitDetail = () => {
        Axios.get(`http://localhost:8080/chitty/${chittyId}`,
            {
                headers: {
                    'Authorization': token
                }
            })
            .then((response) => {
                setChits(response.data);
            });
        getManagerId();
    }

    const getManagerId = () => {
        Axios.get(`http://localhost:8080/chitty/${chittyId}/manager`,
            {
                headers: {
                    'Authorization': token
                }
            }).then((response) => {
                setManagerId(response.data.emp_id);
            });
        getCategoryId();
    }

    const getCategoryId = () => {
        Axios.get(`http://localhost:8080/chitty/${chittyId}/category`,
            {
                headers: {
                    'Authorization': token
                }
            })
            .then((response) => {
                setCategoryId(response.data.id);
            });
    }


    Axios.get(`http://localhost:8080/chitty/${chittyId}/category`,
        {
            headers: {
                'Authorization': token

            }
        }).then((response) => {
            setCategoryName(response.data.categoryName);
        });



    return (
        <Fragment>
            <Navbar />
            <h2 className={classes.head}>Chitty Application Form</h2>
            <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
                <br></br>

                <div className={classes.form_body}>
                    <h3 className={classes.head1}>Chittal details</h3>
                    <div>
                        <label className={classes.form__label} for="Name" id="name"> Name: </label>
                        <input className={classes.form__input} readOnly id="Name" value={name} />
                    </div>
                    


                    <div className={classes.dob}>
                        <label className={classes.form__label} for="dob"> Date of birth:<span class="required">*</span> </label>

                        <input className={classes.form__input} type="date" value={chittalData.dob} onChange={(e) => handleFunction(e)} id="dob" placeholder="yyyy-mm-dd"/>
                    </div>
                    <span className={classes.errormsg}>{formErrors.dob}</span>


                    <div>
                        <label className={classes.form__label} for="age"> Age:<span class="required">*</span> </label>

                        <input className={classes.form__input} type="text" min="18" max="70" value={chittalData.age} onClick={(e) => handleAge(e)} id="age" placeholder="In years" readOnly />
                    </div>
                    <span className={classes.errormsg}>{formErrors.age}</span>
                    
                    <div className={classes.address}>
                        <label className={classes.form__label} for="address">Address <span class="required">*</span></label>
                        <input type="address" id="address" className={classes.form__input} value={chittalData.address} onChange={(e) => handleInputChange(e)} placeholder="Address" />
                    </div>
                    <span className={classes.errormsg}>{formErrors.address}</span>

                    <div className={classes.pincode}>
                        <label className={classes.form__label} for="pincode">Pincode: <span class="required">*</span></label>
                        <input id="pinCode" type="text" maxlength="6" className={classes.form__input} value={chittalData.pinCode} onChange={(e) => handleInputChange(e)} placeholder="Eg. 695005" />
                    </div>
                    <span className={classes.errormsg}>{formErrors.pinCode}</span>

                    <div className={classes.userPhone}>
                        <label className={classes.form__label} for="userPhone">Contact number: <span class="required">*</span> </label>
                        <input type="text" id="userPhone" className={classes.form__input} value={chittalData.userPhone} onChange={(e) => handleInputChange(e)}  maxlength="10" placeholder="Eg. 9823128912" /><br />
                        {/* {errorPhoneMessage === '' ? null : <span className={classes.errorMessage}>{errorPhoneMessage}</span>} */}
                    </div>
                    <span className={classes.errormsg}>{formErrors.userPhone}</span>

                    <br></br>
                    <div className={classes.status}>

                        <label className={classes.form__label}>Marital status:
                            <select name="" className={classes.form__input} id="status" value={chittalData.status} onChange={(e) => handleInputChange(e)} >
                                <option>Select marital status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                            </select>
                        </label>
                    </div>
                    <span className={classes.errormsg}>{formErrors.status}</span>

                    <div className={classes.income}>
                        <label className={classes.form__label} for="income">Annual Income: <span class="required">*</span></label>
                        <input type="text" id="income" className={classes.form__input} value={chittalData.income} maxlength="8" onChange={(e) => handleInputChange(e)} placeholder="₹" />
                    </div>
                     <span className={classes.errormsg}>{formErrors.income}</span>

                    <div className={classes.Chitty_Type}>
                        <label className={classes.form__label}>Chitty Type:</label>
                        <input className={classes.form__input} readOnly value={categoryName} />
                    </div>

                    <div className={classes.aadhar}>
                        <label className={classes.form__label} for="aadhar">Aadhar number: <span class="required">*</span> </label>
                        <input type="text" id="aadhar" maxlength="12" className={classes.form__input} value={chittalData.aadhar} onChange={(e) => handleInputChange(e)} placeholder="Eg. 205436057419" />
                    </div>
                    <span className={classes.errormsg}>{formErrors.aadhar}</span>
                </div>

                <div className={classes.footer}>
                    <button type="submit" className={classes.btn}>Next</button>
                </div>
            </form>
            <div className={classes.nominee}>
                {showNominee && <NomineeForm chittalId={chittalId} chits={chits} managerId={managerId} categoryId={categoryId} />}
            </div>
        </Fragment>
    )
}

export default ChittyForm;