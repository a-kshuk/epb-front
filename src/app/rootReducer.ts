import { combineReducers } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import authorizationSlice from '../features/authorization/authorizationSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  authorization: authorizationSlice,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
