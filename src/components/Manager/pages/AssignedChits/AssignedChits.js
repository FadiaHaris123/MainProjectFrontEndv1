import { Fragment } from "react";
import React, { useState, useCallback } from 'react';
import Navbar from '../../Navbar'
import Chitties from "./Chitties";

const AssignedChits = () => {

    return (
        <Fragment>
            <Navbar />
            <Chitties/>
        </Fragment>
    )
}
export default AssignedChits;