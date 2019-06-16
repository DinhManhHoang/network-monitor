export const GET_ALL_CITIES = 'GET_ALL_CITIES'
export const GET_ALL_CITIES_SUCCESS = 'GET_ALL_CITIES_SUCCESS'
export const GET_ALL_CITIES_FAILURE = 'GET_ALL_CITIES_FAILURE'

export function getAllCities(options) {
  return {
    type: GET_ALL_CITIES,
    options,
  }
}

export function getAllCitiesSuccess(result) {
  return {
    type: GET_ALL_CITIES_SUCCESS,
    result,
  }
}

export function getAllCitiesFailure(error) {
  return {
    type: GET_ALL_CITIES_FAILURE,
    error,
  }
}
