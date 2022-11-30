import { Link } from 'react-router-dom';
import classes from './Option.module.css'
import { Fragment, useState } from 'react';
import Modal from '../Launch/Modal';


const Option =()=>{

    const [openModal, setOpenModal] = useState(false);
    console.log("onClicked");
    return(
    <Fragment>
        <table>
            <tbody>
            <tr>
                <td>
                    <button className={classes.button} onClick={()=>{setOpenModal(true)}}><span>Launch</span></button>
                   {openModal && <Modal closeModal={setOpenModal}/>} 
                </td>
                
                <td>
                <Link to="/auction">
                    <button className={classes.button}><span>Auction</span></button>
                </Link>
                </td>
            </tr>
            <tr>
                <td>
                    <Link to="/employee">
                        <button className={classes.button}><span>Employees</span></button>
                    </Link>
                </td>
                <td>
                <Link to="/earnings">
                    <button className={classes.button}><span>Earnings</span></button>
                </Link>
                </td>
            </tr>
            </tbody>
        </table>
        </Fragment>
    )

}

export default Option;