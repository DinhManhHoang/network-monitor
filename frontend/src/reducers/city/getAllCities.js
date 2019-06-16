import {
  GET_ALL_CITIES,
  GET_ALL_CITIES_SUCCESS,
  GET_ALL_CITIES_FAILURE,
} from '../../actions/city/getAllCities'

export const GET_ALL_CITIES_DEFAULT_STATE = {
  loading: false,
  error: null,
  cities: [],
}

export default function getAllCities(state = GET_ALL_CITIES_DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_ALL_CITIES: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_ALL_CITIES_SUCCESS: {
      return {
        ...state,
        cities: action.result,
        loading: false,
      }
    }
    case GET_ALL_CITIES_FAILURE: {
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