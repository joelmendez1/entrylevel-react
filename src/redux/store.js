import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { navReducer } from "./nav/navReducer";
import { currencyReducer } from "./currency/currencyReducer";
import { productsReducer } from "./products/productReducer";
import { backgroundReducer } from "./background/backgroundReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const navPersistConfig = {
  key: "nav-key",
  storage,
  blacklist: ["currency-key", "products-key"],
};
const currencyPersistConfig = {
  key: "currency-key",
  storage,
  blacklist: ["nav-key", "products-key"],
};
const productPersistConfig = {
  key: "products-key",
  storage,
  blacklist: ["nav-key", "currency-key"],
};

const navPersistReducer = persistReducer(navPersistConfig, navReducer);
const currencyPersistReducer = persistReducer(
  currencyPersistConfig,
  currencyReducer
);
const productPersistReducer = persistReducer(
  productPersistConfig,
  productsReducer
);
const rootReducer = combineReducers({
  navPersistReducer,
  currencyPersistReducer,
  productPersistReducer,
  backgroundReducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor = persistStore(store);

export { store, persistor };
