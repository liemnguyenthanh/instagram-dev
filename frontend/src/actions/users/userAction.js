import axios from "axios";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAIL = "USER_REGISTER_FAIL";

export const USER_SIGNIN_REQUEST = "USER_SIGNIN_REQUEST";
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export const USER_SIGNIN_FAIL = "USER_SIGNIN_FAIL";

export const USER_GET_PROFILE_REQUEST = "USER_GET_PROFILE_REQUEST";
export const USER_GET_PROFILE_SUCCESS = "USER_GET_PROFILE_SUCCESS";
export const USER_GET_PROFILE_FAIL = "USER_GET_PROFILE_FAIL";

export const signin = ({ email, password }) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password },
  });
  try {
    const url = "http://localhost:8080/api/";
    const { data } = await axios.post(url + "users/signin", {
      email,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};
export const getMyProfile = ({ id  }) => async (dispatch) => {
  dispatch({
    type: USER_GET_PROFILE_REQUEST,
    payload: {  id  },
  });
  try {
    const url = "http://localhost:8080/api/";
    const { data } = await axios.get(url + "users/"+ id);
    dispatch({ type: USER_GET_PROFILE_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: USER_GET_PROFILE_FAIL, payload: error.message });
  }
};
export const register = ({ fullName, username, email, password }) => async (
  dispatch
) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { fullName, username, email, password },
  });
  try {
    const url = "http://localhost:8080/api/";
    const { data } = await axios.post(url + "users/signup", {
      fullName,
      username,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};
