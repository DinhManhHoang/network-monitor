import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { getAllAlertGroupsSuccess, getAllAlertGroupsFailure } from '../../actions/alertGroup/getAllAlertGroups';
import rootConfig from '../rootConfig';

async function getAllAlertGroupsAPI(options) {
  try {
    let params = {
      accounts: 'true',
    }
    const config = {
      ...rootConfig,
      url: '/api/alertGroups',
      method: 'get',
      params,
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* getAllAlertGroups(action) {
  try {
    const result = yield call(getAllAlertGroupsAPI, action.options)
    yield put(getAllAlertGroupsSuccess(result))
  } catch (error) {
    yield put(getAllAlertGroupsFailure(error))
  }
}

export default getAllAlertGroups