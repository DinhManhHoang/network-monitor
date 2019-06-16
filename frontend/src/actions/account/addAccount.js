export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const ADD_ACCOUNT_SUCCESS = 'ADD_ACCOUNT_SUCCESS'
export const ADD_ACCOUNT_FAILURE = 'ADD_ACCOUNT_FAILURE'

export function addAccount(options) {
  return {
    type: ADD_ACCOUNT,
    options,
  }
}

export function addAccountSuccess(result) {
  return {
    type: ADD_ACCOUNT_SUCCESS,
    result,
  }
}

export function addAccountFailure(error) {
  return {
    type: ADD_ACCOUNT_FAILURE,
    error,
  }
}
