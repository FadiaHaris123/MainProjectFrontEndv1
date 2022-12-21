import React, { useState, useEffect,useHistory } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import ProfileOverlay from './pages/CustomerProfile/ProfileOverlay';
import Collapsible from 'react-collapsible';
import Image from '../../assets/images/emma.jpeg';
import axios from "axios";
import './Navbar.css'
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
import { Fragment } from 'react';

function Navbar() {
  // const roleid = window.localStorage.getItem('roleId');
  // const userid = window.localStorage.getItem('userId');
  const [sidebar, setSidebar] = useState(false);
  const [name, setName] = useState([]);
  const [error, setError] = useState([]);
  const showSidebar = () => setSidebar(!sidebar);
  // const history = useHistory();

  let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;
  let userid = JSON.parse(sessionStorage.getItem('userId'));
  let roleid = JSON.parse(sessionStorage.getItem('roleId'));
 
  console.log(userid)

  // const api = `http://localhost:8080/user-details/${userid}`
  // axios.get(api, { headers: { "Authorization": `Bearer ${token}` } })
  const api=axios.get(`http://localhost:8080/user-details/${userid}`,{
  headers:{
    'Authorization':token
    
  }}
)
  .then(response=>{
    console.log(response.data)
    setName(response.data.firstName);

  })

  // const showSidebar = () => setSidebar(!sidebar);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await axios.get(api);
  //       setName(response.data.firstName);
  //       console.log(response.data.firstName)
  //     } catch (err) {
  //       setError(err.message);
  //       setName(null);
  //     } 

  //   };
  //   console.log(name)
  //   getData();

  // }, []);

  return (
    <Fragment>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h1 className='tag'>Eminence Chitty</h1>
    
          <h5 className='tagNamee'>Hi, {name} !</h5>

        <div className='img'>
          <Collapsible trigger={<img src={Image} style={{ width: '50px', height: '50px', border: '1px solid black', borderRadius: '2rem' }} />}>
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
    </Fragment>
  );
}

export default Navbar;

