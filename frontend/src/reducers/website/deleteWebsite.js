import {
  DELETE_WEBSITE,
  DELETE_WEBSITE_SUCCESS,
  DELETE_WEBSITE_FAILURE,
} from '../../actions/website/deleteWebsite'

export const DELETE_WEBSITE_DEFAULT_STATE = {
  loading: false,
  error: null,
  website: null,
}

export default function deleteWebsite(state = DELETE_WEBSITE_DEFAULT_STATE, action) {
  switch (action.type) {
    case DELETE_WEBSITE: {
      return {
        ...state,
        loading: true,
      }
    }
    case DELETE_WEBSITE_SUCCESS: {
      return {
        ...state,
        website: action.result,
        loading: false,
      }
    }
    case DELETE_WEBSITE_FAILURE: {
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