import {
  GET_ALL_ACCOUNTS,
  GET_ALL_ACCOUNTS_SUCCESS,
  GET_ALL_ACCOUNTS_FAILURE,
} from '../../actions/account/getAllAccounts'

export const GET_ALL_ACCOUNTS_DEFAULT_STATE = {
  loading: false,
  error: null,
  accounts: [],
}

export default function getAllAccounts(state = GET_ALL_ACCOUNTS_DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_ALL_ACCOUNTS: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_ALL_ACCOUNTS_SUCCESS: {
      return {
        ...state,
        accounts: action.result,
        loading: false,
      }
    }
    case GET_ALL_ACCOUNTS_FAILURE: {
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