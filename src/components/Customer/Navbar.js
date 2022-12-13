import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as ImIcons from 'react-icons/im';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import classes from './Navbar.css';
import { IconContext } from 'react-icons';
import ProfileOverlay from './pages/CustomerProfile/ProfileOverlay';
import Collapsible from 'react-collapsible';
import Image from '../../assets/images/pro1.jpg';
import './Navbar.css'

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h1 className='tag'>Eminence Chitty</h1>
          <h5 className='tagNamee'>Welcome Anagha!</h5>
          <div className='img'>
          <Collapsible trigger={<img src={Image} style={{ width: '50px',height:'70px' ,border: '1px solid black',borderRadius:'2rem'}} />}>
        
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
    </>
  );
}

export default Navbar;