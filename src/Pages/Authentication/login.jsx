import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Login() {
  let { LoginUser, loginStatus } = useContext(AuthContext);

  if (loginStatus) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div id="login">
        <h1>PHOTOGRAPH</h1>
        <div className="login-input">
          <form onSubmit={LoginUser}>
            <label htmlFor="#u">Username</label>
            <input id="u" name="username" type="text" required />
            <label htmlFor="#p">Password</label>
            <input id="p" name="password" type="password" required />
            <button type="sumbit">Login</button>
          </form>
        </div>
        <div className="div login-register">
          <span>
            Don't Have Account Yet!!
            <br />
            Register Now...
          </span>
          <Link to="/register">Click Here</Link>
        </div>
      </div>
    </>
  );
}
