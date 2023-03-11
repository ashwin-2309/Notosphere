// Importing necessary libraries and files to be used
import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "./users/user.reducer";

// Combining all reducers into a single reducer for the store to use.
const rootReducer = combineReducers({
  userReducer: userReducer,
});

// Configuring the redux store with root reducer and middleware.
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});
