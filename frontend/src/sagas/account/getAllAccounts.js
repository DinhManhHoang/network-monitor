import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { getAllAccountsSuccess, getAllAccountsFailure } from '../../actions/account/getAllAccounts';
import rootConfig from '../rootConfig';

async function getAllAccountsAPI(options) {
  try {
    let params = {
      group: 'true',
      permission: 'true',
    }
    const config = {
      ...rootConfig,
      url: '/api/accounts',
      method: 'get',
      params,
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* getAllAccounts(action) {
  try {
    const result = yield call(getAllAccountsAPI, action.options)
    yield put(getAllAccountsSuccess(result))
  } catch (error) {
    yield put(getAllAccountsFailure(error))
  }
}

export default getAllAccounts