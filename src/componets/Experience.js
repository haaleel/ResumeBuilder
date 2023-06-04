import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setExperienceData } from './redux-store/dataReducer';

const Experience = ({ prevStep, nextStep }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const experienceData = useSelector((state) => state.data.Experience);
  const [formValues, setFormValues] = useState({
    experiences: [{ company: '', position: '', fromYear: '', toYear: '' }],
  });

  useEffect(() => {
    if (experienceData && experienceData.experiences && experienceData.experiences.length > 0) {
      setFormValues({ experiences: experienceData.experiences });
    } else {
      setFormValues({
        experiences: [{ company: '', position: '', fromYear: '', toYear: '' }],
      });
    }
  }, [experienceData]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const fieldName = name.split('-')[0];
    setFormValues((prevValues) => {
      const updatedExperiences = prevValues.experiences.map((experience, i) => {
        if (i === index) {
          return { ...experience, [fieldName]: value };
        }
        return experience;
      });
      return {
        ...prevValues,
        experiences: updatedExperiences,
      };
    });
  };

  const addExperience = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      experiences: [...prevValues.experiences, { company: '', position: '', fromYear: '', toYear: '' }],
    }));
  };

  const removeExperience = (index) => {
    setFormValues((prevValues) => {
      const updatedExperiences = [...prevValues.experiences];
      updatedExperiences.splice(index, 1);
      return {
        ...prevValues,
        experiences: updatedExperiences,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      dispatch(setExperienceData(formValues));
      setOpen(true);
    } else {
      setErrors(validationErrors);
    }
  };

  const goBack = (e) => {
    e.preventDefault();
    prevStep();
  };

  const continueStep = (e) => {
    e.preventDefault();
    nextStep();
  };

  const handleClose = () => {
    setOpen(false)
  }

  const validateForm = () => {
    const errors = {};

    formValues.experiences.forEach((experience, index) => {
      if (experience.company.trim() === '') {
        errors[`company-${index}`] = 'Company is required';
      }
      if (experience.position.trim() === '') {
        errors[`position-${index}`] = 'Position is required';
      }
      if (experience.fromYear.trim() === '') {
        errors[`fromYear-${index}`] = 'From Year is required';
      }
      if (experience.toYear.trim() === '') {
        errors[`toYear-${index}`] = 'To Year is required';
      }
    });

    return errors;
  };

  return (
    <div className="p-3">
      <Card className="padding">
      <Card.Header className="text-center" as="h5">
          Experience Details</Card.Header>
        <Card.Body>
          <div className="margin">
            {formValues.experiences &&
              formValues.experiences.map((experience, index) => (
                <div key={index}>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId={`company-${index}`}>
                        <Form.Label>Company</Form.Label>
                        <Form.Control
                          type="text"
                          name={`company-${index}`}
                          required
                          value={experience.company}
                          onChange={(e) => handleChange(e, index)}
                        />
                        {errors[`company-${index}`] && (
                          <Form.Text className="text-danger">{errors[`company-${index}`]}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId={`position-${index}`}>
                        <Form.Label>Position</Form.Label>
                        <Form.Control
                          type="text"
                          name={`position-${index}`}
                          required
                          value={experience.position}
                          onChange={(e) => handleChange(e, index)}
                        />
                        {errors[`position-${index}`] && (
                          <Form.Text className="text-danger">{errors[`position-${index}`]}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId={`fromYear-${index}`}>
                        <Form.Label>From Year</Form.Label>
                        <Form.Control
                          type="date"
                          name={`fromYear-${index}`}
                          required
                          value={experience.fromYear}
                          onChange={(e) => handleChange(e, index)}
                        />
                        {errors[`fromYear-${index}`] && (
                          <Form.Text className="text-danger">{errors[`fromYear-${index}`]}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId={`toYear-${index}`}>
                        <Form.Label>To Year</Form.Label>
                        <Form.Control
                          type="date"
                          name={`toYear-${index}`}
                          required
                          value={experience.toYear}
                          onChange={(e) => handleChange(e, index)}
                        />
                        {errors[`toYear-${index}`] && (
                          <Form.Text className="text-danger">{errors[`toYear-${index}`]}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      {index > 0 && (
                        <Button variant="danger" onClick={() => removeExperience(index)}>
                          Remove Experience
                        </Button>
                      )}
                    </Col>
                  </Row>
                  <hr />
                </div>
              ))}
            <Button variant="secondary" onClick={addExperience} className="mb-3">
              Add Experience
            </Button>
          </div>
        </Card.Body>
        <Container className="mt-3 mb-3"> {/* Add "mb-3" class for bottom margin */}
          <Row>
            <Col xs={6}>
              <Button variant="secondary" onClick={goBack}>
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
      </Card>
      <p className="text-center text-muted">Page 3</p>
      <p className="text-center mt-3 text-danger">
        Please fill and save all fields before proceeding to the next page
      </p>
      <Button variant="primary" onClick={handleSubmit} className="mt-3">
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

export default Experience;
