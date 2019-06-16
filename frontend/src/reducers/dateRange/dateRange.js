import {
  CHANGE_DATE_RANGE
} from '../../actions/dateRange/changeDateRange'

export const DATE_RANGE_DEFAULT_STATE = {
  startDate: null,
  endDate: null,
}

export default function dateRange(state = DATE_RANGE_DEFAULT_STATE, action) {
  switch (action.type) {
    case CHANGE_DATE_RANGE: {
      return {
        ...state,
        startDate: action.dateRange.startDate,
        endDate: action.dateRange.endDate,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}