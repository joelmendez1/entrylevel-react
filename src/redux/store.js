import { configureStore } from "@reduxjs/toolkit";
import { navReducer } from './nav/navReducer'

const store = configureStore({ reducer: navReducer })

export { store }