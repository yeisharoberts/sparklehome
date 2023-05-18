import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './css/Book_Cleaning.css';
// Images
import Chris from './img/chris.jpg'
// Bootstrap
import Alert from '@mui/material/Alert';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
// Material UI
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import Divider from '@mui/material/Divider';
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
    const [selectedItem, setSelectedItem] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);

    const handleClose = () => {
        setBookingModal(false);
        setShowSpinner(false);
    }

    const handleShow = (item) => {
        setBookingModal(true);
        setSelectedItem(item);
    }

    // Syncfusion DateTime Picker
    const handleDateChange = (date) => {
        let temp_date = new Date(date);
        setCurrentDate(temp_date);
    }

    // Handle Booking  
    const handleBooking = async (data) => {
        Object.assign(data, { user_id: userId, user_email: userEmail, user_name: userName, booking_date: currentDate.toISOString().slice(0, 19).replace('T', ' '), sns_booking_date: currentDate });
        setShowSpinner(true);
        try {
            // insert data into booking table
            const response = await Axios.post('http://44.203.38.153/booking', data);
            if (response.status === 200) {
                navigate('/Booking_Confirmation', { state: { selectedItem: data } });
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        Axios.get('http://44.203.38.153/get_schedule').then((res) => {
            setScheduleList(res.data);
        });

        Axios.get('http://44.203.38.153/login_action').then((res) => {
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

                        <div className="container-maid mt-4">
                            {
                                scheduleList.filter((val) => {
                                    const date = new Date(currentDate);
                                    const formattedDate = date.toISOString();
                                    return val.schedule_datetime.slice(0, 10) === formattedDate.slice(0, 10)
                                }).map((value) => {
                                    return (
                                        <>
                                            <React.Fragment key={value.id}>
                                                <div className="item">
                                                    <Paper>
                                                        <div className='parent-paper'>
                                                            <div className='parent-image-maid'>
                                                                <img src={`https://sparkle-home-s3.s3.amazonaws.com/maid/${value.maid_image}`} alt="Paris" className='image-maid' />
                                                            </div>

                                                            <div>
                                                                <div className='maid-name'>
                                                                    {value.maid_name}
                                                                </div>
                                                                <hr />
                                                                <div className='btn-book'>
                                                                    <Button variant="contained" color="primary" onClick={() => handleShow(value)}>
                                                                        Book
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Paper>
                                                </div>
                                            </React.Fragment>
                                            {selectedItem && (
                                                <Modal show={bookingModal} onHide={handleClose}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Confirm Booking</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Alert severity="warning">
                                                            Confirm Booking for this slot? Please check details below:
                                                        </Alert>
                                                        <List
                                                            sx={{
                                                                width: '100%',
                                                                maxWidth: 360,
                                                                bgcolor: 'background.paper',
                                                            }}
                                                        >
                                                            <ListItem>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <CalendarMonthIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary="Date & Time"
                                                                    secondary={currentDate.toLocaleString()}
                                                                />
                                                            </ListItem>
                                                            <Divider variant="inset" component="li" />
                                                            <ListItem>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <PersonIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary="Cleaner"
                                                                    secondary={selectedItem.maid_name}
                                                                />
                                                            </ListItem>
                                                        </List>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button
                                                            variant="contained"
                                                            color="success"
                                                            onClick={() => {
                                                                handleBooking(selectedItem);
                                                            }}
                                                        >
                                                            {showSpinner ? <Spinner animation="border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </Spinner> : 'Confirm Booking'}
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            )}
                                        </>
                                    );
                                })
                            }
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}

export default Book_Cleaning;