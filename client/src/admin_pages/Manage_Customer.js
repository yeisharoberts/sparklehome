import Axios from 'axios';
import './../css/Admin_Layout.css'
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Stack, Toast, ToastContainer } from 'react-bootstrap';

function Manage_Customer() {
    Axios.defaults.withCredentials = true;
    const [users, setUsers] = useState([]);
    const [editedUser, setEditedUser] = useState({});
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(true);
    const [selectedRow, setSelectedRow] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState();

    useEffect(() => {
        Axios.get('http://localhost:5001/get_all_customers').then((res) => {
            if (res.data) {
                setUsers(res.data)
            }
        }).catch((err) => {
            console.log("Error");
            console.log(err);
        });
    }, []);

    //edit
    const handleShowForm = () => setShowFormModal(true);
    const handleCloseForm = () => setShowFormModal(false);
    const handleSaveForm = () => {
        if (editedUser) {
            updateUser(editedUser.user_id, editedUser);
            const userIndex = users.findIndex(user => user.user_id === editedUser.user_id);
            const updatedUsers = [...users];
            updatedUsers[userIndex] = editedUser;
            setUsers(updatedUsers);
        } else {
            setUsers([...users, { ...editedUser }]);
            //add
        }
        setShowFormModal(false);
    };

    const updateUser = (userId, updatedUserData) => {
        Axios.put(`http://localhost:5001/update_user/${userId}`, updatedUserData)
            .then((res) => {
                setToastMessage(res.data.message);
                setShowToast(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //delete
    const handleShowDeleteModal = () => setShowDeleteModal(true);
    const handleCloseDelete = () => setShowDeleteModal(false);
    const handleDelete = () => {
        if (editedUser) {
            deleteUser(editedUser.user_id);
            setUsers(users.filter(user => user.user_id !== editedUser.user_id));
        }
        setShowDeleteModal(false);
    };
    const deleteUser = (userId) => {
        Axios.delete(`http://localhost:5001/delete_user/${userId}`)
            .then((res) => {
                setToastMessage(res.data.message);
                setShowToast(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <ToastContainer position="top-end" className="p-3">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>

            <Stack gap={3}>
                <div className='card'>
                    <Stack direction="horizontal" gap={3}>
                        <Button disabled={buttonDisable} variant="warning" onClick={handleShowForm}>
                            Edit User
                        </Button>
                        <Button disabled={buttonDisable} variant="danger" onClick={handleShowDeleteModal}>
                            Delete User
                        </Button>
                    </Stack>
                </div>

                <div className='card'>
                    <Stack gap={3}>
                        <h1>Manage Customers</h1>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.user_id}>
                                        <td>
                                            <Form.Check
                                                type="checkbox"
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedRow(user.user_id);
                                                        setButtonDisable(false);
                                                        setEditedUser(user);
                                                    } else {
                                                        setSelectedRow(null);
                                                        setButtonDisable(true);
                                                        setEditedUser({});
                                                    }
                                                }}
                                                checked={selectedRow === user.user_id}
                                            />
                                        </td>
                                        <td>{user.user_id}</td>
                                        <td>{user.user_name}</td>
                                        <td>{user.user_email}</td>
                                        <td>{user.user_phone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Stack>

                    <Modal show={showFormModal} onHide={handleCloseForm}>
                        <Modal.Header closeButton>
                            <Modal.Title>Customer Detail</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="user_name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        value={editedUser.user_name}
                                        onChange={(e) =>
                                            setEditedUser({ ...editedUser, user_name: e.target.value })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group controlId="user_email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={editedUser.user_email}
                                        onChange={(e) =>
                                            setEditedUser({ ...editedUser, user_email: e.target.value })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group controlId="user_phone">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter phone"
                                        value={editedUser.user_phone}
                                        onChange={(e) =>
                                            setEditedUser({ ...editedUser, user_phone: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseForm}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSaveForm}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showDeleteModal} onHide={handleCloseDelete}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete {editedUser.user_name}?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseDelete}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleDelete}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </Stack>
        </>
    );
}

export default Manage_Customer;
