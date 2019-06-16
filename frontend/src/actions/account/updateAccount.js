export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
export const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS'
export const UPDATE_ACCOUNT_FAILURE = 'UPDATE_ACCOUNT_FAILURE'

export function updateAccount(options) {
  return {
    type: UPDATE_ACCOUNT,
    options,
  }
}

export function updateAccountSuccess(result) {
  return {
    type: UPDATE_ACCOUNT_SUCCESS,
    result,
  }
}

export function updateAccountFailure(error) {
  return {
    type: UPDATE_ACCOUNT_FAILURE,
    error,
  }
}
