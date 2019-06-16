import {
  COUNT_LOG,
  COUNT_LOG_SUCCESS,
  COUNT_LOG_FAILURE,
} from '../../actions/log/countLog'

export const COUNT_LOG_DEFAULT_STATE = {
  loading: false,
  error: null,
  result: [],
}

export default function countLog(state = COUNT_LOG_DEFAULT_STATE, action) {
  switch (action.type) {
    case COUNT_LOG: {
      return {
        ...state,
        loading: true,
      }
    }
    case COUNT_LOG_SUCCESS: {
      return {
        ...state,
        result: action.result,
        loading: false,
      }
    }
    case COUNT_LOG_FAILURE: {
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