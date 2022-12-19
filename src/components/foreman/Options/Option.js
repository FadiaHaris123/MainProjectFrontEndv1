import { Link } from 'react-router-dom';
import classes from './Option.module.css'
import { Fragment, useState } from 'react';
import Modal from '../Launch/Modal';
import { MdLaunch } from "react-icons/md";
import { RiAuctionFill } from "react-icons/ri";
import { MdOutlineManageAccounts } from "react-icons/md";
import { TbCurrencyRupee } from "react-icons/tb";


const Option =()=>{

    const [openModal, setOpenModal] = useState(false);
    console.log("onClicked");
    return(
        
    <Fragment>

        <table>
            <tbody>
            <tr>
                <td>
                
                    <button className={classes.button} onClick={()=>{setOpenModal(true)}}><span> <MdLaunch/> Launch</span></button>
                   {openModal && <Modal closeModal={setOpenModal}/>} 
                </td>
                
                <td>
                <Link to="/admin/ForemanAuction">
                    <button className={classes.button}><span><RiAuctionFill/> Auction</span></button>
                </Link>
                </td>
            </tr>
            <tr>
                <td>
                    <Link to="/employee">
                        <button className={classes.button}><span><MdOutlineManageAccounts/>  Employees</span></button>
                    </Link>
                </td>
                <td>
                <Link to="/admin/Earnings">
                    <button className={classes.button}><span><TbCurrencyRupee/>Earnings</span></button>
                </Link>
                </td>
            </tr>
            </tbody>
        </table>
        </Fragment>
    )

}

export default Option;