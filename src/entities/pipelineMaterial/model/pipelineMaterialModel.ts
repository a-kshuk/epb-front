import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IMaterial {
  id: number;
  title: string;
}

interface IPipelineMaterialState {
  currentId: number;
  materials: IMaterial[];
}

const initialState: IPipelineMaterialState = {
  currentId: 0,
  materials: [],
};

export const pipelineMaterialModel = createSlice({
  name: 'pipelineMaterial',
  initialState,
  reducers: {
    addMaterial: (state, action: PayloadAction<string>) => {
      const id = state.currentId + 1;
      const title = action.payload;
      state.materials = [...state.materials, { id, title }];
      state.currentId = id;
    },
    removeMaterial: (state, action: PayloadAction<number>) => {
      state.materials = state.materials.filter(
        ({ id }) => id !== action.payload
      );
    },
    changeMaterial: (state, action: PayloadAction<IMaterial>) => {
      const material = action.payload;
      state.materials = state.materials.map((el) =>
        el.id === material.id ? material : el
      );
    },
  },
});

export const { addMaterial, removeMaterial, changeMaterial } =
  pipelineMaterialModel.actions;

export default pipelineMaterialModel;
