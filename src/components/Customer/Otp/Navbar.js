import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import ProfileOverlay from './pages/CustomerProfile/ProfileOverlay';
import Collapsible from 'react-collapsible';
import Image from '../../assets/images/pro1.jpg';
import axios from "axios";
import './Navbar.css'

function Navbar() {
  // const userid = window.localStorage.getItem('userId');
  const [sidebar, setSidebar] = useState(false);
  const [name, setName] = useState([]);
  const [error, setError] = useState([]);
  let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;
  let userid = JSON.parse(sessionStorage.getItem('userId'));

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user-details/${userid}`,
        {
          headers:{
            'Authorization':token
            
          }});
        setName(response.data.firstName);
      } catch (err) {
        setError(err.message);
        setName(null);
      }
    };
    getData();
  }, []);

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <h1 className='tag'>Eminence Chitty</h1>

        <h5 className='tagNamee'>Hi, {name} !</h5>

        <div className='img'>
          <Collapsible trigger={<img src={Image} style={{ width: '50px', height: '70px', border: '1px solid black', borderRadius: '2rem' }} />}>
            <ProfileOverlay />
          </Collapsible>
        </div>

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