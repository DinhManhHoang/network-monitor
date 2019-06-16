export const UPDATE_PERMISSION = 'UPDATE_PERMISSION'
export const UPDATE_PERMISSION_SUCCESS = 'UPDATE_PERMISSION_SUCCESS'
export const UPDATE_PERMISSION_FAILURE = 'UPDATE_PERMISSION_FAILURE'

export function updatePermission(options) {
  return {
    type: UPDATE_PERMISSION,
    options,
  }
}

export function updatePermissionSuccess(result) {
  return {
    type: UPDATE_PERMISSION_SUCCESS,
    result,
  }
}

export function updatePermissionFailure(error) {
  return {
    type: UPDATE_PERMISSION_FAILURE,
    error,
  }
}
