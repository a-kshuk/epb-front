declare type AppDispatch = typeof import('./index').store.dispatch;
declare type RootState = ReturnType<typeof import('./index').store.getState>;
