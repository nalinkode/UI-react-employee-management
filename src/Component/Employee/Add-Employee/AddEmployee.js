import React, { useState, useEffect } from "react";
import "./AddEmployee.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  saveEmployee,
  updateEmployeeData,
  getEmployee,
  stopLoader,
} from "../../../redux/actions/employeeAction";
import { useParams } from "react-router-dom";
import LoaderComponent from "../../Loader/Loader";
import { FormattedMessage, useIntl } from "react-intl";
import translate from "../../../i18n/translate";

function AddEmployee({ state, saveEmployee, updateEmployeeData }) {
  let { empId } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  const intl = useIntl();

  const employeeObjById = useSelector((state) =>
    state.employees.employees.find((item) => item.id === empId)
  );
  const [disabled, setDisabled] = useState(false);
  const [formTitle, setFormTitle] = useState("form.add-employee");

  useEffect(() => {
    if (employeeObjById != null && empId === employeeObjById.id) {
      setFormTitle("form.edit-employee");
      setDisabled(true);
      SetEmployee({
        id: employeeObjById.id,
        fullName: employeeObjById.fullName,
        age: employeeObjById.age,
        gender: employeeObjById.gender,
        department: employeeObjById.department,
        designation: employeeObjById.designation,
        address: employeeObjById.address,
      });
      dispatch(getEmployee(empId));
      dispatch(stopLoader());
    }
  }, []);

  const [employee, SetEmployee] = useState({
    id: "",
    fullName: "",
    age: "",
    gender: "",
    department: "",
    designation: "",
    address: "",
  });

  const handleInputChange = (e) => {
    SetEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const data = {
      id: employee.id,
      fullName: employee.fullName,
      age: employee.age,
      gender: employee.gender,
      department: employee.department,
      designation: employee.designation,
      address: employee.address,
    };
    if (employeeObjById != null && empId === employeeObjById.id) {
      updateEmployeeData(data);
    } else {
      saveEmployee(data);
    }
    history.push("/employee");
  };

  function cancel() {
    history.push("/employee");
  }
  if (state.loading) {
    return <LoaderComponent />;
  } else {
    return (
      <div className="container mt-3 box-shadow">
        <h3 className="text-center">
          <FormattedMessage id={formTitle} />
        </h3>
        <div className="mt-3 col-lg-6 justify-content-md-center form-center">
          <form onSubmit={submitForm}>
            <div className="form-row">
              {/* Employee Id */}
              <div className="form-group col-md-6 input-group">
                <input
                  disabled={disabled}
                  className="form-control"
                  placeholder={intl.formatMessage({ id: "form.employee-id" })}
                  name="id"
                  onChange={handleInputChange}
                  value={employee.id}
                  required/>
                <span class="asterisk_input"> </span>            
              </div>

              {/* Full Name */}
              <div className="form-group col-md-6 input-group">
                <input
                  className="form-control"
                  placeholder={intl.formatMessage({ id: "form.full-name" })}
                  name="fullName"
                  onChange={handleInputChange}
                  value={employee.fullName}
                  minlength="5"
                  required/>
              </div>
            </div>

            <div className="form-row">
              {/* Age */}
              <div className="form-group col-md-6 input-group">
                <input
                  className="form-control"
                  placeholder={intl.formatMessage({ id: "form.age" })}
                  name="age"
                  onChange={handleInputChange}
                  value={employee.age}
                  required/>
              </div>

              {/* Gender */}
              <div className="form-group col-md-6">
                <select
                  name="gender"
                  defaultValue="Select Gender"
                  value={employee.gender}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="Select Gender">
                    {intl.formatMessage({ id: "form.select-gender" })}{" "}
                  </option>

                  <option value="Male">
                    {intl.formatMessage({ id: "form.male" })}{" "}
                  </option>

                  <option value="Female">
                    {intl.formatMessage({ id: "form.female" })}{" "}
                  </option>
                </select>
              </div>
            </div>

            <div className="form-row">
              {/* Department */}
              <div className="form-group col-md-6 input-group">
                <input
                  className="form-control"
                  placeholder={intl.formatMessage({ id: "form.department" })}
                  name="department"
                  onChange={handleInputChange}
                  value={employee.department}
                  required/>   
              </div>

              {/* Designation */}
              <div className="form-group col-md-6 input-group">
                <input
                  className="form-control"
                  placeholder={intl.formatMessage({ id: "form.designation" })}
                  name="designation"
                  onChange={handleInputChange}
                  value={employee.designation}
                  required/>   
              </div>
            </div>

            <div className="form-group">
              <textarea
                className="form-control"
                placeholder={intl.formatMessage({ id: "form.address" })}
                name="address"
                onChange={handleInputChange}
                value={employee.address}
                required/>
            </div>
      
              <div className="text-right">
                <button type="button" onClick={cancel} class="btn btn-secondary">{intl.formatMessage({ id: "form.cancel" })}</button>
                <button type="submit" class="btn btn-success btn-margin">{intl.formatMessage({ id: "form.save" })}</button>
              </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.employees,
  };
};

export default connect(mapStateToProps, { saveEmployee, updateEmployeeData })(
  AddEmployee
);
