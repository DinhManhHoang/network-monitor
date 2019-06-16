import {
  ADD_ALERT_GROUP,
  ADD_ALERT_GROUP_SUCCESS,
  ADD_ALERT_GROUP_FAILURE,
} from '../../actions/alertGroup/addAlertGroup'

export const ADD_ALERT_GROUP_DEFAULT_STATE = {
  loading: false,
  error: null,
  alertGroup: null,
}

export default function addAlertGroup(state = ADD_ALERT_GROUP_DEFAULT_STATE, action) {
  switch (action.type) {
    case ADD_ALERT_GROUP: {
      return {
        ...state,
        loading: true,
      }
    }
    case ADD_ALERT_GROUP_SUCCESS: {
      return {
        ...state,
        alertGroup: action.result,
        loading: false,
      }
    }
    case ADD_ALERT_GROUP_FAILURE: {
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