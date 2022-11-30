import React, { Fragment } from "react";
import classes from './Modal.module.css'
import LaunchForm from './LaunchForm/LaunchForm'
import ReactDOM from "react-dom"


const Modal = ({ closeModal }) => {
    return ReactDOM.createPortal(<Fragment>
        <div className={classes.modalBackground}></div>
            <div className={classes.modalContainer}>
                <div className={classes.title}>
                    <h1>Launch Chitty</h1>
                </div>
                <LaunchForm />
                <button id={classes.cancelBtn} onClick={() => closeModal(false)}>Cancel</button>

                <div className={classes.footer}></div>
            </div>
            </Fragment>,
        document.getElementById('portal'))
}

export default Modal;