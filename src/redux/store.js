import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { navReducer } from './nav/navReducer';
import { currencyReducer } from "./currency/currencyReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'persist-key',
    storage
};
const navPersistReducer = persistReducer(persistConfig, navReducer);
const currencyPersistReducer = persistReducer(persistConfig, currencyReducer)
const rootReducer = combineReducers({navPersistReducer, currencyPersistReducer})
const store = configureStore({ reducer: rootReducer});
const persistor = persistStore(store);

export { store, persistor }