import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Hello, Exl Team</h1>
        <p>Welcome to your technical assessment application, built with:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
        </ul>
        <p>To help you get started, follow these steps:</p>
        <ul>
                <li><strong>1. Get Solution: </strong>use the link <a href='https://github.com/asuricode/ExlNetCoreReactSQL.git'>Source</a> to get the solution.</li>
          <li><strong>2. Seed Data: </strong>Use SeedData.SQL in SeedData directory to create the database and Employee schema with data</li>
          <li><strong>3. Add Identity Schema: </strong>In Order to get Identity schema, run update-database command from npm console</li>
        </ul>
        <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
      </div>
    );
  }
}
