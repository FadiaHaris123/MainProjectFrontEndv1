import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import classes from './LaunchForm.module.css';


const LaunchForm = () => {

  const [chittyCategory, setChittyCategory] = useState("")
  const [employee, setEmployee] = useState("")
  const [installments, setInstallments] = useState(0)
  const [amount, setAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [date,setDate]=useState("")

  const [manager, setManager] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(
        'http://localhost:8080/api/managers'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedManager = [];
      const newItemList = [...responseData]
      for (const key in newItemList) {
        loadedManager.push({
          id: key,
          firstName: newItemList[key].firstName,
          emp_lastname: newItemList[key].emp_lastname,
          email: newItemList[key].email,
        });
      }

      setManager(loadedManager);
      setIsLoading(false);
    };

    fetchEmployees().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  useEffect(() => {
    const fetchChittyCategory = async () => {
      const response = await fetch(
        'http://localhost:8080/api/chittycategory'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedCategory = [];
      const newItemList = [...responseData._embedded.chittycategory]
      for (const key in newItemList) {
        loadedCategory.push({
          id: key,
          category_name: newItemList[key].categoryName,
        });
      }


      setCategory(loadedCategory);

      setIsLoading(false);
    };

    fetchChittyCategory().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  if (isLoading) {
    return (
      <h1>Loading...</h1>
    );
  }

  if (httpError) {
    return (
      <h1>{httpError}</h1>
    );
  }


  const handleChange = (event) => {
    setEmployee(event.target.value);
  }
  const handleChanger = (event) => {
    setChittyCategory(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const installmentsHandler = (event) => {
    setInstallments(parseInt(event.target.value))
    console.log(event.target.value)
  }

  const amountHandler = (event) => {
    setAmount(parseInt(event.target.value))
    console.log(event.target.value)
  }

  const totalAmountHandler = () => {
    setTotalAmount(parseInt(installments * amount))
    console.log(parseInt(installments + amount))
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.forms}>

        <input className="minimal"
          name="chitty_no"
          placeholder="Chitty No.eg:15/22"
          required
        ></input><br /><br />


        <select className={classes.minimal} value={chittyCategory} onChange={handleChanger}>
          <option>Select Chitty Category</option>
          {category.map(category => (
            <option value={category.category_name}>{category.category_name}</option>

          ))
          }
        </select><br /><br />

        <select className={classes.minimal} value={employee} onChange={handleChange}>
          <option>Chitty Manager</option>
          {manager.map(manager => (
            <option value={manager.firstName}>{manager.firstName}</option>

          ))
          }
        </select><br /><br />

        <select id={classes.month} value={installments} className={classes.minimal} onChange={installmentsHandler}>
          <option name="Select Months" value="">Select duration</option>
          {chittyCategory === "Long Term Chitty" ? (<>
            <option name="100" value="120">120 Months</option>
            <option name="50" value="100">100 Months</option>
            <option name="50" value="60">60 Months</option></>) : (<>

              <option name="50" value="50">50 Months</option>
              <option name="40" value="40">40 Months</option>
              <option name="30" value="30">30 Months</option></>)}


        </select><br /><br />
        <select id={classes.amount} className={classes.minimal} value={amount} onChange={amountHandler}>
          <option name="Select Amount" value="">Select Installment</option>
          <option name="10000" value="10000">10000</option>
          <option name="5000" value="5000">5000</option>
          <option name="4000" value="4000">4000</option>
          <option name="2500" value="2500">2500</option>
        </select><br /><br />

        {totalAmount ? (
          <input 
            name="total"
            value={totalAmount}
            onClick={totalAmountHandler}
            readOnly
          ></input>
        ) : (
          <input 
            name="total"
            value="Total Price"
            onClick={totalAmountHandler}
            readOnly
          ></input>
        )}

<br></br>
        <label className="form__label">Select Launch Date </label>
        <input 
          label="Select Launch Date"
          type="date" 
          defaultValue="Select launch date"
          InputLabelProps={{
            label:"Select Launch Date",
          }}
        />


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
