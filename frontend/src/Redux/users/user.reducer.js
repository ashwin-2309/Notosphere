const initialState = {
  token: "",
  auth: false,
};

export default function userReducer(state = initialState, action) {
  const { type, payload = {} } = action;

  switch (type) {
    case "LOGIN_USER_LOADING":
      return {
        ...state,
        loading: true,
      };

    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        auth: true,
        token: payload,
        error: false,
      };

    case "LOGIN_USER_ERROR":
      return {
        ...state,
        loading: false,
        auth: false,
        token: "",
        error: true,
      };

    default:
      return state;
  }
}
