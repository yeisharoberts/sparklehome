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

                <div className='parent-about-us'>
                    <div className='what-we-do'>
                        Top Cleaning Company in Malaysia
                    </div>
                    <div className='what-we-do-text'>
                        We are the top cleaning company in Malaysia. We are an established and reputable cleaning company which has been operating in the cleaning industry since 2010. We have cleaned many houses and offices for the past decade winning the hearts of many satisfied customers. We have a few teams of efficient, honest and loyal cleaning crews who do cleaning jobs effectively and efficiently. Customer satisfaction is always our number 1 priority.
                    </div>
                </div>

                <div className='parent-our-services'>
                    <div className='our-services'>
                        Cleaning Services
                    </div>

                    <div className='row-services'>
                        <Row>
                            <Col>
                                <div>
                                    <Card className='card-services'>
                                        <div>
                                            <div className='gi-broom'>
                                                <GiBroom />
                                            </div>
                                            <div className='services1-title'>
                                                Floor and Carpet
                                            </div>
                                            <div className='services1-desc'>
                                                We can assist you with all kinds of carpet cleaning services such as carpet steam cleaning, carpet dry cleaning, carpet stain removal and carpet repair.
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    <Card className='card-services'>
                                        <div>
                                            <div className='tb-window'>
                                                <TbWindow />
                                            </div>
                                            <div className='services1-title'>
                                                Window Washing
                                            </div>
                                            <div className='services1-desc'>
                                                We can thoroughly clean the glass on your windows and keep it in top condition.
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    <Card className='card-services'>
                                        <div>
                                            <div className='fahandswash'>
                                                <FaHandsWash />
                                            </div>
                                            <div className='services1-title'>
                                                Janitorial Services
                                            </div>
                                            <div className='services1-desc'>
                                                We provide trash removal services from your home, office or business so that you will have a clean environment.
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    <Card className='card-services'>
                                        <div>
                                            <div className='im-power'>
                                                <ImPower />
                                            </div>
                                            <div className='services1-title'>
                                                Power Washing
                                            </div>
                                            <div className='services1-desc'>
                                                We offer appliance deep clean service. Deep cleaning your home is one of the best ways to ensure that your home is a safe and comfortable place to relax.
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