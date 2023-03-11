import axios from "axios"; // importing axios library
import {
  LOGIN_USER_ERROR,
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
} from "./user.types"; // importing constants for action types

// defining an asynchronous function:
// which takes an object and returns another function as part of async operation using `async (dispatch)`
export const getUser = (obj) => async (dispatch) => {
  try {
    // try block for making the request to the API endpoint
    let data = await axios("http://localhost:4000/user/login", {
      // sends a POST request to specified URL with the given req object data in the body
      method: "POST",
      data: obj,
    });
    let { message, token, status } = data.data; // gets response data and destructures it into variables

    if (status === 1) {
      // handles success case where the status is true
      dispatch({
        // dispatches an action to Redux store
        type: LOGIN_USER_SUCCESS, // specifies the action type
        payload: token, // passes token (received in response) as payload
      });
    } else {
      // handles error case where the status is false
      dispatch({
        // dispatches an action to Redux store
        type: LOGIN_USER_ERROR, // specifies the action type
        payload: message, // passes error message received in response as payload
      });
    }
  } catch (error) {
    // catches any errors occurred during HTTP requests or catching errors from server
    dispatch({
      // dispatches an action to Redux store
      type: LOGIN_USER_ERROR, // specifies the action type
      payload: error.message, // passes the error message as payload
    });
  }
};
