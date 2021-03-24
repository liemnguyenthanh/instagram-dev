import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createCommentReducer } from './reducers/cmtReducers/cmtReducers';
import { createPostReducer, getMyPostReducer, getPostReducer } from './reducers/postReducers/postReducers';
import { getMyProfileReducer, userRegisterReducer, userSigninReducer } from './reducers/userReducer/userReducers';
const userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
const initialState = {

  userSignin: { userInfo },
};
const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userSignin :userSigninReducer,
  createPost : createPostReducer,
  getPostSt : getPostReducer,
  createCommentSt : createCommentReducer,
  getMypostSt: getMyPostReducer,
  getMyProfileSt :getMyProfileReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
