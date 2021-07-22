import axios from "axios";
import { toast } from "react-toastify";
import {
  BASE_URL,
  SOMETHING_WRONG,
  ADDED_SUCCESSFULLY,
  UPDATED_SUCCESSFULLY,
  DELETED_SUCCESSFULLY,
} from "../Constant/configuration";
toast.configure();

const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function getAllEmployee() {
  return axios
    .get(BASE_URL)
    .then((response) => response.data)
    .catch((error) => {
      toast.warning(SOMETHING_WRONG);
    });
}

export function saveEmployee(data) {
  debugger;
  axios
    .post(BASE_URL, data, { options })
    .then((resp) => {
      debugger;
      toast.success(ADDED_SUCCESSFULLY);
    })
    .catch((error) => {
      toast.warning(SOMETHING_WRONG);
    });
}

export function updateEmployee(data) {
  axios
    .put(BASE_URL, data, Headers)
    .then((resp) => {
      toast.success(UPDATED_SUCCESSFULLY);
    })
    .catch((error) => {
      toast.warning(SOMETHING_WRONG);
    });
}

export function deleteEmployeeById(empId) {
  debugger;
  axios
    .delete(BASE_URL + "/" + empId)
    .then((resp) => {
      toast.success(DELETED_SUCCESSFULLY);
    })
    .catch((error) => {
      toast.warning(SOMETHING_WRONG);
    });
}
