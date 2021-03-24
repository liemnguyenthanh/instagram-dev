import { MYPOST_GET_FAIL, MYPOST_GET_REQUEST, MYPOST_GET_SUCCESS, POST_CREATE_FAIL, POST_CREATE_REQUEST, POST_CREATE_SUCCESS, POST_GET_FAIL, POST_GET_REQUEST, POST_GET_SUCCESS } from "../../actions/posts/postAction";


function createPostReducer(state = {}, action) {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true, post: [] };
    case POST_CREATE_SUCCESS:
      return { loading: false, post: action.payload };
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function getPostReducer(state = {posts: []}, action) {
  switch (action.type) {
    case POST_GET_REQUEST:
      return { loading: true , posts: []};
    case POST_GET_SUCCESS:
      return { loading: false, posts: action.payload };
    case POST_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function getMyPostReducer(state = {posts: []}, action) {
  switch (action.type) {
    case MYPOST_GET_REQUEST:
      return { loading: true , posts: []};
    case MYPOST_GET_SUCCESS:
      return { loading: false, posts: action.payload };
    case MYPOST_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
    createPostReducer, getPostReducer,getMyPostReducer
};
