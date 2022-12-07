import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Register() {
  let { loginStatus, setloginStatus, setAuthToken, setUserId } =
    useContext(AuthContext);
  const register = (e) => {
    e.preventDefault();
    let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    if(!regex.test(e.target.email.value)){
      alert("invalid email adresses!!")
      return
    }
    if(e.target.password.value !== e.target.confirmpassword.value){
      alert("password didnot match!!")
      return
    }
    if(e.target.password.value.length < 8){
      alert("password must be of at least 8 characters!!")
      return
    }
    const registerData = {
      first_name: e.target.firstname.value,
      last_name: e.target.lastname.value,
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
      password2: e.target.confirmpassword.value,
    };
    axios.post("http://127.0.0.1:8000/register/", registerData).then((res) => {
      if (res.status===201) {
        try {
          axios
            .post("http://127.0.0.1:8000/api/token/", {
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
          alert("login Failed!!");
          console.log(error);
        }
      }
    }).catch(err=>{
      if(err.response.data.username){
        alert("Username: "+err.response.data.username)
      }
      else if(err.response.data.email){
        alert("Email: "+err.response.data.email)
      }
      else if(err.response.data.password){
        alert("Password: "+err.response.data.password)
      }

    });
  };
  if (loginStatus) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div id="register">
        <h1>PHOTOGRAPH</h1>
        <div className="login-input">
          <form onSubmit={register}>
            <label htmlFor="#fm">First Name</label>
            <input id="fm" name="firstname" type="text" required/>
            <label htmlFor="#lm">Last Name</label>
            <input id="lm" name="lastname" type="text" required/>
            <label htmlFor="#em">Email</label>
            <input id="em" name="email" type="email" required/>
            <label htmlFor="#u">Username</label>
            <input id="u" name="username" type="text" required/>
            <label htmlFor="#p">Password</label>
            <input id="p" name="password" type="password" required/>
            <label htmlFor="#cp">Confirm Password</label>
            <input id="cp" name="confirmpassword" type="password" required/>
            <button type="sumbit">Create Account</button>
          </form>
        </div>
        <div className="div login-register">
          <span>Already Have Account?</span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </>
  );
}
