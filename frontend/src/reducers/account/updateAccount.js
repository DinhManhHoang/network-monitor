import {
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILURE,
} from '../../actions/account/updateAccount'

export const UPDATE_ACCOUNT_DEFAULT_STATE = {
  loading: false,
  error: null,
  account: null,
}

export default function updateAccount(state = UPDATE_ACCOUNT_DEFAULT_STATE, action) {
  switch (action.type) {
    case UPDATE_ACCOUNT: {
      return {
        ...state,
        loading: true,
      }
    }
    case UPDATE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        account: action.result,
        loading: false,
      }
    }
    case UPDATE_ACCOUNT_FAILURE: {
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