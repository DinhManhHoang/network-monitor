import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { loginSuccess, loginFailure } from '../../actions/authentication/login';
import { logoutSuccess, logoutFailure } from '../../actions/authentication/logout';
import { registerSuccess, registerFailure } from '../../actions/authentication/register';
import rootConfig from '../rootConfig';

import socket from '../../socket';
import { CREATE } from '../../socket/accounts';

async function loginAPI(options) {
  try {
    let params = {
      group: 'true',
      permission: 'true',
    }
    const config = {
      ...rootConfig,
      url: '/api/authentications/login',
      method: 'post',
      data: options,
      params,
    }
    const result = await axios(config)
    if (typeof result.data === 'string') {
      throw new Error(result.data)
    }
    return result.data
  } catch (error) {
    throw error
  }
}

export function* login(action) {
  try {
    const result = yield call(loginAPI, action.options)
    yield put(loginSuccess(result))
    sessionStorage.setItem('NETWORK_MONITOR_AUTH', JSON.stringify(result))
  } catch (error) {
    sessionStorage.removeItem('NETWORK_MONITOR_AUTH')
    yield put(loginFailure(error))
  }
}

async function logoutAPI(options) {
  try {
    const config = {
      ...rootConfig,
      url: '/api/authentications/logout',
      method: 'get',
      data: options,
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

export function* logout(action) {
  try {
    const result = yield call(logoutAPI, action.options)
    yield put(logoutSuccess(result))
    sessionStorage.removeItem('NETWORK_MONITOR_AUTH')
  } catch (error) {
    yield put(logoutFailure(error))
  }
}

async function registerAPI(options) {
  try {
    const config = {
      ...rootConfig,
      url: '/api/authentications/register',
      method: 'post',
      data: options,
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

export function* register(action) {
  try {
    const result = yield call(registerAPI, action.options)
    socket.emit(CREATE)
    yield put(registerSuccess(result))
  } catch (error) {
    yield put(registerFailure(error))
  }
}