import './css/Booking_Confirmation.css';
// Material UI
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Chip from '@mui/material/Chip';
// bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Booking_Confirmation() {

    const handleMyBooking = () => {
        alert('hello')
    }
    return (
        <>
            <div className='parent-booking-confirmation'>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <Paper style={{ marginTop: '55px' }}>
                            <div style={{ padding: '35px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <CheckCircleIcon style={{ color: 'green', fontSize: '50px' }} />
                                </div>
                                <div style={{ paddingTop: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', fontSize: '25px', fontWeight: '600' }}>Thank you James! </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        Your booking is confirmed.
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        A confirmation emai has been sent to james123@gmail.com
                                    </div>
                                </div>
                                <hr />
                                <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
                                    <Chip label="My Booking" color="info" onClick={handleMyBooking}/>
                                </div>
                            </div>
                        </Paper>
                    </Col>
                    <Col></Col>
                </Row>
            </div >
        </>
    );
}

export default Booking_Confirmation;