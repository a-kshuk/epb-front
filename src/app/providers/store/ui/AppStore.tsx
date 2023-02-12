import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persister, store } from '../lib';

const AppStore: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      {children}
    </PersistGate>
  </Provider>
);

export default AppStore;
