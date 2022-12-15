export const addProductReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_PENDING':
    case 'ADD_PRODUCT_PENDING':
      return {
        ...state,
        loading: true,
      }
    case 'ADD_PRODUCT_FULFILLED':
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
    case 'ADD_PRODUCT_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state;
  }
}
export const addCategory = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY_PENDING':
      return {
        ...state,
        loading: true,
      }
    case 'ADD_CATEGORY_FULFILLED':
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
    case 'ADD_CATEGORY_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state;
  }
}


export const allProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ALL_PRODUCTS_PENDING':
      return {
        ...state,
        loading: true,
      }
    case 'ALL_PRODUCTS_FULFILLED':
      return {
        ...state,
        loading: false,
        success: true,
        products: action.payload,
      }
    case "RESET_SUCCESS":
      return {
        ...state,
        success: null,
      }
    case 'ALL_PRODUCTS_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state;
  }
}
export const allCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ALL_CATEGORY_PENDING':
      return {
        ...state,
        loading: true,
      }
    case 'ALL_CATEGORY_FULFILLED':
      return {
        ...state,
        loading: false,
        success: true,
        categories: action.payload,
      }
    case "RESET_SUCCESS":
      return {
        ...state,
        success: null,
      }
    case 'ALL_CATEGORY_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state;
  }
}


export const deleteElementReducer = (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_ELEMENT_PENDING':
      return {
        ...state,
        loading: true,
      }
    case 'DELETE_ELEMENT_FULFILLED':
      return {
        ...state,
        loading: false,
        success: action.payload,
      }
    case 'DELETE_ELEMENT_REJECTED':
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      }
    case "RESET_SUCCESS":
      return {
        ...state,
        success: null,
      }
    default:
      return state;
  }

}
export const supplierReducer = (state = {}, action) => {
  switch (action.type) {

    case 'SET_SUPPLIER':
      return {
        ...state,
        loading: false,
        suppliers: action.payload,
      }
    case "RESET_SUCCESS":
      return {
        ...state,
        success: null,
      }
    default:
      return state;
  }

}