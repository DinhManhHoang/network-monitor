export const DELETE_WEBSITE = 'DELETE_WEBSITE'
export const DELETE_WEBSITE_SUCCESS = 'DELETE_WEBSITE_SUCCESS'
export const DELETE_WEBSITE_FAILURE = 'DELETE_WEBSITE_FAILURE'

export function deleteWebsite(options) {
  return {
    type: DELETE_WEBSITE,
    options,
  }
}

export function deleteWebsiteSuccess(result) {
  return {
    type: DELETE_WEBSITE_SUCCESS,
    result,
  }
}

export function deleteWebsiteFailure(error) {
  return {
    type: DELETE_WEBSITE_FAILURE,
    error,
  }
}
