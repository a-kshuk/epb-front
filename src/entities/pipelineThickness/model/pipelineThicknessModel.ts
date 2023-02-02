import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { removeElement } from 'entities/pipelineElement';

export interface IThickness {
  id: number;
  idElement: number;
  thickness: number;
  position: number;
}

export interface IPipelineThicknessState {
  currentId: number;
  thicknessList: IThickness[];
}

const initialState: IPipelineThicknessState = {
  currentId: 0,
  thicknessList: [],
};

const pipelineElementsModel = createSlice({
  name: 'pipelineThickness',
  initialState,
  reducers: {
    addThickness: (
      state,
      action: PayloadAction<{
        position: number;
        thickness: number;
        idElement: number;
      }>
    ) => {
      const { position, thickness, idElement } = action.payload;
      const filterList =
        state.thicknessList?.filter((el) => el.idElement === idElement) || [];
      const thicknessList = filterList.map((element) => ({
        ...element,
        position:
          element.position < position ? element.position : element.position + 1,
      }));
      const id = state.currentId + 1;
      thicknessList.push({ id, thickness, position, idElement });
      state.currentId = id;
      state.thicknessList = [
        ...state.thicknessList.filter((el) => el.idElement !== idElement),
        ...thicknessList,
      ];
    },

    removeThickness: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const thickness = state.thicknessList.find((el) => el.id === id);
      if (!thickness) {
        return;
      }
      const { idElement, position } = thickness;
      const filterList =
        state.thicknessList.filter(
          (el) => el.idElement === idElement && el.position !== position
        ) || [];
      const thicknessList = filterList.map((el) => ({
        ...el,
        position: el.position > position ? el.position - 1 : el.position,
      }));
      state.thicknessList = [
        ...state.thicknessList.filter((el) => el.idElement !== idElement),
        ...thicknessList,
      ];
    },

    moveUpThickness: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const currentThickness = state.thicknessList.find((el) => el.id === id);
      if (!currentThickness || currentThickness.position <= 1) {
        return;
      }
      const { position, idElement } = currentThickness;
      const updatePosition = (oldPositions: number): number => {
        if (oldPositions === position) return position - 1;
        if (oldPositions === position - 1) return position;
        return oldPositions;
      };
      const thicknessList = state.thicknessList.map((el) =>
        el.idElement !== idElement
          ? el
          : { ...el, position: updatePosition(el.position) }
      );
      state.thicknessList = thicknessList;
    },

    moveDownThickness: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const currentThickness = state.thicknessList.find((el) => el.id === id);
      if (
        !currentThickness ||
        currentThickness.position >= state.thicknessList.length
      ) {
        return;
      }
      const { position, idElement } = currentThickness;
      const updatePosition = (oldPositions: number): number => {
        if (oldPositions === position) return position + 1;
        if (oldPositions === position + 1) return position;
        return oldPositions;
      };
      const thicknessList = state.thicknessList.map((el) =>
        el.idElement !== idElement
          ? el
          : { ...el, position: updatePosition(el.position) }
      );
      state.thicknessList = thicknessList;
    },
    changeThickness: (state, action: PayloadAction<IThickness>) => {
      const thickness = action.payload;
      state.thicknessList = state.thicknessList.map((el) =>
        el.idElement === thickness.idElement ? thickness : el
      );
    },
  },
  extraReducers: {
    [removeElement.type]: (state, action: PayloadAction<number>) => {
      state.thicknessList = state.thicknessList.filter(
        (el) => el.idElement !== action.payload
      );
    },
  },
});

export const {
  addThickness,
  removeThickness,
  moveUpThickness,
  moveDownThickness,
  changeThickness,
} = pipelineElementsModel.actions;

export default pipelineElementsModel;
