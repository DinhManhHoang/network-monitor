import {
  ADD_WEBSITE,
  ADD_WEBSITE_SUCCESS,
  ADD_WEBSITE_FAILURE,
} from '../../actions/website/addWebsite'

export const ADD_WEBSITE_DEFAULT_STATE = {
  loading: false,
  error: null,
  website: null,
}

export default function addWebsite(state = ADD_WEBSITE_DEFAULT_STATE, action) {
  switch (action.type) {
    case ADD_WEBSITE: {
      return {
        ...state,
        loading: true,
      }
    }
    case ADD_WEBSITE_SUCCESS: {
      return {
        ...state,
        website: action.result,
        loading: false,
      }
    }
    case ADD_WEBSITE_FAILURE: {
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