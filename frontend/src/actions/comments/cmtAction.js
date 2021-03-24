import axios from "axios";

export const COMMENT_CREATE_REQUEST = "COMMENT_CREATE_REQUEST";
export const COMMENT_CREATE_SUCCESS = "COMMENT_CREATE_SUCCESS";
export const COMMENT_CREATE_FAIL = "COMMENT_CREATE_FAIL";



export const createComment = ({comment , userId,postId }) => async (dispatch, getState) => {
  dispatch({
    type: COMMENT_CREATE_REQUEST,
    payload: { comment ,userId,postId },
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const url = "http://localhost:8080/api/";

    const { data } = await axios.post(
      url + "comments",
      {
        comment ,userId,postId
      },
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );
    dispatch({ type: COMMENT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: COMMENT_CREATE_FAIL, payload: error.message });
  }
};

