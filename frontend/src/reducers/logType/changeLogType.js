import {
  CHANGE_LOG_TYPE
} from '../../actions/logType/changeLogType'

export const CHANGE_LOG_TYPE_DEFAULT_STATE = {
  logType: 0,
}

export default function changeCity(state = CHANGE_LOG_TYPE_DEFAULT_STATE, action) {
  switch (action.type) {
    case CHANGE_LOG_TYPE: {
      return {
        ...state,
        logType: action.logType,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}