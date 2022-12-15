export const addSaleReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_SALE_PENDING':
      return {
        ...state,
        loading: true,
      }
    case 'ADD_SALE_FULFILLED':
      return {
        ...state,
        loading: false,
        sale: action.payload.sale,
        success: action.payload.success,
      }
    case "RESET_SUCCESS":
      return {
        ...state,
        success: null,
      }
    case 'ADD_SALE_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state;
  }
}
export const getSaleReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_SALE_PENDING':
      return {
        ...state,
        loading: true,
      }
    case 'GET_SALE_FULFILLED':
      return {
        ...state,
        loading: false,
        sales: action.payload,
      }
    case "RESET_SUCCESS":
      return {
        ...state,
        success: null,
      }
    case 'GET_SALE_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state;
  }
}


// 
export const recentSaleReducer = (state = {}, action) => {
  switch (action.type) {
    case 'RECENT_SALE_PENDING':
      return {
        ...state,
        loading: true,
      }
    case 'RECENT_SALE_FULFILLED':
      return {
        ...state,
        loading: false,
        sale: action.payload.sale,
        success: action.payload.success,
      }
    case "RESET_SUCCESS":
      return {
        ...state,
        success: null,
      }
    case 'RECENT_SALE_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state;
  }
}



// single sale reducer
export const singleSaleReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_SINGLE_SALE_PENDING':
      return {
        ...state,
        loading: true,
      }
    case 'GET_SINGLE_SALE_FULFILLED':
      return {
        ...state,
        loading: false,
        sale: action.payload,
      }
    case "RESET_SUCCESS":
      return {
        ...state,
        success: null,
      }
    case 'GET_SINGLE_SALE_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state;
  }
}
export const saleListReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SALE_LIST_PENDING':
      return {
        ...state,
        loading: true,
      }
    case 'SALE_LIST_FULFILLED':
      return {
        ...state,
        loading: false,
        sales: action.payload,
      }
    case "RESET_SUCCESS":
      return {
        ...state,
        success: null,
      }
    case 'SALE_LIST_REJECTED':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state;
  }
}

