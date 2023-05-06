// css
import './css/Home.css';
// Icon
import { GiVacuumCleaner } from "react-icons/gi";
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Home() {
    return (
        <>
            <div className="parent-home">
                <div className="home-header">
                    <div className='header-title'>
                        <Row>
                            <Col className='row-title'>
                                <div>
                                    <div className='title-header'>
                                        We Clean, You Relax..
                                    </div>
                                    <div className='title-desc'>
                                        We always have the perfect cleaning goal for your perfect home.
                                    </div>
                                    <div className='title-btn'>
                                        <Button className='btn-service'>Book Cleaning Service</Button>
                                    </div>
                                </div>
                            </Col>
                            <Col className='row-icon'>
                                <GiVacuumCleaner className='icon-vacuum' />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;