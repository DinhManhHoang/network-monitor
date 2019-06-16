import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { getAllLogsSuccess, getAllLogsFailure } from '../../actions/log/getAllLogs';
import rootConfig from '../rootConfig';

async function getAllLogsAPI(options) {
  try {
    let params = {
      cityDetails: 'true',
      typeDetails: 'true',
    }
    const { type, city, startDate, endDate, page, rowsPerPage } = options
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
    if ((page != null) && (rowsPerPage != null)) {
      params = { ...params, page, rowsPerPage }
    }
    const config = {
      ...rootConfig,
      url: '/api/logs',
      method: 'get',
      params,
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* getAllLogs(action) {
  try {
    const result = yield call(getAllLogsAPI, action.options)
    yield put(getAllLogsSuccess(result))
  } catch (error) {
    yield put(getAllLogsFailure(error))
  }
}

export default getAllLogs