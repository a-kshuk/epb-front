import { combineReducers } from '@reduxjs/toolkit';
import { workModeSlice } from 'entities/pipelineWorkMode';
import { straightPipeSlice } from 'entities/straightPipe';
import { pipelineElementsSlice } from 'entities/pipelineElement';

import authorizationSlice from '../../features/authorization/authorizationSlice';
import pipelineMainOptionsSlice from '../../pages/PipelinesPage/redux/PipelineMainOptionsSlice';

const rootReducer = combineReducers({
  authorization: authorizationSlice,
  pipelineWorkMode: workModeSlice.reducer,
  pipelineMainOptions: pipelineMainOptionsSlice.reducer,
  pipelineElements: pipelineElementsSlice.reducer,
  straightPipe: straightPipeSlice.reducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
