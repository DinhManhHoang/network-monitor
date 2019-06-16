import {
  CHANGE_CITY
} from '../../actions/city/changeCity'

export const CHANGE_CITY_DEFAULT_STATE = {
  city: 0,
}

export default function changeCity(state = CHANGE_CITY_DEFAULT_STATE, action) {
  switch (action.type) {
    case CHANGE_CITY: {
      return {
        ...state,
        city: action.city,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}