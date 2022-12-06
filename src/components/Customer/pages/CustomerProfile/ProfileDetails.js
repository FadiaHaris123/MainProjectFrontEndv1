import React, { useState,useEffect } from 'react';
import UserList from "./UserList";

const ProfileDetails=()=>{
    const[details,setDetails]=useState([]);
    const[isLoading,setIsLoading]=useState(false);
    const[error,setError]=useState(null);

    useEffect(() => {
        const userdetails = async () => {
          const response = await fetch(
            'https://userdetai-default-rtdb.firebaseio.com/users.json'
          );
      
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
      
          const responseData = await response.json();
      
          const loadeddetails = [];
        //   const newItemList = [...responseData._embedded.manager]
          //manager is the classname
      
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
          setIsLoading(false);
        };
      
        userdetails().catch((error) => {
          setIsLoading(false);
          setError(error.message);
        });
      }, []);
      
    let content;
    if (details.length > 0) {
        content = <UserList details={details} />;
    }

    if (error) {
        content = <p>{error}</p>;
    }

    if (isLoading) {
        content = <p>Loading...</p>;
    }
      
      if (isLoading) {
        return (
          <section>
            <p>Loading...</p>
          </section>
        );
      }
      
      if (error) {
        return (
          <section>
            <p>{error}</p>
          </section>
        );
      }
    return (
        <div className="main-wrapper">
            {content}
        </div>
   )
}

export default ProfileDetails;