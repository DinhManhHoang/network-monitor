export const COUNT_LOG = 'COUNT_LOG'
export const COUNT_LOG_SUCCESS = 'COUNT_LOG_SUCCESS'
export const COUNT_LOG_FAILURE = 'COUNT_LOG_FAILURE'

export function countLog(options) {
  return {
    type: COUNT_LOG,
    options,
  }
}

export function countLogSuccess(result) {
  return {
    type: COUNT_LOG_SUCCESS,
    result,
  }
}

export function countLogFailure(error) {
  return {
    type: COUNT_LOG_FAILURE,
    error,
  }
}
