export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export function login(options) {
  return {
    type: LOGIN,
    options,
  }
}

export function loginSuccess(result) {
  return {
    type: LOGIN_SUCCESS,
    result,
  }
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  }
}
