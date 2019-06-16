import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { addAccountSuccess, addAccountFailure } from '../../actions/account/addAccount';
import rootConfig from '../rootConfig';

import socket from '../../socket';
import { CREATE } from '../../socket/accounts';

async function addAccountAPI(options) {
  try {
    const config = {
      ...rootConfig,
      url: '/api/accounts',
      method: 'post',
      data: options,
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* addAccount(action) {
  try {
    const result = yield call(addAccountAPI, action.options)
    socket.emit(CREATE)
    yield put(addAccountSuccess(result))
  } catch (error) {
    yield put(addAccountFailure(error))
  }
}

export default addAccount