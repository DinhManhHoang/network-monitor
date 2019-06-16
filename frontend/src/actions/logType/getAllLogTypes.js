export const GET_ALL_LOG_TYPES = 'GET_ALL_LOG_TYPES'
export const GET_ALL_LOG_TYPES_SUCCESS = 'GET_ALL_LOG_TYPES_SUCCESS'
export const GET_ALL_LOG_TYPES_FAILURE = 'GET_ALL_LOG_TYPES_FAILURE'

export function getAllLogTypes(options) {
  return {
    type: GET_ALL_LOG_TYPES,
    options,
  }
}

export function getAllLogTypesSuccess(result) {
  return {
    type: GET_ALL_LOG_TYPES_SUCCESS,
    result,
  }
}

export function getAllLogTypesFailure(error) {
  return {
    type: GET_ALL_LOG_TYPES_FAILURE,
    error,
  }
}
