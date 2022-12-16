import React, { useState,useEffect } from 'react';
import UserList from "./UserList";

const ProfileDetails=()=>{
    const[details,setDetails]=useState([]);

    useEffect(() => {
        const userdetails = async () => {
          const response = await fetch(
            '---------------URL-----------------'
          );
      
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
      
          const responseData = await response.json();
      
          const loadeddetails = [];
      
          for (const key in responseData) {
            loadeddetails.push({
                id: key,
                userid: responseData[key].userid,
                name: responseData[key].name,
                place: responseData[key].place,
                email: responseData[key].email,
            });
          }
      
          setDetails(loadeddetails);
        };
        userdetails();
      }, []);
      
    let content;
    if (details.length > 0) {
        content = <UserList details={details} />;
    }

    return (
        <div className="main-wrapper">
            {content}
        </div>
   )
}

export default ProfileDetails;