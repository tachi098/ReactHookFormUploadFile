import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: []
}

const employeeReducer = createSlice({
  name: "employees",
  initialState,
  reducers: {
    employeesSuccess: (state, action) => {
      state.employees = action.payload;
    },
    employeeAdded: (state, action) => {
      state.employees.push(action.payload);
    },
    employeeDeleted: (state, action) => {
      const { id } = action.payload;
      const existingEmployee = state.employees.find((employee) => employee.id === id);
      if (existingEmployee) {
        state.employees = state.employees.filter((employee) => employee.id !== id);
      }
    },
    employeeUpdated(state, action) {
      const { id, name, email, phone, birthday } = action.payload;
      const existingEmployee = state.employees.find((employee) => employee.id === id);
      if (existingEmployee) {
        existingEmployee.name = name;
        existingEmployee.email = email;
        existingEmployee.phone = phone;
        existingEmployee.birthday = birthday;
      }
    }
  }
})


const { reducer, actions } = employeeReducer
export const { employeeDeleted, employeesSuccess, employeeAdded, employeeUpdated } = actions
export default reducer;
