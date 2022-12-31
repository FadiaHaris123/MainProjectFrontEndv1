import React, { useState, useEffect } from 'react';
import classes from './AddManager.module.css';
import Axios from 'axios';

const AddManager = () => {

  const url = "http://localhost:8080/addmanager"
  const [autoManagerId, setAutoManagerId] = useState("");

  function finalsubmit(e) {
    Axios.post(url, {
      emp_id: autoManagerId,
      firstName: formValues.firstName,
      emp_lastname: formValues.emp_lastname,
      email: formValues.email,
      mobileNumber: parseInt(formValues.mobileNumber),
      passWord: formValues.passWord,
      roleId: formValues.roleId,
      passWordStatus: formValues.passWordStatus
    },
      {
        headers: { 'Authorization': token }
      })
      .then(() => {
        alert("Manager added successfully")
        setAutoManagerId(autoManagerId + 1)
        setFormValues(initialValues)
      })
  }

  const initialValues = {
    emp_id: autoManagerId,
    firstName: "",
    emp_lastname: "",
    email: "",
    mobileNumber: "",
    passWord: "$2a$10$z5gwKRfEH3nTy5kquLIdeelC6eGZvyQ4AlKufhbpFWZMCUnQ459.a",
    roleId: 2,
    passWordStatus: 'default'
  };

  let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  function handle(e) {
    e.preventDefault();
    const { value, id } = e.target;
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
    setFormErrors(validate(value, id));
  }

  const validate = (values, id) => {
    const errors = {};
    const alphabets = /[a-zA-Z\s]/
    const mail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const symbols = /[!@#$%^&*(),.?":{}|<>]/g;
    const numbers = /\d+/g;
    if (id == "firstName") {
      if (values == '') {
        errors.firstName = "First Name is required!";
      } else if (symbols.test(values) || numbers.test(values)) {
        errors.firstName = "First Name is invalid";
      } else if (values.length < 3) {
        errors.firstName = "First Name should have more than 3 characters!";
      }
    } else if (id == "emp_lastname") {
      if (values == '') {
        errors.emp_lastname = "Last Name is required!";
      } else if (symbols.test(values) || numbers.test(values)) {
        errors.firstName = "Last Name is invalid";
      }
    } else if (id == "email") {
      if (values == '') {
        errors.email = "Email is required!";
      } else if (!mail.test(values)) {
        errors.email = "This is not a valid email format!";
      }
    } else if (id == "mobileNumber") {
      if (values == '') {
        errors.mobileNumber = "Mobile No. is required";
      } else if (alphabets.test(values) || values.length != 10) {
        errors.mobileNumber = "Mobile No. is not valid";
      }
    }
    return errors;
  };

  function submit(e) {
    e.preventDefault();
    if (formValues.firstName != '' && formValues.emp_lastname != '' && formValues.email != '' &&
      formValues.mobileNumber != '' && formErrors.firstName == null && formErrors.emp_lastname == null
      && formErrors.email == null && formErrors.mobileNumber == null) {
      finalsubmit(e);
    }
    else {
      setFormErrors(finalvalidate(formValues));
    }
  }

  const finalvalidate = (values) => {
    const errors = {};
    const alphabets = /[a-zA-Z\s]/
    const mail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const symbols = /[!@#$%^&*(),.?":{}|<>]/g;
    const numbers = /\d+/g;
    if (!values.firstName) {
      errors.firstName = "First Name is required!";
    } else if (symbols.test(values.firstName) || numbers.test(values.firstName)) {
      errors.firstName = "First Name is invalid";
    } else if (values.firstName.length < 3) {
      errors.firstName = "First Name should have more than 3 characters!";
    }
    if (!values.emp_lastname) {
      errors.emp_lastname = "Last Name is required!";
    } else if (symbols.test(values.emp_lastname) || numbers.test(values.emp_lastname)) {
      errors.firstName = "Last Name is invalid";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!mail.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.mobileNumber) {
      errors.mobileNumber = "Mobile No. is required";
    } else if (alphabets.test(values.mobileNumber) || values.mobileNumber.length != 10) {
      errors.mobileNumber = "Mobile No. is not valid";
    }
    return errors;
  };

  useEffect(() => {
    const fetchManagers = async () => {
      const response = await fetch(
        "http://localhost:8080/managers", {
        headers: { 'Authorization': token }
      });
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();
      if (responseData._embedded.manager.length === 0) {
        setAutoManagerId(1001);
      }
      else {
        const chitNewNum = responseData._embedded.manager.length + 1;
        setAutoManagerId(1000 + chitNewNum);
      }
    };
    fetchManagers();
  }, []);

  return (
    <div className={classes.manage}>
      <div className={classes.upload}>
        <div className={classes.filedata}>
          <form onSubmit={(e) => submit(e)}>
            <div className="form-group mt-3">
              <label>Employee Id</label>
              <span class="required">*</span>
              <input
                id="emp_id"
                value={autoManagerId}
                className="form-control mt-1"
                disabled
              />
            </div>
            <div className="form-group mt-3">
              <label>First Name</label>
              <span class="required">*</span>
              <input
                id="firstName"
                value={formValues.firstName}
                type="name"
                className="form-control mt-1"
                placeholder="e.g Anagha "
                onChange={(e) => handle(e)}
              />
            </div>
            <span className={classes.errormsg}>{formErrors.firstName}</span>
            <div className="form-group mt-3">
              <label>Last Name</label>
              <span class="required">*</span>
              <input
                id="emp_lastname"
                value={formValues.emp_lastname}
                type="name"
                className="form-control mt-1"
                placeholder="e.g Rajeev"
                onChange={(e) => handle(e)}
              />
            </div>
            <span className={classes.errormsg}>{formErrors.emp_lastname}</span>
            <div className="form-group mt-3">
              <label>Email</label>
              <span class="required">*</span>
              <input
                id="email"
                value={formValues.email}
                type="email"
                className="form-control mt-1"
                placeholder="e.g anagha@gmail.com"
                onChange={(e) => handle(e)}
              />
            </div>
            <span className={classes.errormsg}>{formErrors.email}</span>
            <div className="form-group mt-3">
              <label>Mobile No.</label>
              <span class="required">*</span>
              <input
                id="mobileNumber"
                value={formValues.mobileNumber}
                type="text"
                maxlength="10"
                className="form-control mt-1"
                placeholder="Mobile No."
                onChange={(e) => handle(e)}
              />
            </div>
            <span className={classes.errormsg}>{formErrors.mobileNumber}</span>
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