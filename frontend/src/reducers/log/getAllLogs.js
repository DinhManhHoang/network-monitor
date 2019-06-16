import {
  GET_ALL_LOGS,
  GET_ALL_LOGS_SUCCESS,
  GET_ALL_LOGS_FAILURE,
} from '../../actions/log/getAllLogs'

export const GET_ALL_LOGS_DEFAULT_STATE = {
  loading: false,
  error: null,
  logs: [],
  total: 0,
}

export default function getAllLogs(state = GET_ALL_LOGS_DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_ALL_LOGS: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_ALL_LOGS_SUCCESS: {
      return {
        ...state,
        logs: action.result.logs,
        total: action.result.total,
        loading: false,
      }
    }
    case GET_ALL_LOGS_FAILURE: {
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