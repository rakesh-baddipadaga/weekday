import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobData: [],
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobData(state, action) {
      state.jobData = action.payload;
    },
  },
});

export const { setJobData } = jobsSlice.actions;
export default jobsSlice.reducer;
