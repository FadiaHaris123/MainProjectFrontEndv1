import { useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import classes from './Navigation.module.css';

const Navigation = () => {


  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

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
    

  return (
    <div id={classes.navs} class={classes.btn_group}>
      <button class={classes.button}>Auction</button>
      <div class={classes.dropdown}>
        <button class={classes.button}>Chitty</button>
        <div class={classes.dropdown_content}>{category.map(category => (
          <a href="#" value={category.category_name}>{category.category_name}</a>
        ))}
        </div>
      </div>
      <Link to='/admin/launchedchits'>
      <button class={classes.button}>Launched Chits</button>
      </Link>
      <Link to="/">
        <button class={classes.logout_button}>Log Out</button>
      </Link>
    </div>
  )
}
export default Navigation;