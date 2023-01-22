import { combineReducers } from '@reduxjs/toolkit';

import authorizationSlice from '../features/authorization/authorizationSlice';
import pipelineMainOptionsSlice from '../pages/PipelinesPage/redux/PipelineMainOptionsSlice';
import pipelineElementsSlice from '../pages/PipelinesPage/redux/pipelineElementsSlice';

const rootReducer = combineReducers({
  authorization: authorizationSlice,
  pipelineMainOptions: pipelineMainOptionsSlice.reducer,
  pipelineElements: pipelineElementsSlice.reducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
