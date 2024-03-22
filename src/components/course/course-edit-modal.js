import { ErrorMessage, Field, Formik, useFormik } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "../../helpers/swal";
import { object, string } from "yup";

const CourseEditModal = ({ show, handleClose }) => {
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
  });

  const onSubmit = async (values) => {
    try {
      // const resp = await addCity(values)
      // toast("end",resp.data.name + " adding successful", "success", 2000);
      handleClose(); // Modalı kapat
    } catch (error) {
      toast(error.response.data.message, "warning", 2000);
    } finally {
      // setLoading(false);
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Course Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
          </Form>
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={formik.handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CourseEditModal;
