import React, { Component } from "react";
import "./App.scss";

import { userLogin, fetchUsers } from "./api";
import Login from "./components/login/login.component";
import Users from "./components/users/users.components";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appData: {},
      isLoaded: false,
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const clientFetchUsers = async () => {
      const app_data = await fetchUsers().then((result) => result);
      const usersData = JSON.parse(app_data);
      this.setState({
        appData: usersData,
        isLoaded: true,
        isLoggedIn: false,
      });
    };
    clientFetchUsers();
  }

  render() {
    const { appData, isLoaded, isLoggedIn } = this.state;
    return (
      <div className="App">
        <h1>FAKER_APP</h1>
        {isLoaded ? (
          !isLoggedIn ? (
            <Login logInUser={userLogin} appData={appData} app={this} />
          ) : appData ? (
            <Users appData={appData} app={this} />
          ) : null
        ) : (
          <p>Loading....</p>
        )}
      </div>
    );
  }
}
