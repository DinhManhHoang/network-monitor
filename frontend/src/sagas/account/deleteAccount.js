import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { deleteAccountSuccess, deleteAccountFailure } from '../../actions/account/deleteAccount';
import rootConfig from '../rootConfig';

import socket from "../../socket";
import { DESTROY } from '../../socket/accounts';

async function deleteAccountAPI(options) {
  try {
    const { _id } = options
    const config = {
      ...rootConfig,
      url: `/api/accounts/${_id}`,
      method: 'delete',
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* deleteAccount(action) {
  try {
    const result = yield call(deleteAccountAPI, action.options)
    socket.emit(DESTROY)
    yield put(deleteAccountSuccess(result))
  } catch (error) {
    yield put(deleteAccountFailure(error))
  }
}

export default deleteAccount