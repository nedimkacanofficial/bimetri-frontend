import { ErrorMessage, Field, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "../../helpers/swal";
import { object, string } from "yup";
import { allCourses } from "../../api/course-service";
import { allStudents, coursesEnroll } from "../../api/student-service";

const EnrollModal = ({ show, handleClose, loadData }) => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const resp = await allCourses();
        if (resp.status === 200) {
          setCourses(resp.data);
        }
      } catch (error) {
        toast("end", error.response.data.message, "error", 2000);
      }
    };

    const fetchStudents = async () => {
      try {
        const resp = await allStudents();
        if (resp.status === 200) {
          setStudents(resp.data);
        }
      } catch (error) {
        toast("end", error.response.data.message, "error", 2000);
      }
    };

    fetchCourses();
    fetchStudents();
  }, []);

  const initialValues = {
    course: "",
    student: "",
  };

  const validationSchema = object({
    course: string().required("Required!"),
    student: string().required("Required!"),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const { course, student } = values;
      const resp = await coursesEnroll(student, course);
      if (resp.status === 201 && resp.data.success === true) {
        toast("end", resp.data.message, "success", 2000);
        loadData();
        handleClose();
      }
    } catch (error) {
      toast("end", error.response.data.message, "warning", 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Course Add Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Course</Form.Label>
                <Field as="select" name="course" className="form-control">
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="course"
                  component="div"
                  className="text-red-500 text-sm mt-1 text-danger"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Student</Form.Label>
                <Field as="select" name="student" className="form-control">
                  <option value="">Select a student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} {student.surname}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="student"
                  component="div"
                  className="text-red-500 text-sm mt-1 text-danger"
                />
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button disabled={loading} variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default EnrollModal;
