export const REGISTER = 'REGISTER'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

export function register(options) {
  return {
    type: REGISTER,
    options,
  }
}

export function registerSuccess(result) {
  return {
    type: REGISTER_SUCCESS,
    result,
  }
}

export function registerFailure(error) {
  return {
    type: REGISTER_FAILURE,
    error,
  }
}
