import { combineReducers } from '@reduxjs/toolkit';
import { straightPipeSlice } from 'entities/straightPipe';
import { pipelineElementsSlice } from 'entities/PipelineElement';

import authorizationSlice from '../../features/authorization/authorizationSlice';
import pipelineMainOptionsSlice from '../../pages/PipelinesPage/redux/PipelineMainOptionsSlice';

const rootReducer = combineReducers({
  authorization: authorizationSlice,
  pipelineMainOptions: pipelineMainOptionsSlice.reducer,
  pipelineElements: pipelineElementsSlice.reducer,
  straightPipelines: straightPipeSlice.reducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
