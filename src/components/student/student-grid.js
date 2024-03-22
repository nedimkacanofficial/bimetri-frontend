import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import StudentAddModal from './student-add-modal';
import StudentEditModal from './student-edit-modal';

const StudentGrid = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const handleCloseAddModal = () => setShowAddModal(false);
    const handleShowAddModal = () => setShowAddModal(true);

    const [showEditModal, setShowEditModal] = useState(false);
    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = () => setShowEditModal(true);
  return (
    <>
      <Button variant="primary" className="mb-3" onClick={handleShowAddModal}>
        Student Add
      </Button>
      <span style={{ marginRight: "10px" }}></span> {/* Boşluk */}
      <Button variant="primary" className="mb-3" onClick={handleShowEditModal}>
        Student Edit
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Surname</th>
            <th>School Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td className="d-flex align-items-center justify-content-center">
              <Button variant="danger" style={{ width: "50%" }}>
                Delete
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      {showAddModal && (
        <StudentAddModal
          show={showAddModal}
          handleClose={handleCloseAddModal}
        />
      )}
      {showEditModal && (
        <StudentEditModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
        />
      )}
    </>
  );
}

export default StudentGrid
