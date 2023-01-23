import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPileType } from './types';

export interface IPipelineElement {
  id: number;
  position: number;
  type: IPileType;
}

export interface IPipelineElementState {
  currentId: number;
  elements: IPipelineElement[];
}

const initialState: IPipelineElementState = {
  currentId: 0,
  elements: [],
};

const pipelineElementsSlice = createSlice({
  name: 'pipelineElements',
  initialState,
  reducers: {
    addElement: (
      state,
      action: PayloadAction<{ position: number; type: IPileType }>
    ) => {
      const { position, type } = action.payload;
      const elements = state.elements.map((element) => ({
        ...element,
        position:
          element.position < position ? element.position : element.position + 1,
      }));
      const id = state.currentId + 1;
      elements.push({ id, position, type });
      state.currentId = id;
      state.elements = elements;
    },

    removeElement: (state, action: PayloadAction<number>) => {
      const position = action.payload;
      const elements = state.elements.filter(
        (element) => element.position !== position
      );
      state.elements = elements.map((element) => ({
        ...element,
        position:
          element.position > position ? element.position - 1 : element.position,
      }));
    },

    moveUpElement: (state, action: PayloadAction<number>) => {
      const position = action.payload;
      if (position <= 1) {
        return;
      }
      const updatePosition = (oldPositions: number): number => {
        if (oldPositions === position) {
          return position - 1;
        }
        if (oldPositions === position - 1) {
          return position;
        }
        return oldPositions;
      };
      const elements = state.elements.map((element) => ({
        ...element,
        position: updatePosition(element.position),
      }));
      state.elements = elements;
    },

    moveDownElement: (state, action: PayloadAction<number>) => {
      const position = action.payload;
      if (position >= state.elements.length) {
        return;
      }
      const updatePosition = (oldPositions: number): number => {
        if (oldPositions === position) {
          return position + 1;
        }
        if (oldPositions === position + 1) {
          return position;
        }
        return oldPositions;
      };
      const elements = state.elements.map((element) => ({
        ...element,
        position: updatePosition(element.position),
      }));
      state.elements = elements;
    },

    changeTypeElement: (
      state,
      action: PayloadAction<{ position: number; type: IPileType }>
    ) => {
      const { position, type } = action.payload;
      state.elements = state.elements.map((el) => ({
        ...el,
        type: el.position === position ? type : el.type,
      }));
    },
  },
});

export const {
  addElement,
  removeElement,
  moveDownElement,
  moveUpElement,
  changeTypeElement,
} = pipelineElementsSlice.actions;

export default pipelineElementsSlice;
