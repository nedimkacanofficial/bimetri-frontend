import { ErrorMessage, Field, Formik } from "formik";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "../../helpers/swal";
import { object, string } from "yup";
import { updateStudent } from "../../api/student-service";

const StudentEditModal = ({ show, handleClose, loadData, selectedStudent }) => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: selectedStudent.name,
    surname: selectedStudent.surname,
    schoolNumber: selectedStudent.schoolNumber,
  };

  const validationSchema = object({
    name: string()
      .trim()
      .min(1, "Minimum one character must be entered")
      .required("Required!"),
    surname: string()
      .trim()
      .min(1, "Minimum one character must be entered")
      .required("Required!"),
    schoolNumber: string()
      .trim()
      .min(1, "Minimum one character must be entered")
      .required("Required!"),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const resp = await updateStudent(selectedStudent.id, values);
      toast("end", resp.data.message, "success", 2000);
      loadData();
      handleClose();
    } catch (error) {
      toast("end", error.response.data.message, "error", 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Student Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1 text-danger"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Surname</Form.Label>
                <Field
                  type="text"
                  id="surname"
                  name="surname"
                  className="form-control"
                  placeholder="Surname"
                />
                <ErrorMessage
                  name="surname"
                  component="div"
                  className="text-red-500 text-sm mt-1 text-danger"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>School Number</Form.Label>
                <Field
                  type="text"
                  id="schoolNumber"
                  name="schoolNumber"
                  className="form-control"
                  placeholder="schoolNumber"
                />
                <ErrorMessage
                  name="schoolNumber"
                  component="div"
                  className="text-red-500 text-sm mt-1 text-danger"
                />
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" disabled={loading} type="submit">
                  Update
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default StudentEditModal;
