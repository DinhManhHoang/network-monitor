export const ADD_ALERT_GROUP = 'ADD_ALERT_GROUP'
export const ADD_ALERT_GROUP_SUCCESS = 'ADD_ALERT_GROUP_SUCCESS'
export const ADD_ALERT_GROUP_FAILURE = 'ADD_ALERT_GROUP_FAILURE'

export function addAlertGroup(options) {
  return {
    type: ADD_ALERT_GROUP,
    options,
  }
}

export function addAlertGroupSuccess(result) {
  return {
    type: ADD_ALERT_GROUP_SUCCESS,
    result,
  }
}

export function addAlertGroupFailure(error) {
  return {
    type: ADD_ALERT_GROUP_FAILURE,
    error,
  }
}
