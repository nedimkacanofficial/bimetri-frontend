import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import CourseEditModal from "./course-edit-modal";
import CourseAddModal from "./course-add-modal";
import {
  allCourses,
  coursesWithoutStudents,
  deleteCourse,
} from "../../api/course-service";
import { toast } from "../../helpers/swal";

const CourseGrid = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadData = async (param = null) => {
    try {
      let resp;
      if (param === null) {
        resp = await allCourses();
      } else {
        resp = param;
      }
      setCourses(resp.data);
    } catch (err) {
      toast("end", err.response.data.message, "warning", 2000);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCoursesWithoutStudents = async () => {
    try {
      setLoading(true);
      const resp = await coursesWithoutStudents();
      if (resp.status === 200) {
        setCourses(resp.data);
        toast("end", "Filtering successful.", "success", 2000);
      }
    } catch (err) {
      toast("end", err.response.data.message, "warning", 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="primary" className="mb-3" onClick={handleShowAddModal}>
        Course Add
      </Button>
      <span style={{ marginRight: "10px" }}></span>
      <Button
        variant="primary"
        className="mb-3"
        disabled={loading}
        onClick={handleCoursesWithoutStudents}
      >
        Courses without students
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
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{course.name}</td>
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
                      setSelectedCourse(course);
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
                        setLoading(true);
                        const resp = await deleteCourse(course.id);
                        if (resp.status === 200 && resp.data.success === true) {
                          toast("end", resp.data.message, "success", 2000);
                          loadData();
                        }
                      } catch (err) {
                        toast(
                          "end",
                          err.response.data.message,
                          "warning",
                          2000
                        );
                      } finally {
                        setLoading(false);
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
        <CourseAddModal
          show={showAddModal}
          handleClose={handleCloseAddModal}
          loadData={loadData}
        />
      )}
      {showEditModal && (
        <CourseEditModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          loadData={loadData}
          selectedCourse={selectedCourse}
        />
      )}
    </>
  );
};

export default CourseGrid;
