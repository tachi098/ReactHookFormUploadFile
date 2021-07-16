import { employeeAdded, employeeDeleted, employeesSuccess } from "./../reducers/EmployeeReducer";
import { api } from "./../../api";

export const fetchEmployees = () => async (dispatch) => {
  try {
    const res = await api.get("");
    dispatch(employeesSuccess(res.data));
  } catch (e) {
    return console.error(e);
  }
};

export const addEmployees = (data) => async (dispatch) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < data.multipartFile.length; i++) {
      formData.append(`multipartFile[${i}]`, data.multipartFile[i])
    }
    formData.append("name", data.name)
    const res = await api.post("", formData);
    dispatch(employeeAdded(res.data));
  } catch (e) {
    return console.error(e);
  }
};

export const deleteEmployees = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/${id}`);
    dispatch(employeeDeleted(res.data));
  } catch (e) {
    return console.error(e);
  }
}

// export const updateEmployees = (data) => async (dispatch) => {
//   try {
//     const res = await api.put("", data);
//     dispatch(employeeUpdated(res.data));
//   } catch (e) {
//     return console.error(e);
//   }
// }