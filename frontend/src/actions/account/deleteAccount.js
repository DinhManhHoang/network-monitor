export const DELETE_ACCOUNT = 'DELETE_ACCOUNT'
export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS'
export const DELETE_ACCOUNT_FAILURE = 'DELETE_ACCOUNT_FAILURE'

export function deleteAccount(options) {
  return {
    type: DELETE_ACCOUNT,
    options,
  }
}

export function deleteAccountSuccess(result) {
  return {
    type: DELETE_ACCOUNT_SUCCESS,
    result,
  }
}

export function deleteAccountFailure(error) {
  return {
    type: DELETE_ACCOUNT_FAILURE,
    error,
  }
}
