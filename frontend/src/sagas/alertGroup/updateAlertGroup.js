import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { updateAlertGroupSuccess, updateAlertGroupFailure } from '../../actions/alertGroup/updateAlertGroup';
import rootConfig from '../rootConfig';

import socket from '../../socket';
import { UPDATE } from '../../socket/alertGroups';

async function updateAlertGroupAPI(options) {
  try {
    const { _id, ...data } = options
    const config = {
      ...rootConfig,
      url: `/api/alertGroups/${_id}`,
      method: 'put',
      data: data,
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* updateAlertGroup(action) {
  try {
    const result = yield call(updateAlertGroupAPI, action.options)
    socket.emit(UPDATE)
    yield put(updateAlertGroupSuccess(result))
  } catch (error) {
    yield put(updateAlertGroupFailure(error))
  }
}

export default updateAlertGroup