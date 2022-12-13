import React, { useState, useRef, useEffect } from 'react';
import UserList from "./UserList";
import './UserList.css'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import Users from './Users';
import Image from '../../../../assets/images/profile2.jpeg';
import Navbar from '../../Navbar';
import './profile.css'
import ReactToPrint from 'react-to-print'

function Profile() {
  const componentRef = useRef()

  const handlePrint = () => {
    window.print()
  }
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userdetails = async () => {
      const response = await fetch(
        'https://routingapp-51bff-default-rtdb.firebaseio.com/user.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadeddetails = [];
      for (const key in responseData) {
        loadeddetails.push({
          // id: key,
          userid: responseData[key].id,
          name: responseData[key].name,
          // place: responseData[key].place,
          // email: responseData[key].email,
        });
      }

      setDetails(loadeddetails);
      setIsLoading(false);
    };

    userdetails().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  let content;
  if (details.length > 0) {
    content = <UserList details={details} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p>{error}</p>
      </section>
    );
  }
  return (
    <div>
      <Navbar />
      <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
        <ReactToPrint trigger={() => (
          <button id="button">Generate PDF</button>
        )}
          content={() => componentRef.current}
        />
        <MDBContainer ref={componentRef} className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
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
                      <MDBTypography tag="h6">{content}</MDBTypography>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}

export default Profile;