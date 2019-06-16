export const GET_ALL_WEBSITES = 'GET_ALL_WEBSITES'
export const GET_ALL_WEBSITES_SUCCESS = 'GET_ALL_WEBSITES_SUCCESS'
export const GET_ALL_WEBSITES_FAILURE = 'GET_ALL_WEBSITES_FAILURE'

export function getAllWebsites(options) {
  return {
    type: GET_ALL_WEBSITES,
    options,
  }
}

export function getAllWebsitesSuccess(result) {
  return {
    type: GET_ALL_WEBSITES_SUCCESS,
    result,
  }
}

export function getAllWebsitesFailure(error) {
  return {
    type: GET_ALL_WEBSITES_FAILURE,
    error,
  }
}
