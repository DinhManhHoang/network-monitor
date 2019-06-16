export const CHANGE_CITY = 'CHANGE_CITY'

export function changeCity(city) {
  return {
    type: CHANGE_CITY,
    city,
  }
}
