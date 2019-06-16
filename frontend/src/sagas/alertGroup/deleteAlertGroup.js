import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { deleteAlertGroupSuccess, deleteAlertGroupFailure } from '../../actions/alertGroup/deleteAlertGroup';
import rootConfig from '../rootConfig';

import socket from '../../socket';
import { DESTROY } from '../../socket/alertGroups';

async function deleteAlertGroupAPI(options) {
  try {
    const { _id } = options
    const config = {
      ...rootConfig,
      url: `/api/alertGroups/${_id}`,
      method: 'delete',
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* deleteAlertGroup(action) {
  try {
    const result = yield call(deleteAlertGroupAPI, action.options)
    socket.emit(DESTROY)
    yield put(deleteAlertGroupSuccess(result))
  } catch (error) {
    yield put(deleteAlertGroupFailure(error))
  }
}

export default deleteAlertGroup