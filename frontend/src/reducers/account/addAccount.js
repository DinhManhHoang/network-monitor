import {
  ADD_ACCOUNT,
  ADD_ACCOUNT_SUCCESS,
  ADD_ACCOUNT_FAILURE,
} from '../../actions/account/addAccount'

export const ADD_ACCOUNT_DEFAULT_STATE = {
  loading: false,
  error: null,
  account: null,
}

export default function addAccount(state = ADD_ACCOUNT_DEFAULT_STATE, action) {
  switch (action.type) {
    case ADD_ACCOUNT: {
      return {
        ...state,
        loading: true,
      }
    }
    case ADD_ACCOUNT_SUCCESS: {
      return {
        ...state,
        account: action.result,
        loading: false,
      }
    }
    case ADD_ACCOUNT_FAILURE: {
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