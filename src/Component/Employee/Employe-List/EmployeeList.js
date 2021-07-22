import React from 'react';
import './EmployeeList.css'  
import * as employeeService from '../../../service/EmployeeService';
import { Table, Button, Alert } from 'react-bootstrap';
import LoaderComponent from '../../Loader/Loader';

class EmployeeList extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        employees: [],
        loading: true
      }
    }

    componentDidMount() {
      employeeService.getAllEmployee().then(resp => {
        this.setState({
          employees : resp,
          loading: false
        });
        console.log(this.state.employees)
      }).catch({
         
      })
    }

    deleteEmployee(employeeId) {
      employeeService.deleteEmployeeById(employeeId).then(console.log('suuccess deleted'));
    }
   

    render() {
      const {loading, employees} = this.state;
      if(loading){
         return (<LoaderComponent/>)
      }else {
        return(
          <div className="mt-3">
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Employee Id</th>
                <th>Full Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.fullName}</td>
                  <td>{employee.age}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.department}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.address}</td>
                   <td>
                    <div class="btn-container">                    
                      <button  className="btn btn-primary" onClick={() => this.props.editProduct(employee.id)}>Edit</button>
                      &nbsp;<button  className="btn btn-danger" onClick={() => this.deleteEmployee(employee.id)}>Delete</button>
                    </div>               
                   </td> 
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        )
        }
       }
}


export default EmployeeList;