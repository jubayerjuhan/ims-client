import client from "../../API/client.js";

export const registerUser = (registerinfo) => async (dispatch) => {
  try {
    dispatch({ type: 'REGISTER_USER_PENDING' });
    const { data } = await client.post('/sign-up', registerinfo);

    dispatch({ type: 'REGISTER_USER_FULFILLED', payload: data });
    localStorage.setItem('token', JSON.stringify({ expiry: Date.now() + 3 * 24 * 60 * 60 * 1000, token: data.token }));
  }
  catch (err) {
    dispatch({
      type: 'REGISTER_USER_REJECTED', payload: err.response.data.message
    })
  }
}


export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: 'LOAD_USER_PENDING' });
    const { data } = await client.get('/me');
    dispatch({ type: 'LOAD_USER_FULFILLED', payload: data });
    dispatch({ type: "RESET_SUCCESS" });
  }
  catch (err) {
    dispatch({ type: 'LOAD_USER_REJECTED', payload: err?.response?.data?.message || err.message });
  }
}


export const loginUser = (logindata) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_USER_PENDING' })
    const { data } = await client.post('/login', logindata);
    dispatch({ type: 'LOGIN_USER_FULFILLED', payload: data });
    localStorage.setItem('token', JSON.stringify({ expiry: Date.now() + 3 * 24 * 60 * 60 * 1000, token: data.token }));
  } catch (err) {
    dispatch({ type: 'LOGIN_USER_REJECTED', payload: err?.response?.data?.message || err.message })
  }
}