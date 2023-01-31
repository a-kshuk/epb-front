import { combineReducers } from '@reduxjs/toolkit';
import { workModeSlice } from 'entities/pipelineWorkMode';
import { straightPipeSlice } from 'entities/straightPipe';
import { pipelineElementsSlice } from 'entities/pipelineElement';
import { pipelineMaterialSlice } from 'entities/pipelineMaterial';
import { pipelineMainInfoSlice } from 'entities/pipelineMainInfo';
import { pipelineMaterialPropsSlice } from 'entities/pipelineMaterialProps';

import authorizationSlice from '../../features/authorization/authorizationSlice';

const rootReducer = combineReducers({
  authorization: authorizationSlice,
  pipelineMainInfo: pipelineMainInfoSlice.reducer,
  pipelineWorkMode: workModeSlice.reducer,
  pipelineElements: pipelineElementsSlice.reducer,
  pipelineMaterial: pipelineMaterialSlice.reducer,
  pipelineMaterialProps: pipelineMaterialPropsSlice.reducer,
  straightPipe: straightPipeSlice.reducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
