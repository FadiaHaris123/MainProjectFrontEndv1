import React, { useState, useRef, useEffect } from 'react';
import UserList from "./UserList";
import './UserList.css'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import Users from './Users';
import Image from './Image';
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
        'https://userdetai-default-rtdb.firebaseio.com/users.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadeddetails = [];
      for (const key in responseData) {
        loadeddetails.push({
          id: key,
          userid: responseData[key].userid,
          name: responseData[key].name,
          place: responseData[key].place,
          email: responseData[key].email,
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
  console.log("Sreeni" + details.userid)
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
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                      alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">{content}</MDBTypography>
                      {/* <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">{content}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Phone</MDBTypography>
                          <MDBCardText className="text-muted">123 456 789</MDBCardText>
                        </MDBCol>
                      </MDBRow> */}
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
