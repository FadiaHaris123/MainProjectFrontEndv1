import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

const Users = (props) => {
    return (
        <div>
            <section id="content" style={{ backgroundColor: '#f4f5f7' }}>
                <MDBContainer>
                    <MDBCol >
                        <MDBCardBody id="makepdf">
                            <MDBTypography>User ID : {props.userid}</MDBTypography>
                            <MDBTypography>Username : {props.name}</MDBTypography>
                            <MDBTypography>Place : {props.place}</MDBTypography>
                            <MDBTypography>Mail ID : {props.email}</MDBTypography>
                        </MDBCardBody>
                    </MDBCol>
                </MDBContainer>
            </section>
        </div>
    );
}

export default Users;