import { configureStore } from "@reduxjs/toolkit";
import { navReducer } from './nav/navReducer';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'persist-key',
    storage
};
const navPersistReducer = persistReducer(persistConfig, navReducer);
const store = configureStore({ reducer: navPersistReducer });
const persistor = persistStore(store);

export { store, persistor }