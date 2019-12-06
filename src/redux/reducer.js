const LOGIN_SUCCESSFULLY = 'LOGIN_SUCCESSFULLY';
const LOGIN_ERROR = 'LOGIN_ERROR';

export function login(email, password) {
  return dispatch => {
    dispatch(loginSuccess(false));
    dispatch(loginError(null));

    callLogin(email, password, error => {
      if (!error) {
        dispatch(loginSuccess(true));
      } else {
        dispatch(loginError(error));
      }
    });
  }
}

function loginSuccess(isLoginSuccess) {
  return {
    type: LOGIN_SUCCESSFULLY,
    isLoginSuccess
  };
}

function loginError(loginError) {
  return {
    type: LOGIN_ERROR,
    loginError
  }
}

function callLogin(email, password, callback) {
    if (email === 'hruday@gmail.com' && password === 'hruday123') {
      return callback(null);
    } else {
      return callback(new Error('Provide a valid email and password'));
    }
}

export default function reducer(state = {
  isLoginPending: false,
  loginError: null
}, action) {
  switch (action.type) {
 case LOGIN_SUCCESSFULLY:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError
      });

    default:
      return state;
  }
}