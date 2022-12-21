import { Fragment } from 'react';

import classes from './Header.module.css';
import Headers from '../../foreman/Header/Header';
import Navigation from '../../foreman/Navigation/Navigation';

const Header = () => {
  return (
    <Fragment>
      <Headers/>  
      <Navigation />
      <header className={classes.header}> 
      <h1 className={classes.sideheader}>Earnings</h1>
      </header>
    </Fragment>
  );
};

export default Header;

