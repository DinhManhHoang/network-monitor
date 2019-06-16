import {
  GET_ALL_LOG_TYPES,
  GET_ALL_LOG_TYPES_SUCCESS,
  GET_ALL_LOG_TYPES_FAILURE,
} from '../../actions/logType/getAllLogTypes'

export const GET_ALL_LOG_TYPES_DEFAULT_STATE = {
  loading: false,
  error: null,
  logTypes: [],
}

export default function getAllCities(state = GET_ALL_LOG_TYPES_DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_ALL_LOG_TYPES: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_ALL_LOG_TYPES_SUCCESS: {
      return {
        ...state,
        logTypes: action.result,
        loading: false,
      }
    }
    case GET_ALL_LOG_TYPES_FAILURE: {
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}