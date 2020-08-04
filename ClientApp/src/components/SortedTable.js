import ReactTable from "react-table-6";
import React, { Component } from "react";

import "react-table-6/react-table.css";
import "./StyleS.scss";
import { data } from "./Data";
import authService from './api-authorization/AuthorizeService'

const columns = [
    {
        Header: "ID",
        accessor: "id"
    },
    {
        Header: "First Name",
        accessor: "firstName"
    },
    {
        Header: "Last Name",
        accessor: "lastName"
    },
    {
        Header: "Middle Name",
        accessor: "middleName"
    },
    {
        Header: "Start Date",
        accessor: "startDate"
    },
    {
        Header: "End Date",
        accessor: "endDate"
    },
    {
        Header: "Gender",
        accessor: "gender"
    },
    {
        Header: "Salary",
        accessor: "salary"
    },
    {
        Header: "Team",
        accessor: "teamName"
    }

];

export default class ReactTableComponent extends Component {
    state = {
        selectedColumn: "All",
        employess: this.populateEmployeeData()
    };

    onChange = e => {
        this.setState({
            selectedColumn: e.target.value || "All",
            employees: this.state.employees
        });
    };

    defaultFilterMethodHandler = e => {
        if (e.target.value === "" || e.target.value === null) {
            this.setState({
                employees: this.State.employees
            });
            return this.state.employees;
        }
        let filter = this.state.employees.filter(item => {
            if (this.state.selectedColumn === "All") {
                return columns.map(
                    column => item[column.accessor].indexOf(e.target.value) > -1
                );
            }
            return item[this.state.selectedColumn].indexOf(e.target.value) > -1;
        });

        this.setState({
            employees: filter
        });
        return this.state.employees;
    };

    

    async populateEmployeeData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/ExlEmployee', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ employees: data, loading: false });
    }

    render() {
        return (
            <div className="tableContainer">
                <div id="dataTable" name="dataTable" className="dataTable">
                    <div className="filterSection">
                        <label htmlFor="searchby">Search By</label>
                        <select onChange={this.onChange}>
                            <option value="all">All</option>
                            {columns.map((msgTemplate, index) => (
                                <option key={index} value={msgTemplate.accessor}>
                                    {msgTemplate.accessor}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            sie="10"
                            name="search"
                            onKeyUp={this.defaultFilterMethodHandler}
                            onChange={this.defaultFilterMethodHandler}
                        />
                    </div>
                    <ReactTable
                        refs="reactTable"
                        data={this.state.employees}
                        showPagination={false}
                        defaultPageSize={500}
                        filterable={true}
                        defaultFilterMethod={this.defaultFilterMethodHandler}
                        columns={columns}
                    />
                </div>
                <a href="#dataTable" className="topUp">
                    topUp
        </a>
            </div>
        );
    }
}
