import {
  UPDATE_PERMISSION,
  UPDATE_PERMISSION_SUCCESS,
  UPDATE_PERMISSION_FAILURE,
} from '../../actions/permission/updatePermission'

export const UPDATE_PERMISSION_DEFAULT_STATE = {
  loading: false,
  error: null,
  permission: null,
}

export default function updatePermission(state = UPDATE_PERMISSION_DEFAULT_STATE, action) {
  switch (action.type) {
    case UPDATE_PERMISSION: {
      return {
        ...state,
        loading: true,
      }
    }
    case UPDATE_PERMISSION_SUCCESS: {
      return {
        ...state,
        permission: action.result,
        loading: false,
      }
    }
    case UPDATE_PERMISSION_FAILURE: {
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