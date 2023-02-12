import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer, { RootReducer } from './rootReducer';

const persistConfig: PersistConfig<RootReducer> = {
  key: 'root',
  storage,
  whitelist: [
    'pipelineWorkMode',
    'pipelineMainInfo',
    'pipelineElements',
    'pipelineMaterial',
    'pipelineMaterialProps',
    'straightPipe',
    'bendPipe',
    'pipelineThickness',
  ],
};

const persistedReducer = persistReducer<RootReducer>(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persister = persistStore(store);
