import { configureStore } from "@reduxjs/toolkit";
import alertsReducer from "./alertSlice";

const store = configureStore({
  reducer: {
    alerts: alertsReducer,
  },
});

export default store;