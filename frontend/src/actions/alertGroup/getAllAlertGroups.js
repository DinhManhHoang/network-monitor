export const GET_ALL_ALERT_GROUPS = 'GET_ALL_ALERT_GROUPS'
export const GET_ALL_ALERT_GROUPS_SUCCESS = 'GET_ALL_ALERT_GROUPS_SUCCESS'
export const GET_ALL_ALERT_GROUPS_FAILURE = 'GET_ALL_ALERT_GROUPS_FAILURE'

export function getAllAlertGroups(options) {
  return {
    type: GET_ALL_ALERT_GROUPS,
    options,
  }
}

export function getAllAlertGroupsSuccess(result) {
  return {
    type: GET_ALL_ALERT_GROUPS_SUCCESS,
    result,
  }
}

export function getAllAlertGroupsFailure(error) {
  return {
    type: GET_ALL_ALERT_GROUPS_FAILURE,
    error,
  }
}
