import './css/Booking_Confirmation.css';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
// Material UI
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Chip from '@mui/material/Chip';
// bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Booking_Confirmation() {

    const navigate = useNavigate();
    const [loginData, setLoginData] = useState([]);
    
    useEffect(() => {
        Axios.get('http://44.203.38.153/login_action').then((res) => {
            if (res.data.loggedIn) {
                setLoginData(res.data.user[0]);
            }
        }).catch((err) => {
            console.log(err);
        });
    });
    
    const handleMyBooking = () => {
        navigate('/My_Booking');
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
                                    <div style={{ display: 'flex', justifyContent: 'center', fontSize: '25px', fontWeight: '600' }}>Thank you {loginData.user_name}! </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        Your booking is confirmed.
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        A confirmation email has been sent to {loginData.user_email}
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