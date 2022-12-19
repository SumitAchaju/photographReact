import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import PopUpMsg from "../../Components/PopUpMsg";

export default function Register() {
  let { loginStatus, setloginStatus, setAuthToken, setUserId, Message } =
    useContext(AuthContext);
  const register = (e) => {
    e.preventDefault();
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!regex.test(e.target.email.value)) {
      Message("invalid email adresses!!");
      return;
    }
    if (e.target.password.value !== e.target.confirmpassword.value) {
      Message("password didnot match!!");
      return;
    }
    if (e.target.password.value.length < 8) {
      Message("password must be of at least 8 characters!!");
      return;
    }
    const registerData = {
      first_name: e.target.firstname.value,
      last_name: e.target.lastname.value,
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
      password2: e.target.confirmpassword.value,
    };
    axios
      .post("https://sumitachaju.pythonanywhere.com/register/", registerData)
      .then((res) => {
        if (res.status === 201) {
          try {
            axios
              .post("https://sumitachaju.pythonanywhere.com/api/token/", {
                username: `${e.target.username.value}`,
                password: `${e.target.password.value}`,
              })
              .then((response) => {
                if (response.status === 200) {
                  setAuthToken(response.data);
                  setUserId(jwt_decode(response.data.access).user_id);
                  setloginStatus(true);
                  localStorage.setItem("token", JSON.stringify(response.data));
                }
              });
          } catch (error) {
            Message("login failed!!");
          }
        }
      })
      .catch((err) => {
        if (err.response.data.username) {
          Message("Username: " + err.response.data.username);
        } else if (err.response.data.email) {
          Message("Email: " + err.response.data.email);
        } else if (err.response.data.password) {
          Message("Password: " + err.response.data.password);
        }
      });
  };
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
  function showcppassword(event) {
    let element = document.querySelector("#cp");
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
      <div id="register">
        <h1>PHOTOGRAPH</h1>
        <div className="login-input">
          <form onSubmit={register}>
            <label htmlFor="#fm">First Name</label>
            <input id="fm" name="firstname" type="text" required />
            <label htmlFor="#lm">Last Name</label>
            <input id="lm" name="lastname" type="text" required />
            <label htmlFor="#em">Email</label>
            <input id="em" name="email" type="email" required />
            <label htmlFor="#u">Username</label>
            <input id="u" name="username" type="text" required />
            <label htmlFor="#p">Password</label>
            <div className="showpassword">
              <input id="p" name="password" type="password" required />
              <span
                className="showpasswordtext"
                onClick={(event) => showpassword(event)}
              >
                <i className="bi bi-eye-fill"></i>
              </span>
            </div>
            <label htmlFor="#cp">Confirm Password</label>
            <div className="showpassword">
              <input id="cp" name="confirmpassword" type="password" required />
              <span
                className="showpasswordtext"
                onClick={(event) => showcppassword(event)}
              >
                <i className="bi bi-eye-fill"></i>
              </span>
            </div>
            <button type="sumbit">Create Account</button>
          </form>
        </div>
        <div className="div login-register">
          <span>Already Have Account?</span>
          <Link to="/login">Login</Link>
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
