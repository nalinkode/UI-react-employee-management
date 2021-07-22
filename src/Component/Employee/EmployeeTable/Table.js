import React, { useEffect, useState, useMemo } from "react";
import Headers from './Headers';
import PaginationComponent from './Pagination';
import './EmployeeList.css'  
import * as employeeService from '../../../service/EmployeeService';
import Search from './Search';


const DataTable = (props) => {
   
    const [employee, setEmployee] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] =  useState(1);
    const [item, setItem] =  useState();
    const [search, setSearch] = useState();
    const ITEMS_PER_PAGE = item;
    
    const headers = [
        {name: "Employee Id" , field: "id"},
        {name: "Full Name" , field: "fullName"},
        {name: "Age" , field: "age"},
        {name: "Gender" , field: "gender"},
        {name: "Department" , field: "departmnt"},
        {name: "Designation" , field: "designation"},
        {name: "Address" , field: "address"},
        {name: "Action" , field: "action"}
    ]
      
    useEffect(() => {
        employeeService.getAllEmployee().then(data => {
            setEmployee(data);
        })
    },[]);

    const employeeData = useMemo( ()=> {
        let computedEmployees = employee;
        debugger
        if(search) {
            computedEmployees = computedEmployees.filter(emp => {
                //emp['id'].toLowerCase().includes(search.toLowerCase()) ||
                emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
                //emp['age'].includes(search)||
                emp.gender.toLowerCase().includes(search.toLowerCase()) 
                //emp['departmnt'].toLowerCase().includes(search.toLowerCase()) ||
                //emp['Designation'].toLowerCase().includes(search.toLowerCase()) ||
                //emp['address'].toLowerCase().includes(search.toLowerCase())
            })
        }
        setTotalItems(computedEmployees.length);
        return computedEmployees.slice( (currentPage - 1) * ITEMS_PER_PAGE, (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE)
    }, [employee, currentPage, search, ITEMS_PER_PAGE])

    const deleteEmployee = (empId) => {
        employeeService.deleteEmployeeById(empId);
    }

    const editEmployee = (empId) => {
        debugger
        // history.push({  
        //      pathname: '/edit/' + empId  
        // }); 
    }
     
    return(
        <>  
        <div className="row w-100 mt-3">
                <div className="col mb-3 col-12 text-center">
                    <div className="row">
                        <div className="col-md-6 d-flex flex-row-reverse">
                            <Search
                                onSearch ={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }} /> 
                        </div> 
                    </div>
                  <div class="table-responsive">
                    <table className="table table-striped">
                        <Headers
                            headers={headers}/>
                        <tbody>
                            {employeeData.map(employee => (
                                <tr>
                                    <th scope="row" key={employee.id}>
                                        {employee.id}
                                    </th>
                                    <td>{employee.fullName}</td>
                                    <td>{employee.age}</td>
                                    <td>{employee.gender}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.designation}</td>
                                    <td>{employee.address}</td>
                                    <td>
                                        <div class="btn-container">                    
                                            <a onClick={() => { editEmployee(employee.id) }}><i class="far fa-edit"></i></a>
                                            &nbsp;<a onClick={() => { deleteEmployee(employee.id) }}><i class="far fa-trash-alt"></i></a>
                                        </div>               
                                    </td> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>

                <div className="col-md-6 flex-container">
                            <PaginationComponent
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}/> 

                            <select class="form-control select-width" onChange={(e) => setItem(e.target.value)}>
                                <option value="5" defaultValue>5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                </div>                
            </div>
        </>
    )
}

export default  DataTable;