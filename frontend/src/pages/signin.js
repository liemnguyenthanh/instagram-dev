import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signin } from '../actions/users/userAction';

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
    return () => {};
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
      dispatch(signin({email, password}));

  };
  return (
    <div className="signin_form">
      <h3>Login</h3>
      <form>
        <div>
          {
            error && <div>
              {error}
            </div>
          }
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
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
          <button  className="btn btn-primary" onClick={submitHandler}>
            Login
          </button>
          <Link to="/signup">register now!!</Link>
        </div>
      </form>
    </div>
  );
}
