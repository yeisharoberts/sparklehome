import Axios from 'axios';
import './../css/Admin_Layout.css'
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Stack, ToastContainer, Toast } from 'react-bootstrap';

function Manage_Maid() {
    Axios.defaults.withCredentials = true;
    const [maids, setMaids] = useState([]);
    const [editedMaid, setEditedMaid] = useState({ maid_name: '', maid_phone: '' });

    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(true);
    const [selectedRow, setSelectedRow] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState();

    //get
    useEffect(() => {
        Axios.get('http://localhost:5001/get_all_maids').then((res) => {
            if (res.data) {
                console.log(res);
                setMaids(res.data)
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
        if (editedMaid.maid_id) {
            updateMaid(editedMaid.maid_id, editedMaid);
            const maidIndex = maids.findIndex(maid => maid.maid_id === editedMaid.maid_id);
            const updatedMaids = [...maids];
            updatedMaids[maidIndex] = editedMaid;
            setMaids(updatedMaids);
        } else {
            addMaid(editedMaid);
        }
        setShowFormModal(false);
    };
    const addMaid = (newMaid) => {
        console.log(newMaid);
        Axios.post(`http://localhost:5001/add_maid`, newMaid)
            .then((res) => {
                console.log(res);
                console.log(res.data.res.insertId);
                setToastMessage(res.data.message);
                setShowToast(true);
                newMaid.maid_id = res.data.res.insertId;
                setMaids([...maids, { ...newMaid }]);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const updateMaid = (maidId, updatedMaidData) => {
        Axios.put(`http://localhost:5001/update_maid/${maidId}`, updatedMaidData)
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
        if (editedMaid) {
            deleteMaid(editedMaid.maid_id);
            setMaids(maids.filter(maid => maid.maid_id !== editedMaid.maid_id));
        }
        setShowDeleteModal(false);
    };
    const deleteMaid = (maidId) => {
        Axios.delete(`http://localhost:5001/delete_maid/${maidId}`)
            .then((res) => {
                setToastMessage(res.data.message);
                setButtonDisable(true);
                setSelectedRow(null);
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
                        <Button disabled={!buttonDisable} variant="primary" onClick={handleShowForm}>
                            Add Maid
                        </Button>
                        <Button disabled={buttonDisable} variant="warning" onClick={handleShowForm}>
                            Edit Maid
                        </Button>
                        <Button disabled={buttonDisable} variant="danger" onClick={handleShowDeleteModal}>
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
                                    <th></th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {maids.map((maid) => (
                                    <tr key={maid.maid_id}>
                                        <td>
                                            <Form.Check
                                                type="checkbox"
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedRow(maid.maid_id);
                                                        setButtonDisable(false);
                                                        setEditedMaid(maid);
                                                    } else {
                                                        setSelectedRow(null);
                                                        setButtonDisable(true);
                                                        setEditedMaid({});
                                                    }
                                                }}
                                                checked={selectedRow === maid.maid_id}
                                            />
                                        </td>
                                        <td>{maid.maid_id}</td>
                                        <td>{maid.maid_name}</td>
                                        <td>{maid.maid_phone}</td>
                                        <td>{maid.maid_image}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Stack>

                    <Modal show={showFormModal} onHide={handleCloseForm}>
                        <Modal.Header closeButton>
                            <Modal.Title>Maid Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="maid_name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Maid Name"
                                        value={editedMaid.maid_name}
                                        onChange={(e) =>
                                            setEditedMaid({ ...editedMaid, maid_name: e.target.value })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group controlId="maid_phone">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Maid Phone"
                                        value={editedMaid.maid_phone}
                                        onChange={(e) =>
                                            setEditedMaid({ ...editedMaid, maid_phone: e.target.value })
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
                            <Modal.Title>Delete Maid</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete {editedMaid.maid_name}?</Modal.Body>
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

export default Manage_Maid;
