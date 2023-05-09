import './css/Login.css';
// Material UI
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function Login() {
    return (
        <>
            <div className="parent-login">
                <div className="login-form">
                    <Row className='mt-3'>
                        <Col></Col>
                        <Col xs={6}>
                            <Paper className='mt-5'>
                                <div className='form-content'>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter Password" />
                                        </Form.Group>
                                        <div>Don't have an account? Click <a href='/Register'>here</a> to create!</div>
                                        <div className='btn-login mt-4'>
                                            <Button variant="contained" color='primary'>
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