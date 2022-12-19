import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import PopUpMsg from "../../Components/PopUpMsg";

export default function Login() {
  let { LoginUser, loginStatus } = useContext(AuthContext);

  if (loginStatus) {
    return <Navigate to="/" />;
  }
  function showpassword(event) {
    let element = document.querySelector("#p");
    if (element.type === "password") {
      element.type = "text";
      if (event.target.classList.contains("bi-eye-fill")) {
        event.target.classList.remove("bi-eye-fill");
        event.target.classList.add("bi-eye-slash-fill");
      }
    } else {
      element.type = "password";
      if (event.target.classList.contains("bi-eye-slash-fill")) {
        event.target.classList.add("bi-eye-fill");
        event.target.classList.remove("bi-eye-slash-fill");
      }
    }
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
            <div className="showpassword">
              <input id="p" name="password" type="password" required />
              <span
                className="showpasswordtext"
                onClick={(event) => showpassword(event)}
              >
                {" "}
                <i className="bi bi-eye-fill"></i>{" "}
              </span>
            </div>
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
      <div id="home">
        <div className="container-mine flex">
          <PopUpMsg />
        </div>
      </div>
    </>
  );
}
