import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { NavLink } from 'react-router-dom';
import Error from '../../components/error/Error';
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const [error,setError]=useState('');

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      setError("Passwords don't match!");
    }else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const resp1=await axios.get(process.env.REACT_APP_BACKEND_URL+`/users/?email=${user.email}`);
        const resp2=await axios.get(process.env.REACT_APP_BACKEND_URL+`/users/?username=${user.username}`);
        if(resp1.data){
          setError("Email Already Exists");
        }else if(resp2.data){
          setError("Username Already Exists");
        }else{
          await axios.post(process.env.REACT_APP_BACKEND_URL+"/auth/register", user);
          history.push("/login");
        }
      } catch (err) {
          console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <img className="logo" src="../../assets/logoo.png" alt=""/>
          <h3 className="loginLogo">Nexus</h3>
          <span className="loginDesc">
            Connecting users globally
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
              minLength="5"
              maxLength="20"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
              maxLength="50"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <Error message={error}/>
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <NavLink to="/login" className="loginRegisterButton">Login</NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}
