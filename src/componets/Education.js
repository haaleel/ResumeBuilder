import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setEducationData } from './redux-store/dataReducer';

const Education = ({ prevStep, nextStep }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const educationData = useSelector((state) => state.data.education);

  const [formValues, setFormValues] = useState({
    colleges: [{ college: '', fromYear: '', toYear: '', qualification: '' }],
  });

  useEffect(() => {
    if (educationData && educationData.colleges && educationData.colleges.length > 0) {
      setFormValues(educationData);
    } else {
      setFormValues({
        colleges: [{ college: '', fromYear: '', toYear: '', qualification: '' }],
      });
    }
  }, [educationData]);


  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const fieldName = name.split('-')[0];
    setFormValues((prevValues) => {
      const updatedColleges = prevValues.colleges.map((college, i) => {
        if (i === index) {
          return { ...college, [fieldName]: value };
        }
        return college;
      });
      return {
        ...prevValues,
        colleges: updatedColleges,
      };
    });
  };

  const addCollege = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      colleges: [...prevValues.colleges, { college: '', fromYear: '', toYear: '', qualification: '' }],
    }));
  };

  const removeCollege = (index) => {
    setFormValues((prevValues) => {
      const updatedColleges = [...prevValues.colleges];
      updatedColleges.splice(index, 1);
      return {
        ...prevValues,
        colleges: updatedColleges,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      dispatch(setEducationData(formValues));
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
    setOpen(false);
  };

  const validateForm = () => {
    const errors = {};

    formValues.colleges.forEach((college, index) => {
      if (college.college.trim() === '') {
        errors[`college-${index}`] = 'College/University is required';
      }
      if (college.fromYear.trim() === '') {
        errors[`fromYear-${index}`] = 'From Year is required';
      }
      if (college.toYear.trim() === '') {
        errors[`toYear-${index}`] = 'To Year is required';
      }
      if (college.qualification.trim() === '') {
        errors[`qualification-${index}`] = 'Qualification is required';
      }
    });

    return errors;
  };


  return (
    <div className="p-3">
      <Card className="padding">
        <Card.Title className="text-center">Education Details</Card.Title>
        <Card.Body>
          <div className="margin">
            {formValues.colleges && formValues.colleges.map((college, index) => (

              <div key={index}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId={`college-${index}`}>
                      <Form.Label>College/University</Form.Label>
                      <Form.Control
                        type="text"
                        name={`college-${index}`}
                        required
                        value={college.college}
                        onChange={(e) => handleChange(e, index)}
                      />
                      {errors[`college-${index}`] && (
                        <Form.Text className="text-danger">{errors[`college-${index}`]}</Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group controlId={`fromYear-${index}`}>
                      <Form.Label>From Year</Form.Label>
                      <Form.Control
                        type="date"
                        name={`fromYear-${index}`}
                        required
                        value={college.fromYear}
                        onChange={(e) => handleChange(e, index)}
                      />
                      {errors[`fromYear-${index}`] && (
                        <Form.Text className="text-danger">{errors[`fromYear-${index}`]}</Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group controlId={`toYear-${index}`}>
                      <Form.Label>To Year</Form.Label>
                      <Form.Control
                        type="date"
                        name={`toYear-${index}`}
                        required
                        value={college.toYear}
                        onChange={(e) => handleChange(e, index)}
                      />
                      {errors[`toYear-${index}`] && (
                        <Form.Text className="text-danger">{errors[`toYear-${index}`]}</Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group controlId={`qualification-${index}`}>
                      <Form.Label>Qualification</Form.Label>
                      <Form.Control
                        type="text"
                        name={`qualification-${index}`}
                        required
                        value={college.qualification}
                        onChange={(e) => handleChange(e, index)}
                      />
                      {errors[`qualification-${index}`] && (
                        <Form.Text className="text-danger">{errors[`qualification-${index}`]}</Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    {index > 0 && (
                      <Button variant="danger" onClick={() => removeCollege(index)}>
                        Remove College
                      </Button>
                    )}
                  </Col>
                </Row>
                <hr />
              </div>
            ))}
            <Button variant="secondary" onClick={addCollege} className="mb-3">
              Add College
            </Button>
          </div>
        </Card.Body>
        <Container className="margin">
          <Row className="justify-content-center">
            <Col xs={6} sm={4} md={2}>
              <Button variant="secondary" onClick={goBack}>
                Back
              </Button>
            </Col>
            <Col xs={6} sm={4} md={2}>
              <Button variant="secondary" onClick={continueStep}>
                Next
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>
      <p className="text-center text-muted">Page 2</p>
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

export default Education;
