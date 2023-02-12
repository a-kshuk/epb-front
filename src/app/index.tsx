import React, { memo } from 'react';
import { AppRouter, AppStore } from './providers';
import './styles/index.scss';

function App() {
  return (
    <AppStore>
      <AppRouter />
    </AppStore>
  );
}

export default memo(App);
