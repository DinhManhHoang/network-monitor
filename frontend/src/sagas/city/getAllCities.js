import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { getAllCitiesSuccess, getAllCitiesFailure } from '../../actions/city/getAllCities';
import rootConfig from '../rootConfig';

async function getAllCitiesAPI(options) {
  try {
    const config = {
      ...rootConfig,
      url: '/api/cities',
      method: 'get',
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* getAllCities(action) {
  try {
    const result = yield call(getAllCitiesAPI, action.options)
    yield put(getAllCitiesSuccess(result))
  } catch (error) {
    yield put(getAllCitiesFailure(error))
  }
}

export default getAllCities