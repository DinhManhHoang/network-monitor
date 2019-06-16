import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { deleteWebsiteSuccess, deleteWebsiteFailure } from '../../actions/website/deleteWebsite';
import rootConfig from '../rootConfig';

import socket from "../../socket";
import { DESTROY } from '../../socket/websites';

async function deleteWebsiteAPI(options) {
  try {
    const { _id } = options
    const config = {
      ...rootConfig,
      url: `/api/webs/${_id}`,
      method: 'delete',
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* deleteWebsite(action) {
  try {
    const result = yield call(deleteWebsiteAPI, action.options)
    socket.emit(DESTROY)
    yield put(deleteWebsiteSuccess(result))
  } catch (error) {
    yield put(deleteWebsiteFailure(error))
  }
}

export default deleteWebsite