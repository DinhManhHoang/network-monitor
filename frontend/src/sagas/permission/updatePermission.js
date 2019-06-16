import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { updatePermissionSuccess, updatePermissionFailure } from '../../actions/permission/updatePermission';
import rootConfig from '../rootConfig';

import socket from "../../socket";
import { UPDATE as aUPDATE } from '../../socket/accounts';
import { UPDATE as agUPDATE } from '../../socket/accountGroups'; 

async function updatePermissionAPI(options) {
  try {
    const { _id, ...data } = options
    const config = {
      ...rootConfig,
      url: `/api/permissions/${_id}`,
      method: 'put',
      data: data,
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* updatePermission(action) {
  try {
    const result = yield call(updatePermissionAPI, action.options)
    socket.emit(agUPDATE)
    socket.emit(aUPDATE) 
    yield put(updatePermissionSuccess(result))
  } catch (error) {
    yield put(updatePermissionFailure(error))
  }
}

export default updatePermission