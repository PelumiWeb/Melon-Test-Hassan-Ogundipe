'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from './storage';
import { productSlice } from './features/product';

const persistConfig = {
  key: 'root', // Key for storage
  storage, // Define where to store the data
  whitelist: ["product"]
};

const rootReducer = {
  product: productSlice.reducer,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));


export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
     middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            'persist/PERSIST',
            'persist/REHYDRATE',
            'persist/FLUSH',
            'persist/PAUSE',
            'persist/PURGE',
            'persist/REGISTER',
          ],
        },
      }),
  })
}


export const store = makeStore();
export const persistor = persistStore(store);


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
