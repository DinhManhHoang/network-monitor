export const GET_ALL_ACCOUNTS = 'GET_ALL_ACCOUNTS'
export const GET_ALL_ACCOUNTS_SUCCESS = 'GET_ALL_ACCOUNTS_SUCCESS'
export const GET_ALL_ACCOUNTS_FAILURE = 'GET_ALL_ACCOUNTS_FAILURE'

export function getAllAccounts(options) {
  return {
    type: GET_ALL_ACCOUNTS,
    options,
  }
}

export function getAllAccountsSuccess(result) {
  return {
    type: GET_ALL_ACCOUNTS_SUCCESS,
    result,
  }
}

export function getAllAccountsFailure(error) {
  return {
    type: GET_ALL_ACCOUNTS_FAILURE,
    error,
  }
}
