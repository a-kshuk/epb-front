import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export interface IBendPipe {
  idElement: number;
  idMaterial?: number;
  diameter?: number;
  thickness?: number;
}

export interface IBendPipeState {
  // currentId: number;
  pipes: IBendPipe[];
}

const initialState: IBendPipeState = {
  // currentId: 0,
  pipes: [],
};

const straightPipelineModel = createSlice({
  name: 'bendPipe',
  initialState,
  reducers: {
    setBendPipes: (state, action: PayloadAction<IBendPipe[]>) => {
      const pipes = action.payload;
      state.pipes = [...pipes];
    },
  },
});

export interface IPipePosition extends IBendPipe {
  position: number;
}

export const useBendPipeList = (): IPipePosition[] =>
  useSelector(
    createSelector(
      (state: RootState) => state.pipelineElements.elements,
      (state: RootState) => state.bendPipe.pipes,
      (
        elements: RootState['pipelineElements']['elements'],
        pipes: RootState['bendPipe']['pipes']
      ) =>
        elements
          .filter((element) => element.type === 'bend')
          .sort((a, b) => a.position - b.position)
          .map(({ id, position }) => {
            const pipe = pipes.find(({ idElement }) => idElement === id);
            return { ...pipe, idElement: id, position };
          })
    )
  );

export const { setBendPipes } = straightPipelineModel.actions;

export default straightPipelineModel;
