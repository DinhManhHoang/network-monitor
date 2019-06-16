export const DELETE_ALERT_GROUP = 'DELETE_ALERT_GROUP'
export const DELETE_ALERT_GROUP_SUCCESS = 'DELETE_ALERT_GROUP_SUCCESS'
export const DELETE_ALERT_GROUP_FAILURE = 'DELETE_ALERT_GROUP_FAILURE'

export function deleteAlertGroup(options) {
  return {
    type: DELETE_ALERT_GROUP,
    options,
  }
}

export function deleteAlertGroupSuccess(result) {
  return {
    type: DELETE_ALERT_GROUP_SUCCESS,
    result,
  }
}

export function deleteAlertGroupFailure(error) {
  return {
    type: DELETE_ALERT_GROUP_FAILURE,
    error,
  }
}
