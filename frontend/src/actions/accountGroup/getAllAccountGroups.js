export const GET_ALL_ACCOUNT_GROUPS = 'GET_ALL_ACCOUNT_GROUPS'
export const GET_ALL_ACCOUNT_GROUPS_SUCCESS = 'GET_ALL_ACCOUNT_GROUPS_SUCCESS'
export const GET_ALL_ACCOUNT_GROUPS_FAILURE = 'GET_ALL_ACCOUNT_GROUPS_FAILURE'

export function getAllAccountGroups(options) {
  return {
    type: GET_ALL_ACCOUNT_GROUPS,
    options,
  }
}

export function getAllAccountGroupsSuccess(result) {
  return {
    type: GET_ALL_ACCOUNT_GROUPS_SUCCESS,
    result,
  }
}

export function getAllAccountGroupsFailure(error) {
  return {
    type: GET_ALL_ACCOUNT_GROUPS_FAILURE,
    error,
  }
}
