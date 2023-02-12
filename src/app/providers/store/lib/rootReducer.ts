import { combineReducers } from '@reduxjs/toolkit';
import { workModeSlice } from 'entities/pipelineWorkMode';
import { straightPipeSlice } from 'entities/straightPipe';
import { bendPipeSlice } from 'entities/bendPipe';
import { pipelineElementsSlice } from 'entities/pipelineElement';
import { pipelineMaterialSlice } from 'entities/pipelineMaterial';
import { pipelineMainInfoSlice } from 'entities/pipelineMainInfo';
import { pipelineThicknessSlice } from 'entities/pipelineThickness';
import { pipelineMaterialPropsSlice } from 'entities/pipelineMaterialProps';

import authorizationSlice from 'features/authorization/authorizationSlice';

const rootReducer = combineReducers({
  authorization: authorizationSlice,
  pipelineMainInfo: pipelineMainInfoSlice.reducer,
  pipelineWorkMode: workModeSlice.reducer,
  pipelineElements: pipelineElementsSlice.reducer,
  pipelineMaterial: pipelineMaterialSlice.reducer,
  pipelineMaterialProps: pipelineMaterialPropsSlice.reducer,
  straightPipe: straightPipeSlice.reducer,
  bendPipe: bendPipeSlice.reducer,
  pipelineThickness: pipelineThicknessSlice.reducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
