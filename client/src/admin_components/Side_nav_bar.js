import './../css/Admin_Layout.css'
import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroomBall, faCalendarDays, faHouse, faUserGroup } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
    const location = useLocation();

    return (
        <div>
            <Nav fill className="flex-column" variant="pills" activeKey={location.pathname}>
                <NavItem>
                    <Nav.Link href="/admin">
                        <FontAwesomeIcon icon={faHouse} />
                        Admin Home</Nav.Link>
                </NavItem>
                <NavItem>
                    <Nav.Link href="/admin/manage_customers">
                        <FontAwesomeIcon icon={faUserGroup} />
                        Customers</Nav.Link>
                </NavItem>
                <NavItem>
                    <Nav.Link href="/admin/manage_maid">
                        <FontAwesomeIcon icon={faBroomBall} />
                        Maid</Nav.Link>
                </NavItem>
                <NavItem>
                    <Nav.Link href="/admin/manage_schedule">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        Schedule</Nav.Link>
                </NavItem>
            </Nav>
        </div>
    );
}

export default Sidebar;
