import {
  UPDATE_ALERT_GROUP,
  UPDATE_ALERT_GROUP_SUCCESS,
  UPDATE_ALERT_GROUP_FAILURE,
} from '../../actions/alertGroup/updateAlertGroup'

export const UPDATE_ALERT_GROUP_DEFAULT_STATE = {
  loading: false,
  error: null,
  alertGroup: null,
}

export default function updateAlertGroup(state = UPDATE_ALERT_GROUP_DEFAULT_STATE, action) {
  switch (action.type) {
    case UPDATE_ALERT_GROUP: {
      return {
        ...state,
        loading: true,
      }
    }
    case UPDATE_ALERT_GROUP_SUCCESS: {
      return {
        ...state,
        alertGroup: action.result,
        loading: false,
      }
    }
    case UPDATE_ALERT_GROUP_FAILURE: {
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