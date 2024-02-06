import { useContext, useRef ,useState} from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { NavLink } from 'react-router-dom';
import Error from "../../components/error/Error";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const [err,setErr]=useState('');

  const handleClick =async (e) => {
    e.preventDefault();
    const error = await loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    if(error && error.response.status===404){
      setErr("User do not exist");
    }else if(error && error.response.status===400){
      setErr("Incorrect Password");
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
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
              <Error message={err}/>
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress />
              ) : (
                "Log In"
                )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <NavLink to="/register" className="loginRegisterButton">Create a New Account</NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}
