import {
  GET_ALL_ALERT_MESSAGES,
  GET_ALL_ALERT_MESSAGES_SUCCESS,
  GET_ALL_ALERT_MESSAGES_FAILURE,
} from '../../actions/alertMessage/getAllAlertMessages'

export const GET_ALL_ALERT_MESSAGES_DEFAULT_STATE = {
  loading: false,
  error: null,
  alertMessages: [],
}

export default function getAllAlertMessages(state = GET_ALL_ALERT_MESSAGES_DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_ALL_ALERT_MESSAGES: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_ALL_ALERT_MESSAGES_SUCCESS: {
      return {
        ...state,
        alertMessages: action.result,
        loading: false,
      }
    }
    case GET_ALL_ALERT_MESSAGES_FAILURE: {
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