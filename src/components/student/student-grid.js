import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import StudentAddModal from "./student-add-modal";
import StudentEditModal from "./student-edit-modal";
import {
  allStudents,
  deleteStudent,
  studentsWithoutCourses,
} from "../../api/student-service";
import { toast } from "../../helpers/swal";

const StudentGrid = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async (param = null) => {
    try {
      let resp;
      if (param === null) {
        resp = await allStudents();
      } else {
        resp = param;
      }
      setStudents(resp.data);
    } catch (err) {
      toast("end", err.response.data.message, "warning", 2000);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStudentsWithoutCourses = async () => {
    try {
      setLoading(true);
      const resp = await studentsWithoutCourses();
      if (resp.status === 200) {
        setStudents(resp.data);
        toast("end", "Filtering successful.", "success", 2000);
      }
    } catch (err) {
      toast("end", err.response.data.message, "error", 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="primary" className="mb-3" onClick={handleShowAddModal}>
        Student Add
      </Button>
      <span style={{ marginRight: "10px" }}></span>
      <Button
        variant="primary"
        className="mb-3"
        disabled={loading}
        onClick={handleStudentsWithoutCourses}
      >
        Courses without students
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
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.surname}</td>
              <td>{student.schoolNumber}</td>
              <td style={{ textAlign: "center", padding: "5px", width: "33%" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="warning"
                    className="mb-2"
                    style={{
                      width: "100px",
                      fontSize: "14px",
                      marginRight: "5px",
                    }}
                    onClick={() => {
                      setSelectedStudent(student);
                      handleShowEditModal();
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    className="mb-2"
                    style={{
                      width: "100px",
                      fontSize: "14px",
                      marginLeft: "5px",
                    }}
                    onClick={async () => {
                      try {
                        const resp = await deleteStudent(student.id);
                        if (resp.status === 200 && resp.data.success === true) {
                          toast("end", resp.data.message, "success", 2000);
                          loadData();
                        }
                      } catch (err) {
                        toast("end", err.response.data.message, "error", 2000);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showAddModal && (
        <StudentAddModal
          show={showAddModal}
          handleClose={handleCloseAddModal}
          loadData={loadData}
        />
      )}
      {showEditModal && (
        <StudentEditModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          loadData={loadData}
          selectedStudent={selectedStudent}
        />
      )}
    </>
  );
};

export default StudentGrid;
