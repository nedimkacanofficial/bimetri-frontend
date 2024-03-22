import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import CourseEditModal from './course-edit-modal';
import CourseAddModal from './course-add-modal';

const CourseGrid = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const handleCloseAddModal = () => setShowAddModal(false);
    const handleShowAddModal = () => setShowAddModal(true);

    const [showEditModal, setShowEditModal] = useState(false);
    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = () => setShowEditModal(true);
  return (
    <>
      <Button variant="primary" className="mb-3" onClick={handleShowAddModal}>
        Course Add
      </Button>
      <span style={{ marginRight: "10px" }}></span> {/* Boşluk */}
      <Button variant="primary" className="mb-3" onClick={handleShowEditModal}>
        Course Edit
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td className="d-flex align-items-center justify-content-center">
              <Button
                variant="danger"
                style={{ width: "50%" }}
              >
                Delete
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      {showAddModal && (
        <CourseAddModal show={showAddModal} handleClose={handleCloseAddModal} />
      )}
      {showEditModal && (
        <CourseEditModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
        />
      )}
    </>
  );
}

export default CourseGrid
