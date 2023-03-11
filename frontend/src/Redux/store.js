// Importing necessary libraries and files to be used
import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "./users/user.reducer";
import noteReducer from "./notes/note.reducer";

// Combining all reducers into a single reducer for the store to use.
const rootReducer = combineReducers({
  userReducer,
  noteReducer,
});

// Creating the middleware array with thunk.
const middleware = [thunk];

// Configuring the redux store with root reducer and middleware.
const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
});

// Exporting the configured store as the default export.
export default store;
