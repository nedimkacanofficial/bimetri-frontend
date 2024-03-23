import { ErrorMessage, Field, Formik } from "formik";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "../../helpers/swal";
import { object, string } from "yup";
import { addStudent } from "../../api/student-service";

const StudentAddModal = ({ show, handleClose, loadData }) => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: "",
    surname: "",
    schoolNumber: "",
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
      const resp = await addStudent(values);
      if (resp.status === 201 && resp.data.success === true) {
        toast("end", resp.data.message, "success", 2000);
        loadData();
        handleClose();
      }
    } catch (error) {
      toast(error.response.data.message, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Student Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
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
                    placeholder="School Number"
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
                  <Button variant="primary" type="submit" disabled={loading}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StudentAddModal;
