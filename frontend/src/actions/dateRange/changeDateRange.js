export const CHANGE_DATE_RANGE = 'CHANGE_DATE_RANGE'

export function changeDateRange(dateRange) {
  return {
    type: CHANGE_DATE_RANGE,
    dateRange,
  }
}