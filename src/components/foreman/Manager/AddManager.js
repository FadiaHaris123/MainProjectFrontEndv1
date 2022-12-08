import { ClassNames } from '@emotion/react';
import React, { useState } from 'react';
import classes from './AddManager.module.css';
import axios from 'axios';

const AddManager=()=>{
	const[id,setId]=useState("");
	const[fname,setFname]=useState("");
	const[lname,setLname]=useState("");
	const[email,setEmail]=useState("");

	let handleSubmit=async(e)=>{
		e.preventDefault();
		try{
			axios.post("http://localhost:8080/api/managersadd",{
			emp_id:id,
			firstName:fname,
			emp_lastname:lname,
			email:email,
		});
	// let resJson=await res.json();
	
	setId("");
	setFname("");
	setLname("");
	setEmail("");
	
	}catch(err){
		console.log(err);
	}
	}
return(
    <div className={classes.manage}>
        <div className={classes.upload}>
            <div className={classes.filedata}>
				<form onSubmit={handleSubmit}>
					<input type="text" value={id} placeholder="Employee ID" onChange={(e)=>setId(e.target.value)}/>
					<input type="text" value={fname} placeholder="First Name" onChange={(e)=>setFname(e.target.value)}/>
					<input type="text" value={lname} placeholder="Last Name" onChange={(e)=>setLname(e.target.value)}/>
					<input type="text" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>

                    <div><button type="submit">Add</button></div>
                </form>
            </div>
        </div>
	</div>
)
}

export default AddManager;