import { ClassNames } from '@emotion/react';
import React, { useState } from 'react';
import classes from './AddManager.module.css';
import Axios from 'axios';

const AddManager = () => {
  const url = "http://localhost:8080/addmanager"
  let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;

  const [data, setData] = useState({
    emp_id: "",
    firstName: "",
    emp_lastname: "",
    email: "",
    mobileNumber: "",
    passWord: "$2a$10$z5gwKRfEH3nTy5kquLIdeelC6eGZvyQ4AlKufhbpFWZMCUnQ459.a",
    roleId: 2
  })

  const [message, setMessage] = useState('')

  const findErrors = () => {
    const errors = []
    if (!data.emp_id || !data.firstName || !data.emp_lastname || !data.email
      || !data.mobileNumber) errors.push('All fields must be filled in')
    else if (data.firstName.length !== 10) errors.push('First name length')
    return errors
  }

  function handle(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }

  function submit(e) {
    e.preventDefault();
    const errors = findErrors()
    setMessage(errors)
    Axios.post(url, {
      emp_id: parseInt(data.emp_id),
      firstName: data.firstName,
      emp_lastname: data.emp_lastname,
      email: data.email,
      mobileNumber: parseInt(data.mobileNumber),
      passWord: data.passWord,
      roleId: data.roleId
    }, {
      headers: {
        'Authorization': token

      }
    })
      .then(res => {
        if (res.data != null) {
          alert("Manager added successfully")
        }
        console.log(res.data)
      })
  }

  return (
    <div className={classes.manage}>
      <div className={classes.upload}>
        <div className={classes.filedata}>
          <form onSubmit={(e) => submit(e)}>
            <div className="form-group mt-3">
              <label>Employee Id</label>
              <span class="required">*</span>
              <input
                onChange={(e) => handle(e)}
                id="emp_id"
                value={data.emp_id}
                type="text"
                className="form-control mt-1"
              />
            </div>
            {message}
            <div className="form-group mt-3">
              <label>First Name</label>
              <span class="required">*</span>
              <input
                onChange={(e) => handle(e)}
                id="firstName"
                value={data.firstName}
                type="name"
                className="form-control mt-1"
                placeholder="e.g Anagha "
              />
            </div>
            <div className="form-group mt-3">
              <label>Last Name</label>
              <span class="required">*</span>
              <input
                onChange={(e) => handle(e)}
                id="emp_lastname"
                value={data.emp_lastname}
                type="name"
                className="form-control mt-1"
                placeholder="e.g Rajeev"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <span class="required">*</span>
              <input
                onChange={(e) => handle(e)}
                id="email"
                value={data.email}
                type="email"
                className="form-control mt-1"
                placeholder="e.g anagha@gmail.com" />
            </div>
            <div className="form-group mt-3">
              <label>Mobile No.</label>
              <span class="required">*</span>
              <input
                onChange={(e) => handle(e)}
                id="mobileNumber"
                value={data.mobileNumber}
                type="text"
                className="form-control mt-1"
                placeholder="Mobile No."
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