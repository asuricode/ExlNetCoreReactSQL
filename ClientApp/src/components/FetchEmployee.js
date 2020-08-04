import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'
import TableFilter from 'react-table-filter';
import { array } from 'prop-types';
import {} from 'react-table-filter/lib/styles.css';

export class FetchEmployee extends Component {
  static displayName = FetchEmployee.name;
 

  constructor(props) {
    super(props);
      this.state = { employees: [], loading: true };
      this._filterUpdated = this._filterUpdated.bind(this);
  }
    _filterUpdated(newData, filtersObject) {
         this.setState({ employees: newData, loading: false });
    }

    componentDidMount() {
    this.populateEmployeeData();
  }

    static renderEmployeesTable(employees) {
        
    return (
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <TableFilter
                    rows={employees}
                    onFilterUpdate={this._filterUpdated}>                          
                        <th key="id" filterkey="id" className="cell" alignleft={'true'} showsearch={'true'}>Employee Id</th>
                        <th key="firstName" filterkey="firstName" className="cell" casesensitive={'true'} showsearch={'true'}>First Name</th>
                        <th key="lastName" filterkey="lastName" className="cell" casesensitive={'true'} showsearch={'true'}>Last Name</th>
                    <th key="middleName" filterkey="middleName" showsearch={'true'}>Middle Name</th>     
                    <th key="startDate" filterkey="startDate" showsearch={'true'}>Start Date</th>
                        <th key="endDate" filterkey="endDate">End Date</th>
                    <th key="gender" filterkey="gender" showsearch={'true'}>Gender</th>
                    <th key="salary" filterkey="salary" alignleft={'true'} showsearch={'true'}>Salary</th>
                    <th key="teamName" filterkey="teamName" showsearch={'true'}>Team</th>            
                   </TableFilter>
        </thead>
        <tbody>
          {employees.map(employee =>
              <tr key={employee.id}>
                  <td className="cell">{employee.id}</td>
                  <td className="cell">{employee.firstName}</td>
                  <td className="cell">{employee.lastName}</td>
                  <td className="cell">{employee.middleName}</td>
                  <td className="cell">{new Date(employee.startDate).toLocaleDateString()}</td>
                  <td className="cell">{(employee.endDate == null) ? '':new Date(employee.endDate).toLocaleDateString() }</td>
                  <td className="cell">{employee.gender}</td>
                  <td className="cell">{new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD"
                  }).format(employee.salary)}
                  </td>
                  <td className="cell">{employee.teamName}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchEmployee.renderEmployeesTable(this.state.employees);

    return (
      <div>
        <h1 id="tabelLabel" >Employee Data</h1>
        <p>This component demonstrates fetching employee data from the server.</p>
        {contents}
      </div>
    );
  }
 
    async populateEmployeeData() {
    const token = await authService.getAccessToken();
    const response = await fetch('api/ExlEmployee', {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
        const data = await response.json();             
    this.setState({ employees: data, loading: false });
  }
}
