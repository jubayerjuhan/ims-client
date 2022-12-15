import client from "../../API/client.js";

export const addExpense = (sale) => async (dispatch) => {
  try {
    dispatch({ type: 'ADD_EXPENSE_PENDING' })
    const { data } = await client.post('/expense/new', sale);
    dispatch({ type: 'ADD_EXPENSE_FULFILLED', payload: data.success });

  } catch (err) {
    dispatch({ type: 'ADD_EXPENSE_REJECTED', payload: err?.response?.data?.message || err.message })
  }
}
export const getExpenses = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_EXPENSE_PENDING' })
    const { data } = await client.get('/expense/all');
    dispatch({ type: 'GET_EXPENSE_FULFILLED', payload: data.expense });
  } catch (err) {
    dispatch({ type: 'GET_EXPENSE_REJECTED', payload: err?.response?.data?.message || err.message })
  }
}