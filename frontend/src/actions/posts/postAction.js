import axios from "axios";

export const POST_CREATE_REQUEST = "POST_CREATE_REQUEST";
export const POST_CREATE_SUCCESS = "POST_CREATE_SUCCESS";
export const POST_CREATE_FAIL = "POST_CREATE_FAIL";

export const POST_GET_REQUEST = "POST_GET_REQUEST";
export const POST_GET_SUCCESS = "POST_GET_SUCCESS";
export const POST_GET_FAIL = "POST_GET_FAIL";

export const MYPOST_GET_REQUEST = "MYPOST_GET_REQUEST";
export const MYPOST_GET_SUCCESS = "MYPOST_GET_SUCCESS";
export const MYPOST_GET_FAIL = "MYPOST_GET_FAIL";

export const createPost = ({ title, idUser }) => async (dispatch, getState) => {
  dispatch({
    type: POST_CREATE_REQUEST,
    payload: { title },
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const url = "http://localhost:8080/api/";
    console.log("token :", userInfo.token);
    const { data } = await axios.post(
      url + "posts",
      {
        title,
        idUser,
      },
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );
    dispatch({ type: POST_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_CREATE_FAIL, payload: error.message });
  }
};

export const getMyPost = ({user}) => async (dispatch, getState) => {
  dispatch({
    type: MYPOST_GET_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  console.log(user)
  try {
    const url = "http://localhost:8080/api/";
    const { data } = await axios.get(url + "posts/mypost/"+user, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch({ type: MYPOST_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MYPOST_GET_FAIL, payload: error.message });
  }
};

export const getPost = () => async (dispatch, getState) => {
  dispatch({
    type: POST_GET_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const url = "http://localhost:8080/api/";
    const { data } = await axios.get(url + "posts", {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch({ type: POST_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_GET_FAIL, payload: error.message });
  }
};
