import React, {useState,setState} from 'react';
import classes from './ChittyForm.module.css'
// import Image from '../assets/chitty1.avif'
import Header from './Header/Header'


function ChittyForm() {
    
    const [Name, setName] = useState(null);
    const [address, setaddress] = useState(null);
    const [userPhone, setuserPhone] = useState(null);
    const [status,setstatus]=useState(null);
    const [income, setincome] = useState(null);
    const [nomineeName,setnomineeName]=useState(null);
    const [chittyType,setchittyType]=useState(null);
    const [nomineePhone,setnomineePhone]=useState(null);
    const [nomineeAddress,setnomineeAddress]=useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "Name"){
            setName(value);
        }
        
        if(id === "address"){
            setaddress(value);
        }
        if(id === "userPhone"){
            setuserPhone(userPhone);
        }
        if(id === "status"){
            setstatus(status);
        }
        if(id === "nomineeName"){
            setnomineeName(value);
        }
        if(id === "chittyType"){
            setchittyType(value);
        }
        if(id === "nomineePhone"){
            setnomineePhone(value);
        }
        if(id === "nomineeAddress"){
            setnomineeAddress(value);
        }

        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }

    const handleSubmit  = () => {
        console.log(Name,address,userPhone,status,chittyType,nomineeName,nomineePhone,nomineeAddress,password,confirmPassword);
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
                    <label className="form__label" for="Name"> Name </label>
                    <input className="form__input" type="text" value={Name} onChange = {(e) => handleInputChange(e)} id="Name" placeholder="Name"/>
                </div>
                <div className="address">
                    <label className="form__label" for="address">Address </label>
                    <input  type="address" id="address" className="form__input" value={address} onChange = {(e) => handleInputChange(e)} placeholder="Address"/>
                </div>
                <div className="userPhone">
                    <label className="form__label" for="userPhone">Contact number </label>
                    <input  type="text" id="userPhone" className="form__input" value={userPhone} onChange = {(e) => handleInputChange(e)} placeholder="+91 "/>
                </div>

                <div className="status ">
                    <label>Marital status
                    <select name="">
                    {/* <option value="">Select marital status </option> */}
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Divorced">Divorced</option>
                </select>
                </label>
                </div>
                
                <div className="Chitty Type ">
                    <label>Chitty Type
                    <select name="">
                    {/* <option value="">Select chitty type </option> */}
                    <option value="Onam">Onam</option>
                    <option value="Monsoon">Monsoon</option>
                    <option value="Autumn">Autumn</option>
                </select>
                </label>
                </div>
                <h2>Nominee details</h2>
                <div className="nomineeName">
                    <label className="form__label" for="nomineeName">Name </label>
                    <input  type="nomineeName" id="nomineeName" className="form__input" value={nomineeName} onChange = {(e) => handleInputChange(e)} placeholder="nomineeName"/>
                </div>
                <div className="nomineePhone">
                    <label className="form__label" for="nomineePhone">Contact number </label>
                    <input  type="nomineePhone" id="nomineePhone" className="form__input" value={nomineePhone} onChange = {(e) => handleInputChange(e)} placeholder="+91  "/>
                </div>
                <div className="nomineeAddress">
                    <label className="form__label" for="nomineeAddress">Address </label>
                    <input  type="nomineeAddress" id="nomineeAddress" className="form__input" value={nomineeAddress} onChange = {(e) => handleInputChange(e)} placeholder="Address"/>
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
                <div className="confirm-password">
                    <label className="form__label" for="confirmPassword">Confirm Password </label>
                    <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                </div>
            </div>
            <div class="footer">
                <button onClick={()=>handleSubmit()} type="submit" class="btn">Submit</button>
            </div>
        </div>
        // </header>
       
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