import { COMMENT_CREATE_FAIL, COMMENT_CREATE_REQUEST, COMMENT_CREATE_SUCCESS } from "../../actions/comments/cmtAction";

function createCommentReducer(state = {}, action) {
  switch (action.type) {
    case COMMENT_CREATE_REQUEST:
      return { loadcmt: true, userCmt  : [] };
    case COMMENT_CREATE_SUCCESS:
      return { loadcmt: false, userCmt : action.payload };
    case COMMENT_CREATE_FAIL:
      return { loadcmt: false, error: action.payload };
    default:
      return state;
  }
}
export {
  createCommentReducer
};
