import './../css/Admin_Layout.css'
import React from 'react';
import Sidebar from '../admin_components/Side_nav_bar';
import Footer from '../admin_components/Footer';
import { Route, Routes } from 'react-router-dom';
import Manage_Customer from './Manage_Customer';
import Manage_Maid from './Manage_Maid';
import Manage_Schedule from './Manage_Schedule';
import Admin_Home from './Admin_Home';
import { Col, Container, Row } from 'react-bootstrap';

function Admin_Layout() {
    return (
        <>
            <Container fluid className="admin-layout">
                <Row>
                    <Col md={3} lg={2} className="nav-card">
                        <Sidebar />
                    </Col>
                    <Col md={9} lg={10} className="admin-body-content">
                        <Routes>
                            <Route path="/" element={<Admin_Home />} />
                            <Route path="/manage_customers" element={<Manage_Customer />} />
                            <Route path="/manage_maid" element={<Manage_Maid />} />
                            <Route path="/manage_schedule" element={<Manage_Schedule />} />
                        </Routes>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}

export default Admin_Layout;