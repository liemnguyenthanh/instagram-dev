import { USER_GET_PROFILE_FAIL, USER_GET_PROFILE_REQUEST, USER_GET_PROFILE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../../actions/users/userAction";


function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true, error: null };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
  function  getMyProfileReducer(state = {userProfile :{} }, action) {
    switch (action.type) {
      case  USER_GET_PROFILE_REQUEST:
        return { loading: true ,userProfile :{}};
      case  USER_GET_PROFILE_SUCCESS:
        return { loading: false, userProfile: action.payload };
      case  USER_GET_PROFILE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
}
export {
  userSigninReducer,
  userRegisterReducer,
  getMyProfileReducer,
};
