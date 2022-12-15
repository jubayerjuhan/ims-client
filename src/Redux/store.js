import { applyMiddleware, combineReducers, createStore } from "redux";
import { userReducer } from "./Reducers/userreducer.js";
import { composeWithDevTools } from "redux-devtools-extension";
import { addCategory, addProductReducer, allCategoryReducer, allProductsReducer, deleteElementReducer, supplierReducer } from '../Redux/Reducers/productreducers.js';
import logger from "redux-logger";
import thunk from 'redux-thunk'
import { categoryNameReducer, categoryProductReducer } from "./Reducers/categoryreducers.js";
import { addSaleReducer, getSaleReducer, recentSaleReducer, singleSaleReducer } from "./Reducers/salereducers.js";
import { addExpenseReducer, getExpenseReducer } from "./Reducers/expensereducer.js";

const reducer = combineReducers({
  // ...
  user: userReducer,
  addProduct: addProductReducer,
  addCategory: addCategory,
  products: allProductsReducer,
  categories: allCategoryReducer,
  categoryProduct: categoryProductReducer,
  addSale: addSaleReducer,
  addExpense: addExpenseReducer,
  expense: getExpenseReducer,
  sales: getSaleReducer,
  categoryName: categoryNameReducer,
  deleteElement: deleteElementReducer,
  recentSale: recentSaleReducer,
  singleSale: singleSaleReducer,
  suppliers: supplierReducer,
});

const middlewares = [thunk, logger];

const store = createStore(reducer, applyMiddleware(...middlewares))


export default store;