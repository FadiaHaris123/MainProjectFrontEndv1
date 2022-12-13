import { ClassNames } from '@emotion/react';
import React, { useState } from 'react';
import classes from './AddManager.module.css';
import Axios from 'axios';

const AddManager=()=>{
	const url = "http://localhost:8080/api/addmanager"

const [data,setData] = useState({
	emp_id:"",
	firstName:"",
	emp_lastname:"",
	email:"",
	mobileNumber:"",
	passWord:"manager@123"
})

function handle(e){
	const newdata = {...data}
	newdata[e.target.id] = e.target.value
	setData(newdata)
	console.log(newdata)
  }
  
  function submit(e){
	e.preventDefault();
	Axios.post(url,{
		emp_id:parseInt(data.emp_id),
		firstName:data.firstName,
		emp_lastname:data.emp_lastname,
		email:data.email,
		mobileNumber:parseInt(data.mobileNumber),
		passWord:data.passWord
	})
	.then(res=>{
	  if(res.data != null){
		alert("Manager added successfully")
	  }
	  console.log(res.data)
	})
  }
  
return(
    <div className={classes.manage}>
        <div className={classes.upload}>
            <div className={classes.filedata}>
			<form onSubmit={(e)=>submit(e)}>
			<div className="form-group mt-3">
              <label>Employee Id</label>
              <span class="required">*</span>
              <input
                onChange={(e)=>handle(e)}
                id="emp_id"
                value={data.emp_id}
                type="text"
                className="form-control mt-1"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>First Name</label>
              <span class="required">*</span>
              <input
                onChange={(e)=>handle(e)}
                id="firstName"
                value={data.firstName}
                type="name"
                className="form-control mt-1"
                placeholder="e.g Anagha "
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Last Name</label>
              <span class="required">*</span>
              <input
				onChange={(e)=>handle(e)}
				id="emp_lastname"
				value={data.emp_lastname}
                type="name"
                className="form-control mt-1"
                placeholder="e.g Rajeev"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <span class="required">*</span>
              <input
				onChange={(e)=>handle(e)}
				id="email"
				value={data.email}
                type="email"
                className="form-control mt-1"
                placeholder="e.g anagha@gmail.com"
              required/>
            </div>
            <div className="form-group mt-3">
              <label>Mobile No.</label>
              <span class="required">*</span>
              <input
              onChange={(e)=>handle(e)}
              id="mobileNumber"
              value={data.mobileNumber}
                type="text"
                className="form-control mt-1"
                placeholder="Mobile No."
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit">
                Add
              </button>
            </div>
         
        </form>
            </div>
        </div>
	</div>
)
}

export default AddManager;