import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'

export class FetchData1 extends Component {
  static displayName = FetchData1.name;

  constructor(props) {
    super(props);
    this.state = { employees: [], loading: true };
  }

    componentDidMount() {
    this.populateEmployeeData();
  }

    static renderEmployeesTable(employees) {
    return (
        <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>                  
                    <th>Id</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>MiddleName</th>     
                    <th>StartDate</th>
                    <th>EndDate</th>
                    <th>Gender</th>
                    <th>Salary</th>
                    <th>TeamName</th>            
          </tr>
        </thead>
        <tbody>
          {employees.map(employee =>
              <tr key={employee.id}>
                  <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
                  <td>{employee.middleName}</td>
                  <td>{employee.startDate}</td>
                  <td>{employee.endDate}</td>
                  <td>{employee.gender}</td>
                  <td>{new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD"
                  }).format(employee.salary)}
                  </td>
                  <td>{employee.teamName}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData1.renderEmployeesTable(this.state.employees);

    return (
      <div>
        <h1 id="tabelLabel" >Employee Data</h1>
        <p>This component demonstrates fetching employee data from the server.</p>
        {contents}
      </div>
    );
  }
    getParsedDate(date) {
        date = (String(date).split('T'))[0];
        date = (String(date.split('-')));
        var year = String(date[0]);
        var month = String(date[1]);
    var day = String(date[2]);
    return year + '-' + month + '-' + day;
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
