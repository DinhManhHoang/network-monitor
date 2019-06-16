import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { updateWebsiteSuccess, updateWebsiteFailure } from '../../actions/website/updateWebsite';
import rootConfig from '../rootConfig';

import socket from "../../socket";
import { UPDATE } from '../../socket/websites';

async function updateWebsiteAPI(options) {
  try {
    const { _id, ...data } = options
    const config = {
      ...rootConfig,
      url: `/api/webs/${_id}`,
      method: 'put',
      data: data,
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* updateWebsite(action) {
  try {
    const result = yield call(updateWebsiteAPI, action.options)
    socket.emit(UPDATE)
    yield put(updateWebsiteSuccess(result))
  } catch (error) {
    yield put(updateWebsiteFailure(error))
  }
}

export default updateWebsite