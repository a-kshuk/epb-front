import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export interface IStraightPipe {
  idElement: number;
  idMaterial?: number;
  diameter?: number;
}

export interface IStraightPipeState {
  // currentId: number;
  pipes: IStraightPipe[];
}

const initialState: IStraightPipeState = {
  // currentId: 0,
  pipes: [],
};

const straightPipelineModel = createSlice({
  name: 'straightPipe',
  initialState,
  reducers: {
    setPipes: (state, action: PayloadAction<IStraightPipe[]>) => {
      const pipes = action.payload;
      state.pipes = [...pipes];
    },
  },
});

export interface IPipePosition extends IStraightPipe {
  position: number;
}

export const useStraightPipeList = (): IPipePosition[] =>
  useSelector(
    createSelector(
      (state: RootState) => state.pipelineElements.elements,
      (state: RootState) => state.straightPipe.pipes,
      (
        elements: RootState['pipelineElements']['elements'],
        pipes: RootState['straightPipe']['pipes']
      ) =>
        elements
          .filter((element) => element.type === 'straight')
          .sort((a, b) => a.position - b.position)
          .map(({ id, position }) => {
            const pipe = pipes.find(({ idElement }) => idElement === id);
            return { ...pipe, idElement: id, position };
          })
    )
  );

export const { setPipes } = straightPipelineModel.actions;

export default straightPipelineModel;
