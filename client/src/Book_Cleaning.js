// Bootstrap
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function Book_Cleaning() {
    return (
        <>
            <div>
                <div style={{ padding: '30px' }}>
                    <Card>
                        <Form>
                            <div>
                                <Row>
                                    <Col>
                                        <Form.Control placeholder="First name" />
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="Last name" />
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Book_Cleaning;