export const UPDATE_WEBSITE = 'UPDATE_WEBSITE'
export const UPDATE_WEBSITE_SUCCESS = 'UPDATE_WEBSITE_SUCCESS'
export const UPDATE_WEBSITE_FAILURE = 'UPDATE_WEBSITE_FAILURE'

export function updateWebsite(options) {
  return {
    type: UPDATE_WEBSITE,
    options,
  }
}

export function updateWebsiteSuccess(result) {
  return {
    type: UPDATE_WEBSITE_SUCCESS,
    result,
  }
}

export function updateWebsiteFailure(error) {
  return {
    type: UPDATE_WEBSITE_FAILURE,
    error,
  }
}
