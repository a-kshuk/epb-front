import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IWorkMode {
  id: number;
  title: string;
  temperature: number;
  pressure: number;
}

export interface IPipelineElementState {
  currentId: number;
  modes: IWorkMode[];
}

const initialState: IPipelineElementState = {
  currentId: 0,
  modes: [],
};

const workModesModel = createSlice({
  name: 'workModes',
  initialState,
  reducers: {
    addWorkMode: (state, action: PayloadAction<Omit<IWorkMode, 'id'>>) => {
      const { title, temperature, pressure } = action.payload;
      const id = state.currentId + 1;
      state.currentId = id;
      state.modes = [...state.modes, { id, title, temperature, pressure }];
    },

    removeWorkMode: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const modes = state.modes.filter((element) => element.id !== id) || [];
      state.modes = [...modes];
    },

    changeWorkMode: (state, action: PayloadAction<IWorkMode>) => {
      const newMode = action.payload;
      state.modes = state.modes.map((mode) =>
        mode.id === newMode.id ? newMode : mode
      );
    },
  },
});

export const { addWorkMode, removeWorkMode, changeWorkMode } =
  workModesModel.actions;

export default workModesModel;
