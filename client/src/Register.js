import './css/Register.css';
// Material UI
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function Register() {
    return (
        <>
            <div className="parent-register">
                <div className="register-form">
                    <Row className='mt-3'>
                        <Col></Col>
                        <Col xs={6}>
                            <Paper className='mt-4'>
                                <div className='form-content'>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Full Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Full Name" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Enter Email" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter Password" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Contact Number</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Contact Number" />
                                        </Form.Group>

                                        <div>Already have an account? Click <a href='/Login'>here</a> to login!</div>

                                        <div className='btn-login mt-4'>
                                            <Button variant="contained" color='primary'>
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