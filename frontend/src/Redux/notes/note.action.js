import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../constants/config";
import axios from "axios";
import store from "../store";

import {
  GET_NOTES_ERROR,
  GET_NOTES_LOADING,
  GET_NOTES_SUCCESS,
  CREATE_NOTE_ERROR,
  CREATE_NOTE_LOADING,
  CREATE_NOTE_SUCCESS,
  UPDATE_NOTE_ERROR,
  UPDATE_NOTE_LOADING,
  UPDATE_NOTE_SUCCESS,
  DELETE_NOTE_ERROR,
  DELETE_NOTE_LOADING,
  DELETE_NOTE_SUCCESS,
} from "./note.types";

export const getNotes = () => async (dispatch) => {
  // how we will get the notes
  // we will use axios to make a get request to the backend
  // we will dispatch an action to the reducer to set the loading state to true
  const { token } = store.getState().userReducer;
  console.log(token);

  dispatch({ type: GET_NOTES_LOADING });
  try {
    const res = await axios(BASE_URL + "/note", {
      method: "get",
      headers: {
        Authorization: token,
      },
    });

    const { status, message, data } = res.data;
    console.log(res.data);
    if (status === 1) {
      dispatch({ type: GET_NOTES_ERROR });
    }
  } catch (error) {
    dispatch({ type: GET_NOTES_ERROR });
  }
};

export const createNote = (obj) => async (dispatch) => {
  // how we will create the notes
  // we will use axios to make a post request to the backend
  // we will dispatch an action to the reducer to set the loading state to true
  const { token } = store.getState().userReducer;

  dispatch({ type: CREATE_NOTE_LOADING });
  try {
    const res = await axios(BASE_URL + "/note", {
      method: "post",
      data: obj,
      headers: {
        Authorization: token,
      },
    });

    const { status, message } = res.data;
    console.log(res.data);
    if (status === 1) {
      dispatch({ type: CREATE_NOTE_SUCCESS });
    } else {
      dispatch({ type: CREATE_NOTE_ERROR });
    }
  } catch (error) {
    dispatch({ type: CREATE_NOTE_ERROR });
  }
};

export const updateNote = (id, obj) => async (dispatch) => {
  // how we will update the notes

  //   we need both id and object to update a note
  // we will use axios to make a put request to the backend
  // we will dispatch an action to the reducer to set the loading state to true
  const { token } = store.getState().userReducer;

  dispatch({ type: UPDATE_NOTE_LOADING });
  try {
    const res = await axios(BASE_URL + "/note", {
      method: "patch",
      data: obj,
      headers: {
        Authorization: token,
        id: id,
      },
    });

    const { status, message } = res.data;
    console.log(message);
    if (status === 1) {
      dispatch({ type: UPDATE_NOTE_SUCCESS });
    } else {
      dispatch({ type: UPDATE_NOTE_ERROR });
    }
  } catch (error) {
    dispatch({ type: UPDATE_NOTE_ERROR });
  }
};

export const deleteNote = (id) => async (dispatch) => {
  // how we will delete the notes
  // we will use axios to make a delete request to the backend
  // we will dispatch an action to the reducer to set the loading state to true
  const { token } = store.getState().userReducer;

  dispatch({ type: DELETE_NOTE_LOADING });
  try {
    const res = await axios(BASE_URL + "/note", {
      method: "delete",
      headers: {
        Authorization: token,
        id: id,
      },
    });

    const { status, message } = res.data;

    if (status === 1) {
      dispatch({ type: DELETE_NOTE_SUCCESS });
    } else {
      dispatch({ type: DELETE_NOTE_ERROR });
    }
  } catch (error) {
    dispatch({ type: DELETE_NOTE_ERROR });
  }
};
