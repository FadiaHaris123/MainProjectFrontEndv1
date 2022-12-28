import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css'
import axios from "axios";
import { IconContext } from 'react-icons';
import { BsFillPersonFill } from "react-icons/ri";
// import ProfileOverlay from './pages/CustomerProfile/ProfileOverlay';
import Collapsible from 'react-collapsible';


function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [managerName, setManagerName] = useState([]);
  let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;
  let userid = JSON.parse(sessionStorage.getItem('userId'));


  const api=axios.get(`http://localhost:8080/managers/${userid}`,{
    headers:{
      'Authorization':token
    }}
  )
    .then(response=>{
      console.log(response.data)
      setManagerName(response.data.firstName);
  
    })

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <h1 className='tagName'>Eminence Chitty</h1>
        <h5 className='tagNamee'>Hi, {managerName}  < FaIcons.FaUser /></h5>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
            <Link to='#' className='menu-bars'>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Navbar;
