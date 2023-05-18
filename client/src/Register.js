// React
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
// CSS
import './css/Register.css';
// Material UI
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function Register() {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [empErr, setEmpErr] = useState(true);

    const navigate = useNavigate();

    const handleRegister = () => {
        if(userName.length < 1 || userEmail.length < 1 || userPassword.length < 1 || userPhone.length < 1){
            setEmpErr(false);
        }else{
            Axios.post('http://100.27.20.250/user_register', {
                userName: userName,
                userEmail: userEmail,
                userPassword: userPassword,
                userPhone: userPhone
            }).then((result) => {
                if (result.status === 200) {
                    navigate('/Login');
                }
            });
        }
    }

    return (
        <>
            <div className="parent-register">
                <div className="register-form mb-5">
                    <Row className='mt-3'>
                        <Col></Col>
                        <Col xs={6}>
                            <Paper className='mt-4'>
                                <div className='form-content'>
                                    <Alert className='mb-4' severity="error" hidden={empErr}>Please fill in all details!</Alert>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Full Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Full Name" onChange={(e) => { setUserName(e.target.value) }} />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Enter Email" onChange={(e) => { setUserEmail(e.target.value) }} />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter Password" onChange={(e) => { setUserPassword(e.target.value) }} />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Contact Number</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Contact Number" onChange={(e) => { setUserPhone(e.target.value) }} />
                                        </Form.Group>

                                        <div>Already have an account? Click <a href='/Login'>here</a> to login!</div>

                                        <div className='btn-login mt-4'>
                                            <Button variant="contained" color='primary' onClick={handleRegister}>
                                                Create Account
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </Paper>
                        </Col>
                        <Col></Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default Register;