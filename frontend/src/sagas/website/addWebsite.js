import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { addWebsiteSuccess, addWebsiteFailure } from '../../actions/website/addWebsite';
import rootConfig from '../rootConfig';

import socket from '../../socket';
import { CREATE } from '../../socket/websites';

async function addWebsiteAPI(options) {
  try {
    const config = {
      ...rootConfig,
      url: '/api/webs',
      method: 'post',
      data: options,
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* addWebsite(action) {
  try {
    const result = yield call(addWebsiteAPI, action.options)
    socket.emit(CREATE)
    yield put(addWebsiteSuccess(result))
  } catch (error) {
    yield put(addWebsiteFailure(error))
  }
}

export default addWebsite