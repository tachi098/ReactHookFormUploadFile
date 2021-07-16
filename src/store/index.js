import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./reducers/EmployeeReducer";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    employee: employeeReducer
  },
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware: [thunk]
});

export default store