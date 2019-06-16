import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { addAlertGroupSuccess, addAlertGroupFailure } from '../../actions/alertGroup/addAlertGroup';
import rootConfig from '../rootConfig';

import socket from '../../socket';
import { CREATE } from '../../socket/alertGroups';

async function addAlertGroupAPI(options) {
  try {
    const config = {
      ...rootConfig,
      url: '/api/alertGroups',
      method: 'post',
      data: options,
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* addAlertGroup(action) {
  try {
    const result = yield call(addAlertGroupAPI, action.options)
    socket.emit(CREATE)
    yield put(addAlertGroupSuccess(result))
  } catch (error) {
    yield put(addAlertGroupFailure(error))
  }
}

export default addAlertGroup