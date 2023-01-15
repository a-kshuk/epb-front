import { combineReducers } from '@reduxjs/toolkit';

import authorizationSlice from '../features/authorization/authorizationSlice';
import pipelineMainOptionsSlice from '../pages/PipelinesPage/redux/PipelineMainOptionsSlice';

const rootReducer = combineReducers({
  authorization: authorizationSlice,
  pipelineMainOptions: pipelineMainOptionsSlice.reducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
