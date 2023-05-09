// React
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
// CSS
import './css/Login.css';
// Material UI
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function Login() {
    Axios.defaults.withCredentials = true;

    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [errMsg, setErrMsg] = useState(true);
    const [empErr, setEmpErr] = useState(true);

    const navigate = useNavigate();

    const handleLogin = () => {
        if(inputEmail.length < 1 || inputPassword.length < 1){
            setEmpErr(false);
            setErrMsg(true);
        }else {
            Axios.post('http://localhost:5001/user_login', {
                inputEmail: inputEmail,
                inputPassword: inputPassword
            }).then((result) => {
                console.log(result)
                if (result.data.status === 401) {
                    setEmpErr(true);
                    setErrMsg(false);
                }else{
                    navigate('/');
                }
            });
        }
    }

    return (
        <>
            <div className="parent-login">
                <div className="login-form">
                    <Row className='mt-3'>
                        <Col></Col>
                        <Col xs={6}>
                            <Paper className='mt-5'>
                                <div className='form-content'>
                                    <Alert className='mb-4' severity="error" hidden={empErr}>Please fill in empty fields!</Alert>
                                    <Alert className='mb-4' severity="error" hidden={errMsg}>Invalid Credentials!</Alert>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => { setInputEmail(e.target.value) }} />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter Password" onChange={(e) => { setInputPassword(e.target.value) }} />
                                        </Form.Group>
                                        <div>Don't have an account? Click <a href='/Register'>here</a> to create!</div>
                                        <div className='btn-login mt-4'>
                                            <Button variant="contained" color='primary' onClick={handleLogin}>
                                                Submit
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

export default Login;