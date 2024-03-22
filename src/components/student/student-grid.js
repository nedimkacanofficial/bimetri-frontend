import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import StudentAddModal from "./student-add-modal";
import StudentEditModal from "./student-edit-modal";
import { allStudents } from "../../api/student-service";
import { toast } from "../../helpers/swal";

const StudentGrid = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const [students, setStudents] = useState([]);

  const loadData = async () => {
    try {
      const resp = await allStudents();
      setStudents(resp.data);
    } catch (err) {
      toast("end", err.response.data.message, "warning", 2000);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Button variant="primary" className="mb-3" onClick={handleShowAddModal}>
        Student Add
      </Button>
      <span style={{ marginRight: "10px" }}></span>
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
          {students.map((student, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{student.name}</td>
              <td>{student.surname}</td>
              <td>{student.schoolNumber}</td>
              <td className="d-flex align-items-center justify-content-center">
                <Button variant="danger" style={{ width: "50%" }}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
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
};

export default StudentGrid;
