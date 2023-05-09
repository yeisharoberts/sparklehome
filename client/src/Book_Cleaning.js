import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Book_Cleaning.css';
// Images
import Chris from './img/chris.jpg'
import Samantha from './img/samantha.jpg'
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
// Material UI
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
// Syncfusion
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';

function Book_Cleaning() {
    const navigate = useNavigate();

    // Booking Confirm Modal
    const [bookingModal, setBookingModal] = useState(false);

    const handleClose = () => setBookingModal(false);
    const handleShow = () => setBookingModal(true);

    // Syncfusion DateTime Picker
    const clickDate = (value) => {
        console.log(value)
    }

    // Handle Booking
    const handleBooking = () => {
        navigate('/Confirm_Booking');
    }

    return (
        <>
            <div>
                <div style={{ padding: '30px' }}>
                    <div>
                        <div className="col-md-4 datetimepicker mt-4">
                            <DateTimePickerComponent></DateTimePickerComponent>
                        </div>

                        <div className='mt-4 available-cleaners-title'>
                            List of Available Cleaners
                        </div>

                        <div className='mt-4'>
                            <Paper>
                                <div className='parent-maid-details'>
                                    <Row>
                                        <Col xs={2}>
                                            <div>
                                                <img src={Chris} alt="Paris" className='image-maid' />
                                            </div>
                                        </Col>

                                        <Col>
                                            <div>
                                                <div className='maid-name'>
                                                    CHRIS EVANS
                                                </div>
                                                <hr />
                                                <div className='btn-book'>
                                                    <Button variant="contained" color="primary" onClick={handleShow}>
                                                        Book
                                                    </Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Paper>
                        </div>

                        <div className='mt-4'>
                            <Paper>
                                <div className='parent-maid-details'>
                                    <Row>
                                        <Col xs={2}>
                                            <div>
                                                <img src={Samantha} alt="Paris" className='image-maid' />
                                            </div>
                                        </Col>

                                        <Col>
                                            <div>
                                                <div className='maid-name'>
                                                    SAMANTHA CLARK
                                                </div>
                                                <hr />
                                                <div className='btn-book'>
                                                    <Button variant="contained" color="primary" onClick={handleShow}>
                                                        Book
                                                    </Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Paper>
                        </div>

                    </div>
                </div>
                <Modal show={bookingModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Booking</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Confirm Booking for this slot?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="contained" color='success' onClick={handleBooking}>
                            Confirm Booking
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default Book_Cleaning;