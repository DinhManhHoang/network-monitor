import {
  GET_ALL_WEBSITES,
  GET_ALL_WEBSITES_SUCCESS,
  GET_ALL_WEBSITES_FAILURE,
} from '../../actions/website/getAllWebsites'

export const GET_ALL_WEBSITES_DEFAULT_STATE = {
  loading: false,
  error: null,
  websites: [],
}

export default function getAllWebsites(state = GET_ALL_WEBSITES_DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_ALL_WEBSITES: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_ALL_WEBSITES_SUCCESS: {
      return {
        ...state,
        websites: action.result,
        loading: false,
      }
    }
    case GET_ALL_WEBSITES_FAILURE: {
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