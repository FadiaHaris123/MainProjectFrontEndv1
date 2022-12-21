import React, { useState, useRef, useEffect } from 'react';
import UserList from "./UserList";
import './UserList.css'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import Users from './Users';
import Image from '../../../../assets/images/emma.jpeg';
import Navbar from '../../Navbar';
import './profile.css'
import ReactToPrint from 'react-to-print'
import axios from 'axios';

function Profile() {
  let token = `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`;
  let userid = JSON.parse(sessionStorage.getItem('userId'));
  const componentRef = useRef()
  // const userid = window.localStorage.getItem('userId');
  const handlePrint = () => {
    window.print()
  }
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState([]);


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user-details/${userid}`,
        {
          headers:{
            'Authorization':token
            
          }});
        // setName(response.data.firstName);
        setName(response.data.firstName +" "+ response.data.lastName);
      } catch (err) {
        setError(err.message);
        setName(null);
      }
    };
    getData();
  }, []);
  
  return (
    <div>
      <Navbar />
      <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
        <div className='containerofid'>
        <MDBContainer ref={componentRef} className="py-5 h-100">
          <MDBRow  className="justify-content-center align-items-center h-100">
            <MDBCol lg="6" className="mb-4 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                <MDBRow className="g-0">
                  <MDBCol md="4" className="gradient-custom text-center text-white"
                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    <MDBCardImage src={Image}
                      alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <h5 className="headingofid">Eminence Chitty</h5>
                      <br></br>
                    <MDBTypography tag="h6">Name : {name}</MDBTypography>
                      <MDBTypography tag="h6">User ID : {userid}</MDBTypography>
          
                    </MDBCardBody>
          
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        
        
         
        </MDBContainer>
        <ReactToPrint trigger={() => (
          <button id="button">Get a copy</button>
        )}
          content={() => componentRef.current}
        />
        </div>
        
       
      </section>
    </div>
  );
}

export default Profile;