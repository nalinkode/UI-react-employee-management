import {
  CREATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  FETCH_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE,
  OPERATION_REQUEST,
  OPERATION_FAILURE,
  STOP_LOADER
} from "../../Constant/configuration";

const initialState = {
    employees : [],
    loading: false,
    error: '',
    employee: null,
    employeeTableHeaders: [{id: "Employee Id"}, {fullName: "Full Name"}, {gender: "Gender"}, {age: "Age"}, {department: "Department"}, {designation:"Designation"}, {address: "Address"} ],
};

export const employeeReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_EMPLOYEE :
            const newEmp = state.employees.concat(action.payload)
            return {
                ...state,
                loading: false,
                employees: newEmp
            };
        case GET_EMPLOYEE :
               let array = state.employees.filter((emp) => emp.id === action.payload);
                array.values();
                for (let value of array) {
                    array = value;
                }
                return {
                    ...state,
                    employee: array
                }
        case DELETE_EMPLOYEE :
              return {
                  ...state,
                  loading: false,
                  employees: state.employees.filter(emp => emp.id !== action.payload)
              }

        case UPDATE_EMPLOYEE:
            return {
                ...state,
                loading: false,
                employees : state.employees.map(emp => emp.id === action.payload.id ? action.payload : emp)
            }
        case OPERATION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case STOP_LOADER:
            return {
                ...state,
                loading: false
        }    
        
        case OPERATION_FAILURE:
            return {
                loading: false,
                employees : [],
                error: action.payload
            }
        
        case FETCH_EMPLOYEE_SUCCESS:
            return {
                loading: false,
                employees: action.payload,
                error: ''
            }

        default:
            return state;
    }
}
