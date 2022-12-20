import React from "react";
import classes from "./Header.module.css"

const Header = () =>{
return(
    <React.Fragment>
        <div className={classes.headerContainer}>
            <h2>Hi Customer</h2>
            <h4>  Welcome to the Auction Room</h4>
        </div>
    </React.Fragment>
)
}

export default Header;