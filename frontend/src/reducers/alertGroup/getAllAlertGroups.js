import {
  GET_ALL_ALERT_GROUPS,
  GET_ALL_ALERT_GROUPS_SUCCESS,
  GET_ALL_ALERT_GROUPS_FAILURE,
} from '../../actions/alertGroup/getAllAlertGroups'

export const GET_ALL_ALERT_GROUPS_DEFAULT_STATE = {
  loading: false,
  error: null,
  alertGroups: [],
}

export default function getAllAlertGroups(state = GET_ALL_ALERT_GROUPS_DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_ALL_ALERT_GROUPS: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_ALL_ALERT_GROUPS_SUCCESS: {
      return {
        ...state,
        alertGroups: action.result,
        loading: false,
      }
    }
    case GET_ALL_ALERT_GROUPS_FAILURE: {
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