import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import axios from "axios";
import React, { useState, useEffect } from 'react';

const Users = (props) => {
    const userid = window.localStorage.getItem('userid');
const [name, setName] = useState([]);
const [error, setError] = useState([]);
useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user-details/${userid}`);
        setName(response.data.firstName);
       
      } catch (err) {
        setError(err.message);
        setName(null);
      } 

    };
    getData();

  }, []);
    return (
        <div>
            <section id="content" style={{ backgroundColor: '#f4f5f7' }}>
                <MDBContainer>
                    <MDBCol >
                        <MDBCardBody id="makepdf">
                            {/* <MDBTypography>User ID : {props.userid}</MDBTypography> */}
                            {/* <MDBTypography>{name}</MDBTypography> */}
                            <MDBTypography>Your Profile</MDBTypography>
                            <MDBTypography>Your Chitts</MDBTypography>
                            <MDBTypography>Payment Due</MDBTypography>
                            <MDBTypography>Upcoming Auction</MDBTypography>
                            {/* <MDBTypography>Place : {props.place}</MDBTypography>
                            <MDBTypography>Mail ID : {props.email}</MDBTypography> */}
                        </MDBCardBody>
                    </MDBCol>
                </MDBContainer>
            </section>
        </div>
    );
}

export default Users;