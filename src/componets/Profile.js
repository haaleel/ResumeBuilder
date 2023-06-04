import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { setProfileData, } from "./redux-store/dataReducer";


const Profile = ({ nextStep, save }) => {
  const [open, setOpen] = useState(false);

  const profileData = useSelector((state) => state.data.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    setFormValues(profileData);
  }, [profileData]);

  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    website: "",
    github: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const continueStep = (e) => {
    e.preventDefault();
    nextStep();
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(setProfileData(formValues));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="p-3">
      <Card>
        <Card.Header className="text-center" as="h5">
          Personal Details
        </Card.Header>
        <Card.Body>
          <Container>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  required
                  value={formValues.firstname}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  required
                  value={formValues.lastname}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  value={formValues.email}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  value={formValues.phone}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Your Website"
                  name="website"
                  value={formValues.website}
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="GitHub"
                  name="github"
                  value={formValues.github}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Container className="mt-3">
              <Row>
                <Col xs={5}>
                  <Button variant="secondary" onClick={nextStep} disabled>
                    Back
                  </Button>
                </Col>
                <Col xs={5}>
                  <Button variant="secondary" onClick={continueStep}>
                    Next
                  </Button>
                </Col>
              </Row>
            </Container>
          </Container>
        </Card.Body>
      </Card>
      <p className="text-center mt-3 text-muted">Page 1</p>
      <p className="text-center mt-3 text-danger">
        Please fill and save all fields before proceeding to the next page
      </p>
      <Button variant="primary" onClick={handleSave}>
        Save
      </Button>
      {open && (
        <Alert variant="success" className="mt-3" onClose={handleClose} dismissible>
          Your data has been saved successfully!
        </Alert>
      )}
    </div>
  );
};

export default Profile;