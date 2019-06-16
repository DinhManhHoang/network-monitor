import { takeLatest } from 'redux-saga/effects';

import getAllCities from './city/getAllCities';
import { GET_ALL_CITIES } from '../actions/city/getAllCities';
import countLog from './log/countLog';
import { COUNT_LOG } from '../actions/log/countLog';
import getAllLogs from './log/getAllLogs';
import { GET_ALL_LOGS } from '../actions/log/getAllLogs';
import getAllLogTypes from './logType/getAllLogTypes';
import { GET_ALL_LOG_TYPES } from '../actions/logType/getAllLogTypes';
import getAllAccounts from './account/getAllAccounts';
import { GET_ALL_ACCOUNTS } from '../actions/account/getAllAccounts';
import addAccount from './account/addAccount';
import { ADD_ACCOUNT } from '../actions/account/addAccount';
import getAllAccountGroups from "./accountGroup/getAllAccountGroups";
import { GET_ALL_ACCOUNT_GROUPS } from '../actions/accountGroup/getAllAccountGroups';
import updateAccount from './account/updateAccount';
import { UPDATE_ACCOUNT } from '../actions/account/updateAccount';
import deleteAccount from './account/deleteAccount';
import { DELETE_ACCOUNT } from '../actions/account/deleteAccount';
import getAllAlertGroups from './alertGroup/getAllAlertGroups';
import { GET_ALL_ALERT_GROUPS } from '../actions/alertGroup/getAllAlertGroups';
import addAlertGroup from './alertGroup/addAlertGroup';
import { ADD_ALERT_GROUP } from '../actions/alertGroup/addAlertGroup';
import updateAlertGroup from './alertGroup/updateAlertGroup';
import { UPDATE_ALERT_GROUP } from '../actions/alertGroup/updateAlertGroup';
import deleteAlertGroup from './alertGroup/deleteAlertGroup';
import { DELETE_ALERT_GROUP } from '../actions/alertGroup/deleteAlertGroup';
import getAllAlertMessages from './alertMessage/getAllAlertMessages';
import { GET_ALL_ALERT_MESSAGES } from '../actions/alertMessage/getAllAlertMessages';
import { login, logout, register } from './authentication/authentication';
import { LOGIN } from '../actions/authentication/login';
import { LOGOUT } from '../actions/authentication/logout';
import { REGISTER } from '../actions/authentication/register';
import updatePermission from './permission/updatePermission';
import { UPDATE_PERMISSION } from '../actions/permission/updatePermission';
import addWebsite from './website/addWebsite';
import { ADD_WEBSITE } from '../actions/website/addWebsite';
import updateWebsite from './website/updateWebsite';
import { UPDATE_WEBSITE } from '../actions/website/updateWebsite';
import deleteWebsite from './website/deleteWebsite';
import { DELETE_WEBSITE } from '../actions/website/deleteWebsite';
import getAllWebsites from './website/getAllWebsites';
import { GET_ALL_WEBSITES } from '../actions/website/getAllWebsites';

function* rootSaga() {
  yield takeLatest(GET_ALL_CITIES, getAllCities)
  yield takeLatest(COUNT_LOG, countLog)
  yield takeLatest(GET_ALL_LOGS, getAllLogs)
  yield takeLatest(GET_ALL_LOG_TYPES, getAllLogTypes)
  yield takeLatest(GET_ALL_ACCOUNTS, getAllAccounts)
  yield takeLatest(ADD_ACCOUNT, addAccount)
  yield takeLatest(GET_ALL_ACCOUNT_GROUPS, getAllAccountGroups)
  yield takeLatest(UPDATE_ACCOUNT, updateAccount)
  yield takeLatest(DELETE_ACCOUNT, deleteAccount)
  yield takeLatest(GET_ALL_ALERT_GROUPS, getAllAlertGroups)
  yield takeLatest(ADD_ALERT_GROUP, addAlertGroup)
  yield takeLatest(UPDATE_ALERT_GROUP, updateAlertGroup)
  yield takeLatest(DELETE_ALERT_GROUP, deleteAlertGroup)
  yield takeLatest(GET_ALL_ALERT_MESSAGES, getAllAlertMessages)
  yield takeLatest(LOGIN, login)
  yield takeLatest(LOGOUT, logout)
  yield takeLatest(REGISTER, register)
  yield takeLatest(UPDATE_PERMISSION, updatePermission)
  yield takeLatest(ADD_WEBSITE, addWebsite)
  yield takeLatest(UPDATE_WEBSITE, updateWebsite)
  yield takeLatest(DELETE_WEBSITE, deleteWebsite)
  yield takeLatest(GET_ALL_WEBSITES, getAllWebsites)
}

export default rootSaga