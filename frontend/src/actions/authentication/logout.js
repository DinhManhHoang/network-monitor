export const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export function logout(options) {
  return {
    type: LOGOUT,
    options,
  }
}

export function logoutSuccess(result) {
  return {
    type: LOGOUT_SUCCESS,
    result,
  }
}

export function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    error,
  }
}
