export const addExpenseReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE_PENDING':
      return {
        ...state,
        loading: true,
      }
    case 'ADD_EXPENSE_FULFILLED':
      return {
        ...state,
        loading: false,
        success: action.payload,
      }
    case "RESET_SUCCESS":
      return {
        ...state,
        success: null,
      }
    case 'ADD_EXPENSE_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state;
  }
}
export const getExpenseReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_EXPENSE_PENDING':
      return {
        ...state,
        loading: true,
      }
    case 'GET_EXPENSE_FULFILLED':
      return {
        ...state,
        loading: false,
        expense: action.payload,
      }
    case "RESET_SUCCESS":
      return {
        ...state,
        success: null,
      }
    case 'GET_EXPENSE_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state;
  }
}