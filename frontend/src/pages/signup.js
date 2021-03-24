import { useEffect, useState } from "react";
import {useSelector ,useDispatch} from 'react-redux';
import { Link, useHistory,useLocation } from "react-router-dom";
import axios from "axios";
import { register } from "../actions/users/userAction";

export default function SignUpScreen() {
  const [fullname, setFullname] = useState("");
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch()
  console.log("user",userInfo)
  const history =useHistory();

  useEffect(() => {
    if (userInfo) {
      history.push('/signin');
    }
    return () => {};
  }, [userInfo]);
  const handleSubmit =  (e) => {
      e.preventDefault()
      dispatch(register({ username,fullName : fullname,email, password}))
    };

  return (
    <div className="signin_form">
      <h3>Sign up</h3>
      <form >
      <div className="mb-3">
          <label className="form-label">Full name</label>
          <input
            type="text"
            min='4'
            className="form-control"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
      <div className="mb-3">
          <label className="form-label">User Name</label>
          <input
            type="text"
            className="form-control"
            value={username}
            min='4'
            onChange={(e) => setusername  (e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            min='8'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div classNameName="signin_ele">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Login
          </button>
          <Link to="/signin">Login now!!</Link>
        </div>
      </form>
    </div>
  );
}
