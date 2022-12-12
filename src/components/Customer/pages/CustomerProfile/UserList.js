import React from 'react';

import Users from './Users';
import './UserList.css';
const UserList = (props) => {
    
  return (
    <ul className='wrapper'>
      {props.details.map((user) => (
        <Users
          // id={user.id}
          userid={user.userid}
          name={user.name}
        />
      ))}
    </ul>
  );
};

export default UserList;