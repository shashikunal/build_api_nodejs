import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
// import login from "./auth";
export default combineReducers({
  alert,
  auth,
});
