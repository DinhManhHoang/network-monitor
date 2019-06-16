import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { getAllLogTypesSuccess, getAllLogTypesFailure } from '../../actions/logType/getAllLogTypes';
import rootConfig from '../rootConfig';

async function getAllLogTypesAPI(options) {
  try {
    const config = {
      ...rootConfig,
      url: '/api/logTypes',
      method: 'get',
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* getAllLogTypes(action) {
  try {
    const result = yield call(getAllLogTypesAPI, action.options)
    yield put(getAllLogTypesSuccess(result))
  } catch (error) {
    yield put(getAllLogTypesFailure(error))
  }
}

export default getAllLogTypes