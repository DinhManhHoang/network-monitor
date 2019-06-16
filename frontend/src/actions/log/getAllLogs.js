export const GET_ALL_LOGS = 'GET_ALL_LOGS'
export const GET_ALL_LOGS_SUCCESS = 'GET_ALL_LOGS_SUCCESS'
export const GET_ALL_LOGS_FAILURE = 'GET_ALL_LOGS_FAILURE'

export function getAllLogs(options) {
  return {
    type: GET_ALL_LOGS,
    options,
  }
}

export function getAllLogsSuccess(result) {
  return {
    type: GET_ALL_LOGS_SUCCESS,
    result,
  }
}

export function getAllLogsFailure(error) {
  return {
    type: GET_ALL_LOGS_FAILURE,
    error,
  }
}
