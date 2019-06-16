import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../../actions/authentication/login'

import {
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../../actions/authentication/logout'

import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../../actions/authentication/register'

export const AUTHENTICATION_DEFAULT_STATE = {
  loading: false,
  error: null,
  auth: JSON.parse(sessionStorage.getItem('NETWORK_MONITOR_AUTH')) || null,
}

export default function authentication(state = AUTHENTICATION_DEFAULT_STATE, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        loading: true,
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        auth: action.result,
        loading: false,
      }
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        error: action.error,
        auth: null,
        loading: false,
      }
    }
    case LOGOUT: {
      return {
        ...state,
        loading: true,
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        auth: null,
        loading: false,
      }
    }
    case LOGOUT_FAILURE: {
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    }
    case REGISTER: {
      return {
        ...state,
        loading: true,
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
      }
    }
    case REGISTER_FAILURE: {
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