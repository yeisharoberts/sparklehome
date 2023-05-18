//React
import './css/My_Booking.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
//Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
//Material UI
import Paper from '@mui/material/Paper';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function My_Booking() {

    const [loginData, setLoginData] = useState([]);
    const [myBookings, setMyBookings] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (data) => {
        setShow(true);
        setSelectedItem(data);
    };

    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        Axios.get('http://44.203.38.153/login_action')
            .then((res) => {
                if (res.data.loggedIn) {
                    setLoginData(res.data.user[0]);
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    useEffect(() => {
        if (loginData.user_id) {
            Axios.post('http://44.203.38.153/get_my_booking', {
                user_id: loginData.user_id
            })
                .then((res) => {
                    setMyBookings(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [loginData, selectedItem, myBookings]);

    const handleCancelBooking = () => {
        Axios.post('http://44.203.38.153/cancel_booking', {
            schedule_id: selectedItem.schedule_id,
            booking_id: selectedItem.booking_id
        }).then((res) => {
            if (res.status === 200) {
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
            }
            handleClose();
        })
    }

    return (
        <>
            <div className='parent-my-booking'>
                <div>
                    <Row>
                        <Col></Col>
                        <Col xs={10}>
                            <div className='parent-col mb-5'>
                                <Paper elevation={0}>
                                    <div className='parent-paper-myBooking'>
                                        <div className='my-booking-title'>
                                            My Bookings
                                        </div><hr />
                                        {
                                            myBookings.map((data) => {
                                                return (
                                                    <>
                                                        <div className='mt-4'>
                                                            <Paper>
                                                                <div style={{ padding: '20px' }}>
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                        <div style={{ fontSize: 'large', fontWeight: '600' }}>Booking ID: #{data.booking_id}</div>
                                                                        <div onClick={() => handleShow(data)}><CancelIcon /></div>
                                                                    </div>
                                                                    <div style={{ paddingTop: '20px' }}>
                                                                        <Row>
                                                                            <Col>
                                                                                <div className='parent-image-maid'>
                                                                                    <img src={`https://sparkle-home-s3.s3.amazonaws.com/maid/${data.maid_image}`} alt="Paris" className='image-maid' style={{ borderRadius: '50%', height: '100px', width: '100px' }} />
                                                                                </div>
                                                                            </Col>
                                                                            <Col xs={9}>
                                                                                <div>Cleaning Date: {new Date(data.booking_datetime).toLocaleDateString('en-US', {
                                                                                    weekday: 'long',
                                                                                    day: '2-digit',
                                                                                    month: '2-digit',
                                                                                    year: 'numeric'
                                                                                })}</div>
                                                                                <div className='mt-2'>Cleaner Name: {data.maid_name}</div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                </div>
                                                            </Paper>
                                                        </div>

                                                        <Modal show={show} onHide={handleClose}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Cancel Booking Confirmation</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                <Alert severity="warning">Are you sure you want to cancel this booking?</Alert>
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant='contained' color='error' onClick={handleCancelBooking}>
                                                                    Cancel Booking
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </>
                                                );
                                            })
                                        }
                                    </div>
                                </Paper>
                            </div>
                        </Col>
                        <Col></Col>
                    </Row >
                </div >
                {showToast && (
                    <ToastContainer className="p-3" position="bottom-start">
                        <Toast onClose={() => setShowToast(false)}>
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">Success</strong>
                                <small>now</small>
                            </Toast.Header>
                            <Toast.Body>
                                <Alert severity="success">Booking Successfully Cancelled.</Alert>
                            </Toast.Body>
                        </Toast>
                    </ToastContainer>
                )}
            </div >
        </>
    );
}

export default My_Booking;