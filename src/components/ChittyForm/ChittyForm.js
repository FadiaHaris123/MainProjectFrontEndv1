import React, {useState,setState} from 'react';
import './ChittyForm.css'
import Header from './Header/Header'
import Image from './Header/form.jpg'
import { getByDisplayValue } from '@testing-library/react';
import { isDOMComponent } from 'react-dom/test-utils';
import { isDisabled } from '@testing-library/user-event/dist/utils';

function ChittyForm() {

    const [Name, setName] = useState(null);
    const [age, setage] = useState(null);
    const [address, setaddress] = useState(null);
    const [pincode, setpincode] = useState(null);
    const [userPhone, setuserPhone] = useState(null);
    const [dob, setdob] = useState(null);
    const [status,setstatus]=useState(null);
    const [income, setincome] = useState(null);
    const [nomineeName,setnomineeName]=useState(null);
    const [nomineeAge,setnomineeAge]=useState(null);
    const [chittyType,setchittyType]=useState(null);
    const [aadhar,setaadhar]=useState(null);
    const [nomineedob, setnomineedob] = useState(null);
    const [nomineePhone,setnomineePhone]=useState(null);
    const [nomineeAddress,setnomineeAddress]=useState(null);
    const [nomineePincode,setnomineePincode]=useState(null);
    const [nomineeAd,setnomineeAd]=useState(null);
    const [date,setDate]=useState("")

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "Name"){
            setName(value);
        }
        
        if(id === "age"){
            setage(value);
        }

        if(id === "dob"){
            setdob(value);
        }

        
        if(id === "nomineedob"){
            setnomineedob(value);
        }
        
        if(id === "address"){
            setaddress(value);
        }

        if(id === "pincode"){
            setpincode(value);
        }
        if(id === "userPhone"){
            setuserPhone(userPhone);
        }
        if(id === "status"){
            setstatus(status);
        }
        if(id === "income"){
            setincome(income);
        }
        if(id === "nomineeName"){
            setnomineeName(value);
        }

        if(id === "nomineeAge"){
            setnomineeAge(value);
        }
        if(id === "chittyType"){
            setchittyType(value);
        }
        if(id === "aadhar"){
            setaadhar(value);
        }
        if(id === "nomineePhone"){
            setnomineePhone(value);
        }

        if(id === "nomineePincode"){
            setnomineePincode(value);
        }
        if(id === "nomineeAddress"){
            setnomineeAddress(value);
        }

        if(id === "nomineeAd"){
            setnomineeAd(value);
        }
    }

    const handleSubmit  = () => {
        console.log(Name,age,dob,address,nomineedob,pincode,userPhone,status,income,chittyType,aadhar,nomineeName,nomineeAge,nomineePincode,nomineePhone,nomineeAddress,nomineeAd);
    }

    return(
        // <header style={ HeaderStyle }>
        <div className="form">
            <Header></Header>

            {/* <h1>Chitty Application Form</h1> */}
            <br></br>
            
            <div className="form-body">
                <h2>Member details</h2>
                <div className="username">
                    <label className="form__label" for="Name" id="name"> Name </label>
                    <input className="form__input" type="text" value={Name} onChange = {(e) => handleInputChange(e)} id="Name" placeholder="Name"/>
                </div>
                <div className="age">
                    <label className="form__label" for="age" id="age"> Age </label>
                    <input className="form__input" type="text" value={age} onChange = {(e) => handleInputChange(e)} id="Naageme" placeholder="In years"/>
                </div>

                <div className="dob">
                    <label className="form__label" for="dob" id="dob"> Date of birth </label>
                    <input className="form__input" type="text" value={dob} onChange = {(e) => handleInputChange(e)} id="Naageme" placeholder="dd/mm/yyyy"/>
                </div>


                <div className="address">
                    <label className="form__label" for="address">Address </label>
                    <input  type="address" id="address" className="form__input" value={address} onChange = {(e) => handleInputChange(e)} placeholder="Address"/>
                </div>

                <div className="pincode">
                    <label className="form__label" for="address">Pincode </label>
                    <input  type="pincode" id="pincode" className="form__input" value={pincode} onChange = {(e) => handleInputChange(e)} placeholder="Eg.695005"/>
                </div>
                <div className="userPhone">
                    <label className="form__label" for="userPhone">Contact number </label>
                    <input  type="text" id="userPhone" className="form__input" value={userPhone} onChange = {(e) => handleInputChange(e)} placeholder="+91 "/>
                </div>

                <div className="status ">
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

                <div className="income">
                    <label className="form__label" for="income">Annual Income </label>
                    <input  type="text" id="income" className="form__input" value={userPhone} onChange = {(e) => handleInputChange(e)} placeholder="$"/>
                </div>
                
                <div className="Chitty Type ">
                    <label>Chitty Type
                    <select name="">
                    <option disabled={isDisabled} value="">Select chitty type </option>
                    <option value="Onam">Onam</option>
                    <option value="Monsoon">Monsoon</option>
                    <option value="Autumn">Autumn</option>
                </select>
                </label>
                </div>

                <div className="aadhar">
                    <label className="form__label" for="aadhar">Aadhar number </label>
                    <input  type="text" id="aadhar" className="form__input" value={aadhar} onChange = {(e) => handleInputChange(e)} placeholder="Eg.2054 3605 7419 "/>
                </div>
                </div>
                
                <div className='nominee'>
                <h2>Nominee details</h2>
                <div className="nomineeName">
                    <label className="form__label" for="nomineeName">Name </label>
                    <input  type="nomineeName" id="nomineeName" className="form__input" value={nomineeName} onChange = {(e) => handleInputChange(e)} placeholder="Name"/>
                </div>

                <div className="nomineeAge">
                    <label className="form__label" for="nomineeAge">Age </label>
                    <input  type="nomineeAge" id="nomineeAge" className="form__input" value={nomineeAge} onChange = {(e) => handleInputChange(e)} placeholder="In years"/>
                </div>

                <div className="nomineedob">
                    <label className="form__label" for="nomineedob" id="nomineedob"> Date of birth </label>
                    <input className="form__input" type="text" value={nomineedob} onChange = {(e) => handleInputChange(e)} id="nomineedob" placeholder="dd/mm/yyyy"/>
                </div>

                <div className="nomineeAddress">
                    <label className="form__label" for="nomineeAddress">Address </label>
                    <input  type="nomineeAddress" id="nomineeAddress" className="form__input" value={nomineeAddress} onChange = {(e) => handleInputChange(e)} placeholder="Address"/>
                </div>

                <div className="nomineePincode">
                    <label className="form__label" for="nomineePincode"> Pincode </label>
                    <input  type="nomineePincode" id="nomineePincode" className="form__input" value={nomineePincode} onChange = {(e) => handleInputChange(e)} placeholder="Eg.695005"/>
                </div>
                <div className="nomineeAd">
                    <label className="form__label" for="nomineeAd"> Aadhar </label>
                    <input  type="nomineeAd" id="nomineeAd" className="form__input" value={nomineeAd} onChange = {(e) => handleInputChange(e)} placeholder="Eg.2054 3605 7419"/>
                </div>

                <div className="nomineePhone">
                    <label className="form__label" for="nomineePhone">Contact number </label>
                    <input  type="nomineePhone" id="nomineePhone" className="form__input" value={nomineePhone} onChange = {(e) => handleInputChange(e)} placeholder="+91  "/>
                </div>
               
                <div class="footer">
                <button onClick={()=>handleSubmit()} type="submit" class="btn">Submit</button>
            </div>
                </div>
                
                
            {/* </div> */}
            </div>
        
    )       
}

const HeaderStyle = {
    width: "210vh",
    height: "100vh",
    background: `url(${Image})`,
    backgroundPosition:'fixed',
    backgroundRepeat: "no-repeat",
    backgroundSize: "120% 120%",
    backgroundAttachment: "fixed"
  }

export default ChittyForm;