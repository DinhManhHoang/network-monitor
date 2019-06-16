export const UPDATE_ALERT_GROUP = 'UPDATE_ALERT_GROUP'
export const UPDATE_ALERT_GROUP_SUCCESS = 'UPDATE_ALERT_GROUP_SUCCESS'
export const UPDATE_ALERT_GROUP_FAILURE = 'UPDATE_ALERT_GROUP_FAILURE'

export function updateAlertGroup(options) {
  return {
    type: UPDATE_ALERT_GROUP,
    options,
  }
}

export function updateAlertGroupSuccess(result) {
  return {
    type: UPDATE_ALERT_GROUP_SUCCESS,
    result,
  }
}

export function updateAlertGroupFailure(error) {
  return {
    type: UPDATE_ALERT_GROUP_FAILURE,
    error,
  }
}
