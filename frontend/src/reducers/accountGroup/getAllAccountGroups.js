import {
  GET_ALL_ACCOUNT_GROUPS,
  GET_ALL_ACCOUNT_GROUPS_SUCCESS,
  GET_ALL_ACCOUNT_GROUPS_FAILURE,
} from '../../actions/accountGroup/getAllAccountGroups'

export const GET_ALL_ACCOUNT_GROUPS_DEFAULT_STATE = {
  loading: false,
  error: null,
  accountGroups: [],
}

export default function getAllAccountGroups(state = GET_ALL_ACCOUNT_GROUPS_DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_ALL_ACCOUNT_GROUPS: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_ALL_ACCOUNT_GROUPS_SUCCESS: {
      return {
        ...state,
        accountGroups: action.result,
        loading: false,
      }
    }
    case GET_ALL_ACCOUNT_GROUPS_FAILURE: {
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