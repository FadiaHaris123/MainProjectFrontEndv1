import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import classes from './LaunchForm.module.css';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const LaunchForm = () => {

  const [autoChitId, setAutoChitId] = useState("");
  let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;
  const getchittyurl = "http://localhost:8080/chitty"
  const url = "http://localhost:8080/chitty/add"
  const [formErrors, setFormErrors] = useState({});

  const [data, setData] = useState({
    chitNumber: "",
    manager: "",
    duration: "",
    installment: "",
    total: "",
    currentNumberOfChittal: 0,
    category: "",
    launchDate: "",
    startDate: null,
    status: "launched"
  })

  const [formValues, setFormValues] = useState(data);

  function submit(e) {
    e.preventDefault();
    if (formValues.category != '' && formValues.manager != '' && formValues.duration != ''
      && formValues.total != '' && formValues.installment != '' &&
      formErrors.category == null && formErrors.manager == null
      && formErrors.duration == null && formErrors.installment == null) {
      finalsubmit(e);
    }
    else {
      setFormErrors(validate(formValues));
    }
  }

  function validate(value) {
    const errors = {}
    console.log(value)
    if (value.category == '' || value.manager == '' || value.duration == '' ||
      value.installment == '' || value.total == '') {
      errors.message = "All fields are mandatory"
    }
    return errors
  };

  const history = useHistory();

  function finalsubmit(e) {
    e.preventDefault();
    Axios.post(url, {
      chitNumber: autoChitId,
      installment: parseInt(amount),
      duration: parseInt(installments),
      manager: parseInt(employeeId),
      numberOfChittal: parseInt(installments),
      currentNumberOfChittal: parseInt(data.currentNumberOfChittal),
      category: parseInt(chittyCategoryId),
      totalAmount: totalAmount,
      launchDate: formattedlaunchDate,
      startDate: data.startDate,
      status: data.status
    }, {
      headers: {
        'Authorization': token
      }
    })
      .then(res => {
        if (res.data != null) {
          alert("Chitty launched successfully")
          history.push("/admin/launchedchits")
        }
      })
  }

  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }

  var launchDate = new Date();
  var month = pad2(launchDate.getMonth() + 1);//months (0-11)
  var day = pad2(launchDate.getDate());//day (1-31)
  var year = launchDate.getFullYear();

  var formattedlaunchDate = year + "-" + month + "-" + day;

  const [chittyCategoryId, setChittyCategoryId] = useState()
  const [employeeId, setEmployeeId] = useState()
  const [installments, setInstallments] = useState(0)
  const [amount, setAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [manager, setManager] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchChittiess = async () => {
      const response = await fetch(
        getchittyurl, {
        headers: {
          'Authorization': token
        }
      });

      const responseData = await response.json();
      if (responseData._embedded.chitty.length === 0) {
        setAutoChitId("EM" + 1 + "_" + year);
      }
      else {
        const chitNewNum = responseData._embedded.chitty.length + 1;
        setAutoChitId("EM" + chitNewNum + "_" + year);
      }
    };
    fetchChittiess();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(
        'http://localhost:8080/managers', {
        headers: {
          'Authorization': token
        }
      });
      const responseData = await response.json();

      const loadedManager = [];
      const newItemList = [...responseData._embedded.manager]
      for (const key in newItemList) {
        loadedManager.push({
          id: key,
          emp_id: newItemList[key].emp_id,
          firstName: newItemList[key].firstName,
          emp_lastname: newItemList[key].emp_lastname,
          email: newItemList[key].email,
        });
      }

      setManager(loadedManager);
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchChittyCategory = async () => {
      const response = await fetch(
        'http://localhost:8080/chittycategory',
        {
          headers: {
            'Authorization': token
          }
        });
      const responseData = await response.json();

      const loadedCategory = [];
      const newItemList = [...responseData._embedded.chittycategory]
      for (const key in newItemList) {
        loadedCategory.push({
          id: key,
          category_id: newItemList[key].id,
          category_name: newItemList[key].categoryName,
        });
      }

      setCategory(loadedCategory);
    };

    fetchChittyCategory();
  }, []);

  const handleChange = (event) => {
    const error = {}
    if (event.target.value.includes("Manager")) {
      error.manager = "Manager is required"
    }
    setFormErrors(error)
    const newdata = { ...formValues }
    newdata[event.target.name] = event.target.value;
    setFormValues(newdata)
    setEmployeeId(event.target.value);
  }

  const handleChanger = (event) => {
    const error = {}
    if (event.target.value.includes("Select")) {
      error.category = "Category is required"
    }
    setFormErrors(error)
    const newdata = { ...formValues }
    newdata[event.target.name] = event.target.value;
    setFormValues(newdata)
    setChittyCategoryId(event.target.value);
  }

  const installmentsHandler = (event) => {
    const error = {}
    if (event.target.value.includes("Select")) {
      error.duration = "Duration is required"
    }
    setFormErrors(error)
    const newdata = { ...formValues }
    newdata[event.target.name] = event.target.value;
    setFormValues(newdata)
    setInstallments(parseInt(event.target.value))
  }
  const amountHandler = (event) => {
    const error = {}
    if (event.target.value.includes("Select")) {
      error.installment = "Installment is required"
    }
    setFormErrors(error)
    const newdata = { ...formValues }
    newdata[event.target.name] = event.target.value;
    setFormValues(newdata)
    setAmount(parseInt(event.target.value))
  }

  const totalAmountHandler = (event) => {
    const error = {}
    if (event.target.value.includes("Total")) {
      error.total = "Total Amount is required"
    }
    setFormErrors(error)
    const newdata = { ...formValues }
    newdata[event.target.name] = event.target.value;
    setFormValues(newdata)
    setTotalAmount(parseInt(installments * amount))
  }

  return (
    <form onSubmit={submit}>
      <div className={classes.forms}>
        <input className="minimal"
          name="chitty_no"
          id="chitNumber"
          placeholder='chit number/year'
          value={autoChitId}
        ></input>
        <br />
        <span className={classes.errormessage}>{formErrors.message}</span>
        <br />

        <select className={classes.minimal} name="category"
          onChange={handleChanger}>
          <option>Select Chitty Category</option>
          {category.map(category => (
            <option value={category.category_id} name={category.category_name}>
              {category.category_name}</option>
          ))}
        </select>
        <br />
        <span className={classes.errormessage}>{formErrors.category}</span>
        <br />

        <select className={classes.minimal} name="manager"
          onChange={handleChange}>
          <option>Chitty Manager</option>
          {manager.map(manager => (
            <option value={manager.emp_id}>{manager.firstName}</option>
          ))}
        </select>
        <br />
        <span className={classes.errormessage}>{formErrors.manager}</span>
        <br />

        <select id={classes.month} value={installments} name="duration"
          className={classes.minimal} onChange={installmentsHandler} >
          <option>Select duration</option>
          {chittyCategoryId == 1 ? (<>
            <option name="100" value="120">120 Months</option>
            <option name="50" value="100">100 Months</option>
            <option name="50" value="60">60 Months</option></>) : (<>
              <option name="50" value="50">50 Months</option>
              <option name="40" value="40">40 Months</option>
              <option name="30" value="30">30 Months</option></>)}
        </select>
        <br />
        <span className={classes.errormessage}>{formErrors.duration}</span>
        <br />

        <select id={classes.amount} className={classes.minimal}
          value={amount} name="installment"
          onChange={amountHandler}>
          <option>Select Installment</option>
          <option name="10000" value="10000">10000</option>
          <option name="5000" value="5000">5000</option>
          <option name="4000" value="4000">4000</option>
          <option name="2500" value="2500">2500</option>
        </select>
        <br />
        <span className={classes.errormessage}>{formErrors.installment}</span>
        <br />

        {totalAmount ? (
          <input
            name="total"
            value={totalAmount}
            onClick={totalAmountHandler}
            readOnly
            required
          />
        ) : (
          <input
            name="total"
            value="Total Price"
            onClick={totalAmountHandler}
            readOnly
            required
          />
        )}
        <button type="submit">
          Launch
        </button>
      </div>
    </form>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LaunchForm />);

export default LaunchForm;

