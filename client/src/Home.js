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
                        What We Do
                    </div>
                    <div className='what-we-do-text'>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
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