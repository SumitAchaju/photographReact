import React from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <>
        <div id="register">
        <h1>PHOTOGRAPH</h1>
        <div className="login-input">
            <form>
                <label htmlFor="#fm">First Name</label>
                <input id='fm' name='firstname' type="text" />
                <label htmlFor="#lm">Last Name</label>
                <input id='lm' name='lastname' type="text" />
                <label htmlFor="#em">Email</label>
                <input id='em' name='email' type="email" />
                <label htmlFor="#u">Username</label>
                <input id='u' name='username' type="text" />
                <label htmlFor="#p">Password</label>
                <input id='p' name='password' type="password" />
                <label htmlFor="#cp">Confirm Password</label>
                <input id='cp' name='confirmpassword' type="password" />
                <button type='sumbit'>Create Account</button>
            </form>
        </div>
        <div className="div login-register">
            <span>Already Have Account?</span>
            <Link to='/login'>Login</Link>
        </div>
    </div>
    </>
  )
}
