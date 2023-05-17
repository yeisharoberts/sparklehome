import './css/Navigation.css'
// React 
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Bootstrap
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
// Icons
import { MdOutlineCleanHands } from 'react-icons/md';

function Navigation() {

    Axios.defaults.withCredentials = true;
    const [loginBool, setLoginBool] = useState(false);
    const [userDisplay, setDisplayName] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        Axios.get('http://localhost:5001/login_action').then((res) => {
            if (res.data.loggedIn) {
                setDisplayName(res.data.user[0].user_name)
            }
            console.log(res);
            setLoginBool(true);
        }).catch((err) => {
            console.log(err);
        });
    });

    const handleLogout = () => {
        Axios.post('http://localhost:5001/logout_action').then((res) => {
            if (res.data.success) {
                setLoginBool(false);
                navigate("/Login");
            }
        });
    }

    return (
        <>
            <div className="parent-navigation">
                <div className='navigation'>
                    <Navbar>
                        <Container>
                            <Navbar.Brand href="/"><MdOutlineCleanHands /> SparkleHome</Navbar.Brand>
                            <Navbar.Text>
                                <a href="/about" className='log-tag'>About Us</a>
                            </Navbar.Text>
                            <Navbar.Toggle />
                            <Navbar.Collapse className="justify-content-end">
                                {
                                    loginBool ?
                                        <NavDropdown
                                            title={userDisplay}
                                            menuVariant="dark"
                                        >
                                            <NavDropdown.Item href="/My_Booking">My Booking</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={handleLogout}>
                                                Logout
                                            </NavDropdown.Item>
                                        </NavDropdown> :

                                        <Navbar.Text>
                                            <a href="/Login" className='log-tag'>Login</a>
                                        </Navbar.Text>
                                }
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </div>
        </>
    );
}

export default Navigation;