export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "REGISTER_USER_PENDING":
    case "LOAD_USER_PENIDNG":
    case "LOGIN_USER_PENDING":
      return {
        ...state,
        loading: true,
        success: false,
      };
    case "REGISTER_USER_FULFILLED":
    case "LOGIN_USER_FULFILLED":
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        isloggedin: true,
        success: action.payload,
      };
    case "RESET_SUCCESS":
      return {
        ...state,
        success: null,
      }
    case "LOAD_USER_FULFILLED":
      return {
        ...state,
        loading: false,
        user: action.payload,
        isloggedin: true,

      };
    case "REGISTER_USER_REJECTED":
    case "LOAD_USER_REJECTED":
    case "LOGIN_USER_REJECTED":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload
      }

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null
      }

    case "LOGOUT_USER":
      return {
        ...state,
        isloggedin: false,
        user: null
      }

    default:
      return state;
  }
}





