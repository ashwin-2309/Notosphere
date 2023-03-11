//import axios library
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import { Dispatch } from "react";
import {
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from "./user.types";

//defining an asynchronous function:
export const getUser = (obj) => async (dispatch) => {
  try {
    // try block for making the request to the API endpoint
    let data = await axios(BASE_URL + "/user/login", {
      // sends a POST request to specified URL with the given req object data in the body
      method: "POST",
      data: obj,
    });
    // log the response data to console for debugging purposes
    let { message, token, status } = data.data;
    if (status === 1) {
      // handles success case where the status is true
      dispatch({
        type: LOGIN_USER_SUCCESS, // specifies the action type
        payload: token, // passes token (received in response) as payload
      });
    } else {
      // handles error case where the status is false
      dispatch({
        type: LOGIN_USER_ERROR, // specifies the action type
        payload: message, // passes error message received in response as payload
      });
    }
  } catch (error) {
    // catches any errors occurred during HTTP requests or catching errors from server
    dispatch({
      type: LOGIN_USER_ERROR, // specifies the action type
      payload: error.message, // passes the error message as payload
    });
  }
};
