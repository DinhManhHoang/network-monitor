import {
  UPDATE_WEBSITE,
  UPDATE_WEBSITE_SUCCESS,
  UPDATE_WEBSITE_FAILURE,
} from '../../actions/website/updateWebsite'

export const UPDATE_WEBSITE_DEFAULT_STATE = {
  loading: false,
  error: null,
  website: null,
}

export default function updateWebsite(state = UPDATE_WEBSITE_DEFAULT_STATE, action) {
  switch (action.type) {
    case UPDATE_WEBSITE: {
      return {
        ...state,
        loading: true,
      }
    }
    case UPDATE_WEBSITE_SUCCESS: {
      return {
        ...state,
        website: action.result,
        loading: false,
      }
    }
    case UPDATE_WEBSITE_FAILURE: {
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