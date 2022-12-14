import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as ImIcons from 'react-icons/im';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import classes from './Navbar.css';
import { IconContext } from 'react-icons';
// import ProfileOverlay from './pages/CustomerProfile/ProfileOverlay';
import Collapsible from 'react-collapsible';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const showSidebar = () => setSidebar(!sidebar);
  const id = window.localStorage.getItem('userId');
  const [managerName, setManagerName] = useState();

  useEffect(() => {
    const fetchAssignedChits = async () => {
      const response = await fetch(
        'http://localhost:8080/api/managers'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();
      const manager = [...responseData._embedded.manager]

      for (const key in manager) {
        if (manager[key].emp_id == id) {
            setManagerName(manager[key].firstName)
        }
      }
    };
    fetchAssignedChits().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
 

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h1 className='tagName'>Eminence Chitty</h1>
          <h5 className='tagNamee'>Welcome {managerName}</h5>
          <Collapsible trigger={<img src="" style={{ width: '50px' }} />}>

            {/* <ProfileOverlay /> */}

          </Collapsible>
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
