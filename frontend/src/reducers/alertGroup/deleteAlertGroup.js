import {
  DELETE_ALERT_GROUP,
  DELETE_ALERT_GROUP_SUCCESS,
  DELETE_ALERT_GROUP_FAILURE,
} from '../../actions/alertGroup/deleteAlertGroup'

export const DELETE_ALERT_GROUP_DEFAULT_STATE = {
  loading: false,
  error: null,
  alertGroup: null,
}

export default function deleteAlertGroup(state = DELETE_ALERT_GROUP_DEFAULT_STATE, action) {
  switch (action.type) {
    case DELETE_ALERT_GROUP: {
      return {
        ...state,
        loading: true,
      }
    }
    case DELETE_ALERT_GROUP_SUCCESS: {
      return {
        ...state,
        alertGroup: action.result,
        loading: false,
      }
    }
    case DELETE_ALERT_GROUP_FAILURE: {
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