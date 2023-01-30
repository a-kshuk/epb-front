import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPipelineMainInfoState {
  title: string;
  regNumber: string;
  location: string;
}

const initialState: IPipelineMainInfoState = {
  title: '',
  regNumber: '',
  location: '',
};

export const pipelineMainInfoModel = createSlice({
  name: 'pipelineMainOptions',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setRegNumber: (state, action: PayloadAction<string>) => {
      state.regNumber = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
  },
});

export const { setTitle, setRegNumber, setLocation } =
  pipelineMainInfoModel.actions;

export default pipelineMainInfoModel;
