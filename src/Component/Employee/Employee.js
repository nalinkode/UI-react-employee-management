import React from 'react';
import './Employee.css';
import AddEmployee from './Add-Employee/AddEmployee';
import BasicTable from './Emp-List/BasicTable';
import { Switch, Route, Link } from 'react-router-dom';  
import {FormattedMessage} from 'react-intl';

const Employee = (props) => {
  return (
    <div>
      <div className="container mt-3">
        <Switch>   
          <Route exact path="" component={BasicTable}></Route> 
          <Route path="/employee/add" component={AddEmployee}></Route> 
          <Route path='/employee/edit/:empId' component={AddEmployee} />    
        </Switch>
      </div>
    </div>
  )
}

  export default Employee;
  