import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import classes from './LaunchForm.module.css';
import Axios from 'axios';


const LaunchForm = () => {

  const [autoChitId,setAutoChitId] = useState("");
  let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;
  const getchittyurl = "http://localhost:8080/chitty"
  const url = "http://localhost:8080/chitty/add"

  const [data,setData] = useState({
    chitNumber:"",
    currentNumberOfChittal:0,
    category:"",
    launchDate:"",
    startDate:null,
    status:"launched"
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
    chitNumber:autoChitId,
    installment:parseInt(amount),
    duration:parseInt(installments),
    manager:parseInt(employeeId),
    numberOfChittal:parseInt(installments),
    currentNumberOfChittal:parseInt(data.currentNumberOfChittal),
    category:parseInt(chittyCategoryId),
    totalAmount:totalAmount,
    launchDate:formattedlaunchDate,
    startDate:data.startDate,
    status:data.status
    },{
      headers:{
        'Authorization':token
      }})
    .then(res=>{
      if(res.data != null){
      alert("Chitty launched successfully")
      setAutoChitId('')
      setTotalAmount('')
      setInstallments('')
      setAmount('')
      setEmployeeId("")
      }
      console.log(res.data)
    })
    }
 

  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }
  
  var launchDate = new Date();
  var month = pad2(launchDate.getMonth()+1);//months (0-11)
  var day = pad2(launchDate.getDate());//day (1-31)
  var year= launchDate.getFullYear();

  var formattedlaunchDate=  year+"-"+month+"-"+day;
  
  const [chittyCategoryId, setChittyCategoryId] = useState()
  const [employeeId, setEmployeeId] = useState()
  const [installments, setInstallments] = useState(0)
  const [amount, setAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  const [manager, setManager] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchChittiess = async () => {
      const response = await fetch(
        getchittyurl,{
          headers:{
            'Authorization':token
          }}
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      // console.log(responseData._embedded.chitty)
      // console.log(responseData._embedded.chitty.length)
      const loadedManager = [];
      if(responseData._embedded.chitty.length === 0){
        setAutoChitId("EM" + 1 + "_" + year);
        // console.log(1 + "/" + year)
      }
      else{
        const chitNewNum = responseData._embedded.chitty.length + 1;
        setAutoChitId("EM" + chitNewNum + "_" + year);
        // console.log(responseData._embedded.chitty.length + 1 + "/" + year)
      }
    };

    fetchChittiess().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(
        'http://localhost:8080/managers',{
          headers:{
            'Authorization':token
          }}
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

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
        'http://localhost:8080/chittycategory',
        {
          headers:{
            'Authorization':token 
          }}
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
          category_id: newItemList[key].id,
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
    setEmployeeId(event.target.value);
  }
  const handleChanger = (event) => {
    setChittyCategoryId(event.target.value);
    // console.log("select"+event.target.value);
  }

 
  const installmentsHandler = (event) => {
    setInstallments(parseInt(event.target.value))
    // console.log(event.target.value)
  }

  const amountHandler = (event) => {
    setAmount(parseInt(event.target.value))
    // console.log(event.target.value)
  }

  const totalAmountHandler = () => {
    setTotalAmount(parseInt(installments * amount))
    // console.log(parseInt(installments * amount))
  }


  return (
    <form onSubmit={submit}>
      <div className={classes.forms}>

        <input className="minimal"
          name="chitty_no"
          id="chitNumber"
          placeholder='chit number/year'
          value={autoChitId}
        ></input><br /><br />


        <select className={classes.minimal} onChange={handleChanger}  required>
          <option>Select Chitty Category</option>
          {category.map(category => (
            <option value={category.category_id} name={category.category_name}>{category.category_name}</option>
          ))
          }
        </select><br /><br />

        <select className={classes.minimal} onChange={handleChange}  required>
          <option>Chitty Manager</option>
          {manager.map(manager => (
            <option value={manager.emp_id}>{manager.firstName}</option>

          ))
          }
        </select><br /><br />

        <select id={classes.month} value={installments} className={classes.minimal} onChange={installmentsHandler}  required>
          <option name="Select Months" value="">Select duration</option>
          {chittyCategoryId == 1 ? (<>
            <option name="100" value="120">120 Months</option>
            <option name="50" value="100">100 Months</option>
            <option name="50" value="60">60 Months</option></>) : (<>

              <option name="50" value="50">50 Months</option>
              <option name="40" value="40">40 Months</option>
              <option name="30" value="30">30 Months</option></>)}


        </select><br /><br />
        <select id={classes.amount} className={classes.minimal} value={amount} onChange={amountHandler}  required>
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