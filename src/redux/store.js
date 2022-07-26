import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { navReducer } from './nav/navReducer';
import { currencyReducer } from "./currency/currencyReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";

const navPersistConfig = {
    key: 'nav-key',
    storage,
    blacklist: ['currency-key']
};
const currencyPersistConfig = {
  key: 'currency-key',
  storage,
  blacklist: ['nav-key']
};
const navPersistReducer = persistReducer(navPersistConfig, navReducer);
const currencyPersistReducer = persistReducer(currencyPersistConfig, currencyReducer)
const rootReducer = combineReducers({navPersistReducer, currencyPersistReducer})
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});
const persistor = persistStore(store);

export { store, persistor }