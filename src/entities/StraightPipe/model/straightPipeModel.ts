import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export interface IStraightPipe {
  idElement: number;
  idMaterial?: number;
  ovality: number;
}

export interface IStraightPipeState {
  currentId: number;
  pipes: IStraightPipe[];
}

const initialState: IStraightPipeState = {
  currentId: 0,
  pipes: [],
};

const straightPipelineModel = createSlice({
  name: 'straightPipeline',
  initialState,
  reducers: {
    addStraightPipeline: (state, action: PayloadAction<IStraightPipe>) => {
      const pipeline = action.payload;
      state.pipes = [...state.pipes, pipeline];
    },

    removeStraightPipeline: (state, action: PayloadAction<number>) => {
      const idElement = action.payload;
      const pipelines = state.pipes.filter(
        (pipeline) => pipeline.idElement !== idElement
      );
      state.pipes = pipelines;
    },

    editStraightPipeline: (state, action: PayloadAction<IStraightPipe>) => {
      const straightPipeline = action.payload;
      state.pipes = state.pipes.map((pipeline) => {
        return pipeline.idElement === straightPipeline.idElement
          ? straightPipeline
          : pipeline;
      });
    },
  },
});

export const useListStraightPipeline = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.pipelineElements.elements,
      (state: RootState) => state.straightPipelines.pipes,
      (
        elements: RootState['pipelineElements']['elements'],
        pipes: RootState['straightPipelines']['pipes']
      ) =>
        elements
          .filter((element) => element.type === 'straight')
          .sort((a, b) => a.position - b.position)
          .map(({ id }) => pipes.find(({ idElement }) => idElement === id))
    )
  );

export default straightPipelineModel;
