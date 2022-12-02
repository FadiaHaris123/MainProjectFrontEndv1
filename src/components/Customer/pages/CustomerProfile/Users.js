import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
// import jsPDF, { Text, AddPage, Line, Image, Table, Html } from 'jspdf-react'

const Users = (props) => {
    // var doc = new jsPDF();
    return (
        <div >
            <section id="content" style={{ backgroundColor: '#f4f5f7' }}>
                <MDBContainer>
                    <MDBCol >
                        <MDBCardBody >
                            <MDBTypography>User ID : {props.userid}</MDBTypography>
                            <MDBTypography>Username : {props.name}</MDBTypography>
                            <MDBTypography>Place : {props.place}</MDBTypography>
                            <MDBTypography>Mail ID : {props.email}</MDBTypography>
                        </MDBCardBody>
                    </MDBCol>
                </MDBContainer>
            </section>
            <button id="cmd">Generate PDF</button>
        </div>
    );
}

export default Users;