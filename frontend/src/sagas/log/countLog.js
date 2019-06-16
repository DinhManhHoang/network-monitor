import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { countLogSuccess, countLogFailure } from '../../actions/log/countLog';
import rootConfig from '../rootConfig';

async function countLogAPI(options) {
  try {
    let params = {
      cityDetails: 'true',
      typeDetails: 'true',
    }
    const { type, city, startDate, endDate } = options
    if (type != null) {
      params = { ...params, type }
    }
    if (city != null) {
      params = { ...params, city }
    }
    if (startDate != null) {
      params = { ...params, start: startDate.getTime() }
    }
    if (endDate != null) {
      params = { ...params, end: endDate.getTime() }
    }
    const config = {
      ...rootConfig,
      url: '/api/logs/countLog',
      method: 'get',
      params,
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* countLog(action) {
  try {
    const result = yield call(countLogAPI, action.options)
    yield put(countLogSuccess(result))
  } catch (error) {
    yield put(countLogFailure(error))
  }
}

export default countLog