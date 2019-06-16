import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { getAllAccountGroupsSuccess, getAllAccountGroupsFailure } from '../../actions/accountGroup/getAllAccountGroups';
import rootConfig from '../rootConfig';

async function getAllAccountGroupsAPI(options) {
  try {
    let params = {
      permission: 'true',
    }
    const config = {
      ...rootConfig,
      url: '/api/userGroups',
      method: 'get',
      params,
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* getAllAccountGroups(action) {
  try {
    const result = yield call(getAllAccountGroupsAPI, action.options)
    yield put(getAllAccountGroupsSuccess(result))
  } catch (error) {
    yield put(getAllAccountGroupsFailure(error))
  }
}

export default getAllAccountGroups