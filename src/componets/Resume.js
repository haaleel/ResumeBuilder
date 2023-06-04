import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import Profile from "./Profile";
import Education from "./Education";

import { setProfileData, setEducationData, setSkillsData ,saveResumeData, setExperienceData} from "../componets/redux-store/dataReducer";
import Skills from "./Skill";
import Experience from "./Experience";

const Resume = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const resumeData = useSelector((state) => state.data);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (step) {
      case 1:
        dispatch(setProfileData({ ...resumeData.profile, [name]: value }));
        break;
      case 2:
        dispatch(setEducationData({ ...resumeData.education, [name]: value }));
        break;
      case 3:
        dispatch(setExperienceData({ ...resumeData.Experience, [name]: value }));
        break;
      case 4:
        dispatch(setSkillsData({ ...resumeData.skills, [name]: value }));
        break;
      default:
        break;
    }
  };

  const save = () => {
    dispatch(
      saveResumeData({
        profile: resumeData.profile,
        education: resumeData.education,
        Experience: resumeData.Experience,
        skills: resumeData.skills,
      })
    );
  };

  switch (step) {
    case 1:
      return (
        <div>
          <NavBar />
          <div className="App mt-3">
            <div className="container col-lg-10 mx-auto text-center">
              <Profile
                nextStep={nextStep}
                handleChange={handleChange}
                values={resumeData.profile}
                save={save}
              />
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div>
          <NavBar />
          <div className="App mt-3">
            <div className="container col-lg-10 mx-auto text-center">
              <Education
                nextStep={nextStep}
                prevStep={prevStep}
                handleChange={handleChange}
                values={resumeData.education}
                save={save}
              />
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div>
          <NavBar />
          <div className="App mt-3">
            <div className="container col-lg-8 mx-auto text-center">
              <Experience
                nextStep={nextStep}
                prevStep={prevStep}
                handleChange={handleChange}
                values={resumeData.skills}
                save={save}
              />
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div>
          <NavBar />
          <div className="App mt-3">
            <div className="container col-lg-10 mx-auto text-center">
              <Skills
                nextStep={nextStep}
                prevStep={prevStep}
                handleChange={handleChange}
                values={resumeData.experience}
                save={save}
              />
            </div>
          </div>
        </div>
      );
    default:
      return <div />;
  }
};

export default Resume;
