import {
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
} from '../../actions/account/deleteAccount'

export const DELETE_ACCOUNT_DEFAULT_STATE = {
  loading: false,
  error: null,
  account: null,
}

export default function deleteAccount(state = DELETE_ACCOUNT_DEFAULT_STATE, action) {
  switch (action.type) {
    case DELETE_ACCOUNT: {
      return {
        ...state,
        loading: true,
      }
    }
    case DELETE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        account: action.result,
        loading: false,
      }
    }
    case DELETE_ACCOUNT_FAILURE: {
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