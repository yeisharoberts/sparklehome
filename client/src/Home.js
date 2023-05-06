// css
import './css/Home.css';
// Icon
import { GiVacuumCleaner, GiBroom } from "react-icons/gi";
import { TbWindow } from "react-icons/tb";
import { FaHandsWash } from "react-icons/fa";
import { ImPower } from "react-icons/im";
// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
                                        We Clean,<br /> You Relax...
                                    </div>
                                    <div className='title-desc'>
                                        We always have the perfect cleaning goal for your perfect home.
                                    </div>
                                    <div className='title-btn'>
                                        <Button className='btn-service' href="/Book_Cleaning">Book Cleaning Service</Button>
                                    </div>
                                </div>
                            </Col>
                            <Col className='row-icon'>
                                <GiVacuumCleaner className='icon-vacuum' />
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='parent-our-services'>
                    <div className='our-services'>
                        Our Services
                    </div>

                    <div className='row-services'>
                        <Row>
                            <Col>
                                <div>
                                    <Card>
                                        <div>
                                            <div className='gi-broom'>
                                                <GiBroom />
                                            </div>
                                            <div className='services1-title'>
                                                Floor and Carpet
                                            </div>
                                            <div className='services1-desc'>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    <Card>
                                        <div>
                                            <div className='tb-window'>
                                                <TbWindow />
                                            </div>
                                            <div className='services1-title'>
                                                Window Washing
                                            </div>
                                            <div className='services1-desc'>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    <Card>
                                        <div>
                                            <div className='fahandswash'>
                                                <FaHandsWash />
                                            </div>
                                            <div className='services1-title'>
                                                Janitorial Services
                                            </div>
                                            <div className='services1-desc'>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    <Card>
                                        <div>
                                            <div className='im-power'>
                                                <ImPower />
                                            </div>
                                            <div className='services1-title'>
                                                Power Washing
                                            </div>
                                            <div className='services1-desc'>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;