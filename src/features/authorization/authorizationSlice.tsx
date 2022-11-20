import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface IAuthorizationState {
  isAuthorization: boolean;
  firstName?: string;
  secondName?: string;
}

const initialState: IAuthorizationState = {
  isAuthorization: false,
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ firstName: string; secondName: string }>
    ) => {
      state.firstName = action.payload.firstName;
      state.secondName = action.payload.secondName;
      state.isAuthorization = true;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout } = authorizationSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default authorizationSlice.reducer;
