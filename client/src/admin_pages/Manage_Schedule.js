import Axios from 'axios';
import './../css/Admin_Layout.css'
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Stack, ToastContainer, Toast } from 'react-bootstrap';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';

function Manage_Schedule() {

    Axios.defaults.withCredentials = true;
    const dateValue = new Date();
    dateValue.setMinutes(0);
    dateValue.setSeconds(0);
    const [schedules, setSchedules] = useState([]);
    const [editedSchedule, setEditedSchedule] = useState({ maid_id: '', schedule_datetime: '' });
    const [maids, setMaids] = useState([]);
    const [maidName, setMaidName] = useState();

    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(true);
    const [selectedRow, setSelectedRow] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState();

    //get
    useEffect(() => {
        Axios.get('http://localhost:5001/get_all_schedules').then((res) => {
            if (res.data) {
                console.log(res);
                setSchedules(res.data)
            }
        }).catch((err) => {
            console.log("Error");
            console.log(err);
        });
    }, []);

    //get maid
    useEffect(() => {
        Axios.get('http://localhost:5001/get_all_maids').then((res) => {
            if (res.data) {
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
        if (editedSchedule.schedule_id) {
            updateSchedule(editedSchedule.schedule_id, editedSchedule);
            const scheduleIndex = schedules.findIndex(schedule => schedule.schedule_id === editedSchedule.schedule_id);
            const updatedSchedules = [...schedules];
            updatedSchedules[scheduleIndex] = editedSchedule;
            setSchedules(updatedSchedules);
        } else {
            addSchedule(editedSchedule);
        }
        setShowFormModal(false);
    };
    const addSchedule = (newSchedule) => {
        console.log(newSchedule);
        Axios.post(`http://localhost:5001/add_schedule`, newSchedule)
            .then((res) => {
                setToastMessage(res.data.message);
                setShowToast(true);
                newSchedule.schedule_id = res.data.res.insertId;
                setSchedules([...schedules, { ...newSchedule }]);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const updateSchedule = (scheduleId, updatedScheduleData) => {
        console.log(updatedScheduleData);
        Axios.put(`http://localhost:5001/update_schedule/${scheduleId}`, updatedScheduleData)
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
        if (editedSchedule) {
            deleteSchedule(editedSchedule.schedule_id);
            setSchedules(schedules.filter(schedule => schedule.schedule_id !== editedSchedule.schedule_id));
        }
        setShowDeleteModal(false);
    };
    const deleteSchedule = (scheduleId) => {
        Axios.delete(`http://localhost:5001/delete_schedule/${scheduleId}`)
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
                            Add Schedule
                        </Button>
                        <Button disabled={buttonDisable} variant="warning" onClick={handleShowForm}>
                            Edit Schedule
                        </Button>
                        <Button disabled={buttonDisable} variant="danger" onClick={handleShowDeleteModal}>
                            Delete Schedule
                        </Button>
                    </Stack>
                </div>

                <div className='card'>
                    <Stack gap={3}>

                        <h1>Manage Schedules</h1>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>ID</th>
                                    <th>Maid</th>
                                    <th>Date / Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedules.map((schedule) => (
                                    <tr key={schedule.schedule_id}>
                                        <td>
                                            <Form.Check
                                                type="checkbox"
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedRow(schedule.schedule_id);
                                                        setButtonDisable(false);
                                                        setEditedSchedule(schedule);
                                                    } else {
                                                        setSelectedRow(null);
                                                        setButtonDisable(true);
                                                        setEditedSchedule({});
                                                    }
                                                }}
                                                checked={selectedRow === schedule.schedule_id}
                                            />
                                        </td>
                                        <td>{schedule.schedule_id}</td>
                                        <td>{schedule.maid_id}</td>
                                        <td>{schedule.schedule_datetime}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Stack>

                    <Modal show={showFormModal} onHide={handleCloseForm}>
                        <Modal.Header closeButton>
                            <Modal.Title>Schedule Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="maid_id" className="mb-3">
                                    <Form.Label>Maid</Form.Label>
                                    <Form.Select onChange={(e) =>
                                        setEditedSchedule({ ...editedSchedule, maid_id: e.target.value })}>
                                        <option>Select a maid</option>
                                        {maids.map((maid) => (
                                            <option value={maid.maid_id}>{maid.maid_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId="schedule_datetime" className="mb-3">
                                    <Form.Label>Schedule Time</Form.Label>
                                    <DateTimePickerComponent placeholder='Choose a date and time'
                                        value={dateValue} min={dateValue} onChange={(e) =>
                                            setEditedSchedule({ ...editedSchedule, schedule_datetime: e.target.value.toLocaleString() })}></DateTimePickerComponent>
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
                            <Modal.Title>Delete Schedule</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete {editedSchedule.maid_id}?</Modal.Body>
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

export default Manage_Schedule;
