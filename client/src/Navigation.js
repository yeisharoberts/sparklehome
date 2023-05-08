import './css/Navigation.css'
// Bootstrap
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// Icons
import { MdOutlineCleanHands } from 'react-icons/md';

function Navigation() {
    return (
        <>
            <div className="parent-navigation">
                <div className='navigation'>
                    <Navbar>
                        <Container>
                            <Navbar.Brand href="/"><MdOutlineCleanHands /> SparkleHome</Navbar.Brand>
                            <Navbar.Toggle />
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>
                                    <a href="/Login" className='log-tag'>Login</a>
                                </Navbar.Text>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </div>
        </>
    );
}

export default Navigation;