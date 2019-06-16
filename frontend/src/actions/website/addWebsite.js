export const ADD_WEBSITE = 'ADD_WEBSITE'
export const ADD_WEBSITE_SUCCESS = 'ADD_WEBSITE_SUCCESS'
export const ADD_WEBSITE_FAILURE = 'ADD_WEBSITE_FAILURE'

export function addWebsite(options) {
  return {
    type: ADD_WEBSITE,
    options,
  }
}

export function addWebsiteSuccess(result) {
  return {
    type: ADD_WEBSITE_SUCCESS,
    result,
  }
}

export function addWebsiteFailure(error) {
  return {
    type: ADD_WEBSITE_FAILURE,
    error,
  }
}
