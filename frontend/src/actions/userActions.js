import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // make the request to the backend
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    // set the user in the local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
    // set the user in cookie
    // document.cookie = `userInfo=${JSON.stringify(data)}; path=/`;
    // console.log(data);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  console.log("logout");
  //   console.log localstorage
  console.log(localStorage.getItem("userInfo"));
  //   clear the local storage

  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password, pic) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // make the request to the backend
    const { data } = await axios.post(
      "/api/users/register",
      { name, email, password, pic },
      config
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    // set the user in the local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
