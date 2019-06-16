import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { getAllWebsitesSuccess, getAllWebsitesFailure } from '../../actions/website/getAllWebsites';
import rootConfig from '../rootConfig';

async function getAllWebsitesAPI(options) {
  try {
    const config = {
      ...rootConfig,
      url: '/api/webs',
      method: 'get',
    }
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw error
  }
}

function* getAllWebsites(action) {
  try {
    const result = yield call(getAllWebsitesAPI, action.options)
    yield put(getAllWebsitesSuccess(result))
  } catch (error) {
    yield put(getAllWebsitesFailure(error))
  }
}

export default getAllWebsites