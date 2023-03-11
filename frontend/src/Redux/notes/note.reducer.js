import {
  GET_NOTES_LOADING,
  GET_NOTES_SUCCESS,
  GET_NOTES_ERROR,
  CREATE_NOTE_LOADING,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_ERROR,
  UPDATE_NOTE_LOADING,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_ERROR,
  DELETE_NOTE_LOADING,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_ERROR,
} from "./note.types";
let initialState = {
  loading: false,
  error: false,
  data: [], // array of notes
};

const noteReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_NOTES_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };
    case GET_NOTES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case CREATE_NOTE_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CREATE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: [...state.data, payload],
      };
    case CREATE_NOTE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case UPDATE_NOTE_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data.map((note) =>
          note._id === payload._id ? payload : note
        ),
      };
    case UPDATE_NOTE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case DELETE_NOTE_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: state.data.filter((note) => note._id !== payload),
      };
    case DELETE_NOTE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
export default noteReducer;
