import React, { useState } from "react";

import "./login.styles.scss";

// LOGIN COMPONENT
const Login = ({ logInUser, appData, app }) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="login">
      <h2 className="login__header">Please Login</h2>

      {/* Login button  */}
      {!loading ? (
        <button
          id="login-btn"
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              app.setState({
                appData,
                isLoaded: true,
                isLoggedIn: true,
                user: logInUser(appData.data),
              });
            }, 3000);
          }}
        >
          Login
        </button>
      ) : (
        <button id="loggingIn-btn">Logging in...</button>
      )}
    </div>
  );
};

export default Login;
