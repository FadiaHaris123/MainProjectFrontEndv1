import React, { useState, useEffect } from 'react';
import './ManagerNav.css'
import { Link } from 'react-router-dom'
import NotificationIcon from './NotificationIcon'
import classes from './ChitList.module.css';

const ManagerNav = (props) => {

  const [count, setCount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const countLaunch = async () => {
      const response = await fetch(
        'http://localhost:8080/api/chittyCategory'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      let count = 0;
      const loadedCategory = [];
      const newItemList = [...responseData._embedded.chittyCategory]
      for (const key in newItemList) {
        loadedCategory.push({
          id: key,
          category_name: newItemList[key].categoryName,
        });
      }
      setCount(loadedCategory);
    };
    countLaunch().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  const handleChanger = (event) => {
    setCount(event.target.value);
  }
  const array = [];
  {
    count.map(count => (
      array.push({ id: count.id })
    ))
  }
  const noti = array[count.id];
  return (
    <div class="manage-nav-btn-group">
      <button class="button">Auction</button>
      <button class="button">Chitty <i class="fas fa-caret-down"></i></button>
      <button class="button" onChange={handleChanger}>
        <NotificationIcon width={"30px"} color={"#485c78"} count={noti} />
      </button>
      <Link to="/">
        <button class="logout-button ">Log Out</button>
      </Link>
    </div>
  )

}
export default ManagerNav;