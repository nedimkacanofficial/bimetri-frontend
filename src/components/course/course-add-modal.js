import { ErrorMessage, Field, Formik } from "formik";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "../../helpers/swal";
import { object, string } from "yup";
import { addCourse } from "../../api/course-service";

const CourseAddModal = ({ show, handleClose, loadData }) => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: "",
  };

  const validationSchema = object({
    name: string()
      .trim()
      .min(1, "Minimum one character must be entered")
      .required("Required!"),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const resp = await addCourse(values);
      if (resp.status === 201 && resp.data.success === true) {
        toast("end", resp.data.message, "success", 2000);
        loadData();
        handleClose();
      }
    } catch (error) {
      toast("end", error.response.data.message, "error", 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Course Add</Modal.Title>
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
    </>
  );
};

export default CourseAddModal;
