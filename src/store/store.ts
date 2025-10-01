import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducer from '../store/loginSlice';
import themeReducer from '../store/themeSlice';

const loginPersistConfig = {
    key: 'login',
    storage,
    whitelist: ['isLogin', 'user'],
};

const themePersistConfig = {
    key: 'theme',
    storage,
    whitelist: ['theme'],
};

const persistedLoginReducer = persistReducer(loginPersistConfig, loginReducer);
const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);


export const store = configureStore({
    reducer: {
        login: persistedLoginReducer,
        theme: persistedThemeReducer,
    },

    middleware: (getDefaultMiddleware) =>
       getDefaultMiddleware({
           serializableCheck: {
               ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
           },
       }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;