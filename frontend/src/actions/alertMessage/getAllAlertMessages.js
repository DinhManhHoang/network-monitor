export const GET_ALL_ALERT_MESSAGES = 'GET_ALL_ALERT_MESSAGES'
export const GET_ALL_ALERT_MESSAGES_SUCCESS = 'GET_ALL_ALERT_MESSAGES_SUCCESS'
export const GET_ALL_ALERT_MESSAGES_FAILURE = 'GET_ALL_ALERT_MESSAGES_FAILURE'

export function getAllAlertMessages(options) {
  return {
    type: GET_ALL_ALERT_MESSAGES,
    options,
  }
}

export function getAllAlertMessagesSuccess(result) {
  return {
    type: GET_ALL_ALERT_MESSAGES_SUCCESS,
    result,
  }
}

export function getAllAlertMessagesFailure(error) {
  return {
    type: GET_ALL_ALERT_MESSAGES_FAILURE,
    error,
  }
}
