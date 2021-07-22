import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  GET_EMPLOYEE,
  UPDATE_EMPLOYEE,
  UPDATED_SUCCESSFULLY,
  ADDED_SUCCESSFULLY,
  DELETED_SUCCESSFULLY,
  SOMETHING_WRONG,
  FETCH_EMPLOYEE_SUCCESS,
  FETCH_EMPLOYEE_FAILURE,
  OPERATION_FAILURE,
  OPERATION_REQUEST,
  STOP_LOADER
} from "../../Constant/configuration";
import {BASE_URL} from '../../Constant/environment';
const config = { headers: { "Content-Type": "application/json" } };

// actions
export const addEmployeeSuccess = (employee) => ({
  type: CREATE_EMPLOYEE,
  payload: employee,
});
//
export const getEmployee = (id) => ({
  type: GET_EMPLOYEE,
  payload: id,
});

export const deleteEmployee = (id) => ({
  type: DELETE_EMPLOYEE,
  payload: id,
});

export const updateEmployeeSuccess = (employee) => ({
  type: UPDATE_EMPLOYEE,
  payload: employee,
});

export const fetchEmployeesSuccess = (employees) => {
  return {
    type: FETCH_EMPLOYEE_SUCCESS,
    payload: employees,
  };
};

export const fetchEmployeesFailure = (error) => {
  return {
    type: FETCH_EMPLOYEE_FAILURE,
    payload: error,
  };
};

export const operationFailure = (error) => {
  return {
    type: OPERATION_FAILURE,
    payload: error,
  };
};

export const operationRequest = () => {
    return {
      type: OPERATION_REQUEST
    };
};

export const stopLoader = () => {
    return {
      type: STOP_LOADER
    };
};

export const fetchEmployees = () => {
  return (dispatch) => {
    dispatch(operationRequest());
    axios.get(BASE_URL)
      .then((response) => {
        const employees = response.data;
        dispatch(fetchEmployeesSuccess(employees));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(operationFailure(errorMsg));
      });
  };
};

export const saveEmployee = (empObj) => {
  debugger;
  return (dispatch) => {
    dispatch(operationRequest());
    axios.post(BASE_URL, empObj)
      .then((response) => {
        const employee = response.data;
        dispatch(addEmployeeSuccess(employee));
        toast.success(ADDED_SUCCESSFULLY);
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(operationFailure(errorMsg));
        toast.warning(SOMETHING_WRONG);
      });
  };
};

export const updateEmployeeData = (empObj) => {
  debugger;
  return (dispatch) => {
    dispatch(operationRequest());
    axios
      .put(BASE_URL + "/" + empObj.id, empObj, config)
      .then((response) => {
        const employee = response.data;
        dispatch(updateEmployeeSuccess(employee));
        debugger
        toast.success(UPDATED_SUCCESSFULLY);
      })
      .catch((error) => {
        const errorMsg = error.message;
        toast.warning(SOMETHING_WRONG);
        dispatch(operationFailure(errorMsg));
      });
  };
};

export const deleteEmployeeData = (id) => {
  return (dispatch) => {
    dispatch(operationRequest());
    axios
      .delete(BASE_URL + "/" + id, config)
      .then((response) => {
        dispatch(deleteEmployee(id));
        toast.success(DELETED_SUCCESSFULLY);
      })
      .catch((error) => {
        const errorMsg = error.message;
        toast.warning(SOMETHING_WRONG);
        dispatch(operationFailure(errorMsg));
      });
    };
};
