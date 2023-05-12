import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
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
    const [scheduleList, setScheduleList] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [userId, setUserId] = useState(0);
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [data, setData] = useState(null);

    const handleClose = () => setBookingModal(false);
    const handleShow = () => setBookingModal(true);


    // Syncfusion DateTime Picker
    const handleDateChange = (date) => {
        let temp_date = new Date(date);
        setCurrentDate(temp_date.getDate());
    }

    // Handle Booking  
    const handleBooking = async (data) => {
        Object.assign(data, {user_id: userId, user_email: userEmail, user_name: userName});
        console.log(data);
        try {
            //insert data into booking table
            Axios.post('http://localhost:5001/booking', data).then((res) => {
                console.log(res);
            });

            console.log('Booking successful!');
        } catch(error){
            console.log(error);
        }
    };

    const handleBooking2 = async () => {
        try {
            const response = await fetch('https://ycct2v4jg4kqm63xq5lq4dhkwa0iqbss.lambda-url.us-east-1.on.aws/', {
                method: 'POST',
                body: JSON.stringify({ id: 5, user_name: 'John' }),
            });
            const data = await response.json();
            setData(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        Axios.get('http://localhost:5001/get_schedule').then((res) => {
            setScheduleList(res.data);
        });

        Axios.get('http://localhost:5001/login_action').then((res) => {
            if (res.data.loggedIn) {
                setUserId(res.data.user[0].user_id);
                setUserEmail(res.data.user[0].user_email);
                setUserName(res.data.user[0].user_name);
            }
        }).catch((err) => {
            console.log(err);
        });
    });

    return (
        <>
            <div>
                <div style={{ padding: '30px' }}>
                    <div>
                        <div className="col-md-4 datetimepicker mt-4">
                            <DateTimePickerComponent value={currentDate} onClick={(e) => { handleDateChange(e.target.value) }} />
                        </div>

                        <div className='mt-4 available-cleaners-title'>
                            List of Available Cleaners
                        </div>

                        {
                            scheduleList.filter((val) => {
                                let temp = new Date(val.schedule_datetime);
                                return temp.getDate() === currentDate
                            }).map((value) => {
                                return (
                                    <>
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
                                                                    {value.maid_name}
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
                                        <Modal show={bookingModal} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Confirm Booking</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Confirm Booking for this slot?</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="contained" color='success' onClick={()=>{handleBooking(value)}}>
                                                    Confirm Booking
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Book_Cleaning;