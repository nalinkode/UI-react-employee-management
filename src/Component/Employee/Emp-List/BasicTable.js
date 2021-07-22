import React, { useMemo, useState, useEffect } from "react";
import LoaderComponent from '../../Loader/Loader';
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./table.css";
import { GlobalFilter } from "./GlobalFilter";
import { useSelector } from "react-redux";
import ConfirmedDialog from "../../confirmed-dialog/ConfirmedDialog";
//redux
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchEmployees, deleteEmployeeData, operationRequest } from "../../../redux/actions/employeeAction";
//Internationalization
import { FormattedMessage, useIntl } from "react-intl";

const BasicTable = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const intl = useIntl();  
  
  //columns
  const COLUMNS = [
    {
      Header: intl.formatMessage({ id: "table_header_Id" }),
      accessor: "id",
    },
    {
      Header: intl.formatMessage({ id: "table_header_fullName" }),
      accessor: "fullName",
    },
    {
      Header: intl.formatMessage({ id: "table_header_age" }),
      accessor: "age",
    },
    {
      Header: intl.formatMessage({ id: "table_header_gender" }),
      accessor: "gender",
    },
    {
      Header: intl.formatMessage({ id: "table_header_department" }),
      accessor: "department",
    },
    {
      Header: intl.formatMessage({ id: "table_header_designation" }),
      accessor: "designation",
    },
    {
      Header: intl.formatMessage({ id: "table_header_address" }),
      accessor: "address",
    },
    {
      Header: intl.formatMessage({ id: "table_header_action" }),
      Cell: (row) => (
        <div className="text-center">
          <Link onClick={() => handleEdit(row.cell.row.original.id)}>
            <i className="far fa-edit"></i>
          </Link>
          &nbsp;&nbsp;
          <Link
            onClick={() => {
              setConfirmDialog({ isOpen: true, title: "Are you sure to delete record ?",
                onConfirm: () => { openModal(row.cell.row.original.id)},
              });
            }}>
            <i className="far fa-trash-alt delete-icon"></i>
          </Link>
        </div>
      ),
    },
  ];

  function handleEdit(row) {
    dispatch(operationRequest())
    history.push(`/employee/edit/${row}`);
  }

  const openModal = (id) => {
    setConfirmDialog({ isOpen: false });
    dispatch(deleteEmployeeData(id))
  };
  // ------------------------------------------------------
  
  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

  const data = useSelector((state) => state.employees.employees);
  //sort by name 
  data.sort(function(a, b) {
    var nameA = a.fullName.toUpperCase(); // ignore upper and lowercase
    var nameB = b.fullName.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }  
    // names must be equal
    return 0;
  });

  const columns = useMemo(() => COLUMNS, []);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 } 
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;
  const { pageIndex } = state;

  if (props.employeeData.loading ) {
    return ( 
        <LoaderComponent/>
    )
  } else {
    return (
      <>
        <div class="main-header">
           <Link className="nav-item nav-link" to="/employee/add"><i className="fa fa-plus" aria-hidden="true"></i>&nbsp; <FormattedMessage id="employee.add-employee"/></Link>
           <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        </div>
        <div className="table-responsive">
          <table className="table mt-3" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <span>
                              <i class="fas fa-sort-numeric-up"></i>
                            </span>
                          ) : (
                            <span>
                              <i class="fas fa-sort-alpha-down"></i>
                            </span>
                          )
                        ) : (
                          " "
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mb-3 text-center">
          <span>
            {" "}<FormattedMessage id="pagination-page"/>{""}{" "}
            <strong>
              {pageIndex + 1} <FormattedMessage id="of"/> {pageOptions.length}
            </strong>{" "}
          </span>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <FormattedMessage id="pagination-previous"/>
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
          <FormattedMessage id="pagination-Next"/>
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </div>
        <ConfirmedDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}
        />
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    employeeData: state.employees,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEmployees: () => dispatch(fetchEmployees()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicTable);
