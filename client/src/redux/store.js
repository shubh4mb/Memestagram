import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/UserSlice';
import adminReducer from './admin/AdminSlice'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Corrected import path to 'lib' instead of 'Lib'
import { persistStore } from 'redux-persist'; // Corrected import for persistStore

const rootReducer = combineReducers({ user: userReducer , admin: adminReducer });

const persistConfig = {
    key: 'root',
    version: 1, 
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, // Disables serializable check for non-serializable data
    }),
});

export const persistor = persistStore(store);
