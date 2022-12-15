export const categoryProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "CATEGORY_PRODUCTS_PENDING":
      return {
        ...state,
        loading: true,
      };
    case "CATEGORY_PRODUCTS_FULFILLED":
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case "CATEGORY_PRODUCTS_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
export const categoryNameReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_CATEGORY_NAME_PENDING":
      return {
        ...state,
        loading: true,
      };
    case "GET_CATEGORY_NAME_FULFILLED":
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case "GET_CATEGORY_NAME_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}


