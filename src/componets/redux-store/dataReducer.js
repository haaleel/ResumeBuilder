import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    profile: {},
    education: {},
    Experience:{},
    skills: {},
  },
  reducers: {
    setProfileData: (state, action) => {
      state.profile = action.payload;
    },
    setEducationData: (state, action) => {
      state.education = action.payload;
    },
    setExperienceData: (state, action) => {
      state.Experience = action.payload;
    },
    setSkillsData: (state, action) => {
      state.skills = action.payload;
    },
    saveResumeData: (state, action) => {
      state.profile = action.payload.profile;
      state.education = action.payload.education;
      state.Experience = action.payload.Experience;
      state.skills = action.payload.skills;
    },
  },
});

export const { setProfileData, setEducationData, setSkillsData, saveResumeData ,setExperienceData} =
  dataSlice.actions;
export default dataSlice.reducer;
