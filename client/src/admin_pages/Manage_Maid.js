import './../css/Admin_Layout.css'
import React from 'react';
import { Table, Button, Modal, Form, Stack } from 'react-bootstrap';

function Manage_Maid() {
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [users, setUsers] = React.useState([
        { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' },
        { id: 3, name: 'Bob Smith', email: 'bobsmith@example.com' },
    ]);

    const [newUser, setNewUser] = React.useState({ name: '', email: '' });

    const handleAddModalClose = () => setShowAddModal(false);
    const handleAddModalShow = () => setShowAddModal(true);

    const handleAddUser = () => {
        setUsers([...users, { ...newUser, id: users.length + 1 }]);
        setNewUser({ name: '', email: '' });
        setShowAddModal(false);
    };

    return (
        <>
            <Stack gap={3}>
                <div className='card'>
                    <Stack direction="horizontal" gap={3}>


                        <Button variant="primary" onClick={handleAddModalShow}>
                            Add Maid
                        </Button>
                        <Button variant="warning">
                            Edit Maid
                        </Button>
                        <Button variant="danger" >
                            Delete Maid
                        </Button>
                    </Stack>
                </div>

                <div className='card'>
                    <Stack gap={3}>

                        <h1>Manage Maids</h1>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Stack>

                    <Modal show={showAddModal} onHide={handleAddModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        value={newUser.name}
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, name: e.target.value })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={newUser.email}
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, email: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleAddModalClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleAddUser}>
                                Add User
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Stack>
        </>
    );
}

export default Manage_Maid;
