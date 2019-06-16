import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { updateAccountSuccess, updateAccountFailure } from '../../actions/account/updateAccount';
import rootConfig from '../rootConfig';

import socket from "../../socket";
import { UPDATE } from '../../socket/accounts';

async function updateAccountAPI(options) {
  try {
    const { _id, ...data } = options
    const config = {
      ...rootConfig,
      url: `/api/accounts/${_id}`,
      method: 'put',
      data: data,
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* updateAccount(action) {
  try {
    const result = yield call(updateAccountAPI, action.options)
    socket.emit(UPDATE)
    yield put(updateAccountSuccess(result))
  } catch (error) {
    yield put(updateAccountFailure(error))
  }
}

export default updateAccount