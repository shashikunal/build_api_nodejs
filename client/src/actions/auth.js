import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
} from "./types";

import setAuthToken from "../utils/setAuthToken";
import { toast } from "react-toastify";
import { setAlert } from "./alert";

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.map((err) => {
        dispatch(setAlert(toast.error(err.msg)));
      });
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//LOGIN

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.map((err) => {
        return dispatch(setAlert(toast.error(err.msg)));
      });
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//LOGOUT //
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

//Forgot Password

export const forgotPassword = (email, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });
  try {
    const res = await axios.post("/api/users/forgot-password", body, config);
    dispatch({
      type: PASSWORD_RESET_SUCCESS,
      payload: res.data,
    });
    // dispatch(loadUser());
    dispatch(setAlert(toast.success("Successfully SENT")));
    history.push("/login");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.map((err) => {
        return dispatch(setAlert(toast.error(err.msg)));
      });
    }
    dispatch({
      type: PASSWORD_RESET_FAIL,
    });
  }
};

//RESET PASSWORD PUT REQUEST
export const resetPassword = (formData, match, history) => async (dispatch) => {
  console.log(match);
  try {
    const res = await axios.put(
      `/api/users/reset-password/${match.params.id}`,
      formData
    );

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
      payload: res.data,
    });
    dispatch(
      setAlert(toast.success("Success! Your Password has been changed!"))
    );
    history.push("/login");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.map((err) => {
        dispatch(setAlert(toast.error(err.msg)));
      });
    }
    dispatch({
      type: PASSWORD_RESET_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
