import './../css/Admin_Layout.css'
import React from 'react';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroomBall, faCalendarDays, faUserGroup } from '@fortawesome/free-solid-svg-icons';

function Admin_Home() {
    return (
        <Container fluid>
            <Row className='home-text'>
                <h2>Welcome Back Admin!</h2>
                <p>Which task do you want to start with today?</p>
            </Row>
            <Stack gap={3} className='card'>
                <Button variant="outline-success" size="lg" href="/admin/manage_customers">
                    <FontAwesomeIcon icon={faUserGroup} />
                    Manage Customers</Button>
                <Button variant="outline-success" size="lg" href="/admin/manage_maid">
                    <FontAwesomeIcon icon={faBroomBall} />
                    Manage Maids</Button>
                <Button variant="outline-success" size="lg" href="/admin/manage_schedule">
                    <FontAwesomeIcon icon={faCalendarDays} />
                    Manage Schedules</Button>
            </Stack>
        </Container>
    );
}

export default Admin_Home;
