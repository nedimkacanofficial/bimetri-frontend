import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { toast } from "../../helpers/swal";
import { getStudentAndCourses } from "../../api/student-service";
import EnrollModal from "./enroll-modal";

const Home = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const [studentAndCourses, setStudentAndCourses] = useState([]);

  const loadData = async () => {
    try {
      var resp = await getStudentAndCourses();
      if (resp.status === 200) {
        setStudentAndCourses(resp.data);
      }
    } catch (err) {
      toast("end", err.response.data.message, "warning", 2000);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div
        className="row justify-content-center pt-2 pb-3"
        style={{ minHeight: "calc(100vh - 100px)", margin: 0 }}
      >
        <div className="col-10">
          <h2 className="text-center">Welcome to Bimetri</h2>
          <Button
            variant="primary"
            className="mb-3"
            onClick={handleShowAddModal}
          >
            Course Add Student
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Surname</th>
                <th>School Number</th>
                <th>Courses</th>
              </tr>
            </thead>
            <tbody>
              {studentAndCourses.map((studentAndCourse, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{studentAndCourse.name}</td>
                  <td>{studentAndCourse.surname}</td>
                  <td>{studentAndCourse.schoolNumber}</td>
                  <td>{studentAndCourse.courses}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      {showAddModal && (
        <EnrollModal
          show={showAddModal}
          handleClose={handleCloseAddModal}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default Home;
