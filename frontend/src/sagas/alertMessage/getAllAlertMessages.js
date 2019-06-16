import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { getAllAlertMessagesSuccess, getAllAlertMessagesFailure } from '../../actions/alertMessage/getAllAlertMessages';
import rootConfig from '../rootConfig';

async function getAllAlertMessagesAPI(options) {
  try {
    let params = {
      groupDetails: 'true',
    }
    const config = {
      ...rootConfig,
      url: '/api/alertMessages',
      method: 'get',
      params,
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* getAllAlertMessages(action) {
  try {
    const result = yield call(getAllAlertMessagesAPI, action.options)
    yield put(getAllAlertMessagesSuccess(result))
  } catch (error) {
    yield put(getAllAlertMessagesFailure(error))
  }
}

export default getAllAlertMessages