import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-left">
            <p>&copy; 2023 Sparkle Home. All Rights Reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-right">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#terms">Terms &amp; Conditions</a>
              </li>
              <li className="list-inline-item">
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li className="list-inline-item">
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
