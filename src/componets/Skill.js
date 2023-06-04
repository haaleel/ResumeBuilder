import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSkillsData } from '../componets/redux-store/dataReducer';
import Autosuggest from 'react-autosuggest';
import { Button, Col, Container, Row, Alert, Card } from 'react-bootstrap';
import HandleDownload from './HandleDownloadPdf ';

const Skills = ({ prevStep }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const [skills, setSkills] = useState(['']);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    const handleAddSkill = () => {
        if (skills.length < 10) {
            setSkills([...skills, '']);
        }
    };

    const handleRemoveSkill = (index) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);

        const updatedSelectedSkills = [...selectedSkills];
        updatedSelectedSkills.splice(index, 1);
        setSelectedSkills(updatedSelectedSkills);
    };


    const handleSave = () => {
        const newSkills = skills
            .filter((skill) => skill.trim() !== '')
            .map((skill) => ({ name: skill }));

        const updatedSelectedSkills = selectedSkills.concat(newSkills);
        const uniqueSkills = Array.from(new Set(updatedSelectedSkills.map((skill) => skill.name)));
        const finalSelectedSkills = uniqueSkills.map((name) => ({ name }));

        dispatch(setSkillsData(finalSelectedSkills.map((skill) => skill.name)));
        setOpen(true);
    };

    const goBack = (e) => {
        e.preventDefault();
        prevStep();
    };

    const skillSuggestions = [
        { name: 'PHP' },
        { name: 'JavaScript' },
        { name: 'React' },
        { name: 'Flutter' },
        { name: 'Node.js' },
        { name: 'MonogoDB' },
        { name: 'Firebase' },
        { name: 'Git' },
        { name: 'Swift' },
        { name: 'SQL' },
        { name: 'Experss js' },
        { name: 'TypeScript' },
    ];

    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0
            ? []
            : skillSuggestions.filter(
                (suggestion) =>
                    suggestion.name.toLowerCase().slice(0, inputLength) === inputValue
            );
    };

    const renderSuggestion = (suggestion) => <span>{suggestion.name}</span>;

    const onSuggestionSelected = (event, { suggestion }) => {
        setSelectedSkills([...selectedSkills, suggestion]);
    };

    const onChange = (index) => (_, { newValue }) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = newValue;
        setSkills(updatedSkills);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = (index) => ({
        placeholder: 'Enter skill',
        value: skills[index],
        onChange: onChange(index),
    });

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container>
            <Card>
                <h1 className="mb-4 text-center">Skills</h1>
                {skills.map((skill, index) => (
                    <Row className="form-group justify-content-center align-items-center" key={index}>
                        <Col xs={10} md={6}>
                            <label htmlFor={`skill${index + 1}`} className="mb-0">Skill {index + 1}</label>
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={onSuggestionsClearRequested}
                                getSuggestionValue={(suggestion) => suggestion.name}
                                renderSuggestion={renderSuggestion}
                                inputProps={inputProps(index)}
                                onSuggestionSelected={onSuggestionSelected}
                            />
                        </Col>
                        <Col xs={2} md={1}>
                            <Button
                                variant="danger"
                                size="sm"
                                className="mt-2"
                                onClick={() => handleRemoveSkill(index)}
                            >
                                Remove Skill
                            </Button>
                        </Col>
                    </Row>
                ))}
                {skills.length < 10 && (
                    <Row className="justify-content-center">
                        <Col xs={12} md={6}>
                            <Button variant="secondary" onClick={handleAddSkill} block>
                                Add Skill
                            </Button>
                        </Col>
                    </Row>
                )}
                <Row className="mt-4">
                    <Col xs={12} md={6}>
                        <Button variant="secondary" onClick={goBack} block>
                            Back
                        </Button>
                    </Col>
                    <Col xs={12} md={6} className="mt-3 mt-md-0">
                        <Button variant="primary" onClick={handleSave} block>
                            Save
                        </Button>
                    </Col>
                </Row>
                <p className="text-center mt-3 text-danger">
                    Click Save And Download Resume
                </p>
            </Card>

            <Row className="mt-3">
                <Col>
                    {open && (
                        <Alert variant="success" onClose={handleClose} dismissible>
                            <HandleDownload />
                        </Alert>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Skills;
