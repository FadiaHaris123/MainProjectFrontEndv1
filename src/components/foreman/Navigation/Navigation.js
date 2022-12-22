import { useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import classes from './Navigation.module.css';

const Navigation = () => {

 
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;

    useEffect(() => {
      const fetchChittyCategory = async () => {
        const response = await fetch(
          'http://localhost:8080/chittycategory',{
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

    const logoutHandler = () => {
      sessionStorage.removeItem('roleId');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('jwt');  
  };
    

  return (
    <div id={classes.navs} class={classes.btn_group}>
         <Link to="/admin">
        <button class={classes.button}>Home</button>
        </Link>
      <Link to="/admin/ForemanAuction">
      <button class={classes.button}>Auction</button>
      </Link>
   
      <div class={classes.dropdown}>
        <button class={classes.button}>Chitty</button>

        <div class={classes.dropdown_content}>
        <Link to='/admin/launchedchits'>
      <button class={classes.button}>Launched Chits</button>
      </Link>
        </div>
      </div>
      <Link to="/">
        <button class={classes.logout_button} onClick={logoutHandler}>Log Out</button>
      </Link>
    </div>
  )
}
export default Navigation;