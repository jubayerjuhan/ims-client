import client from "../../API/client.js";
import moment from 'moment';

export const addSale = (sale) => async (dispatch) => {
  try {
    dispatch({ type: 'ADD_SALE_PENDING' })
    const { data } = await client.post('/sale/new', sale);
    dispatch({ type: 'ADD_SALE_FULFILLED', payload: data });
    dispatch({ type: 'RECENT_SALE_FULFILLED', payload: data });


  } catch (err) {
    dispatch({ type: 'ADD_SALE_REJECTED', payload: err?.response?.data?.message || err.message })
  }
}

export const getSales = (fromDate, toDate) => async (dispatch) => {
  const fromDateStr = moment(fromDate).format('YYYY-MM-DD');
  const toDateStr = moment(toDate).format('YYYY-MM-DD')
  const todayDate = moment(Date.now()).format('YYYY-MM-DD')

  try {
    dispatch({ type: 'GET_SALE_PENDING' })
    if ((fromDateStr === todayDate) && (toDateStr === todayDate)) {
      const { data } = await client.post(`/sale/all?today=true`);
      return dispatch({ type: 'GET_SALE_FULFILLED', payload: data.sale });
    }
    const { data } = await client.post(`/sale/all`, {
      date: {
        fromDate,
        toDate,
      }
    });

    dispatch({ type: 'GET_SALE_FULFILLED', payload: data.sale });

  } catch (err) {
    dispatch({ type: 'GET_SALE_REJECTED', payload: err?.response?.data?.message || err.message })
  }
}



export const getSingleSale = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'GET_SINGLE_SALE_PENDING' })
    const { data } = await client.get(`/sale/${id}`);
    dispatch({ type: 'GET_SINGLE_SALE_FULFILLED', payload: data.sale });
  } catch (err) {
    dispatch({ type: 'GET_SINGLE_SALE_REJECTED', payload: err?.response?.data?.message || err.message })
  }
}