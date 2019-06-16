import { combineReducers } from 'redux';

import getAllCities, { GET_ALL_CITIES_DEFAULT_STATE } from './city/getAllCities';
import changeCity, { CHANGE_CITY_DEFAULT_STATE } from './city/changeCity';
import dateRange, { DATE_RANGE_DEFAULT_STATE } from './dateRange/dateRange';
import countLog, { COUNT_LOG_DEFAULT_STATE } from './log/countLog';
import getAllLogs, { GET_ALL_LOGS_DEFAULT_STATE } from './log/getAllLogs';
import getAllLogTypes, { GET_ALL_LOG_TYPES_DEFAULT_STATE } from './logType/getAllLogTypes';
import changeLogType, { CHANGE_LOG_TYPE_DEFAULT_STATE } from './logType/changeLogType';
import getAllAccounts, { GET_ALL_ACCOUNTS_DEFAULT_STATE } from './account/getAllAccounts';
import addAccount, { ADD_ACCOUNT_DEFAULT_STATE } from './account/addAccount';
import getAllAccountGroups, { GET_ALL_ACCOUNT_GROUPS_DEFAULT_STATE } from './accountGroup/getAllAccountGroups';
import updateAccount, { UPDATE_ACCOUNT_DEFAULT_STATE } from './account/updateAccount';
import deleteAccount, { DELETE_ACCOUNT_DEFAULT_STATE } from './account/deleteAccount';
import getAllAlertGroups, { GET_ALL_ALERT_GROUPS_DEFAULT_STATE } from './alertGroup/getAllAlertGroups';
import updateAlertGroup, { UPDATE_ALERT_GROUP_DEFAULT_STATE } from './alertGroup/updateAlertGroup';
import deleteAlertGroup, { DELETE_ALERT_GROUP_DEFAULT_STATE } from './alertGroup/deleteAlertGroup';
import addAlertGroup, { ADD_ALERT_GROUP_DEFAULT_STATE } from './alertGroup/addAlertGroup';
import getAllAlertMessages, { GET_ALL_ALERT_MESSAGES_DEFAULT_STATE } from './alertMessage/getAllAlertMessages';
import authentication, { AUTHENTICATION_DEFAULT_STATE } from './authentication/authentication';
import updatePermission, { UPDATE_PERMISSION_DEFAULT_STATE } from './permission/updatePermission';
import addWebsite, { ADD_WEBSITE_DEFAULT_STATE } from './website/addWebsite';
import updateWebsite, { UPDATE_WEBSITE_DEFAULT_STATE } from './website/updateWebsite';
import deleteWebsite, { DELETE_WEBSITE_DEFAULT_STATE } from './website/deleteWebsite';
import getAllWebsites, { GET_ALL_WEBSITES_DEFAULT_STATE } from './website/getAllWebsites';

const rootReducer = combineReducers({
  updatePermission,
  authentication,
  getAllCities,
  changeCity,
  dateRange,
  countLog,
  getAllLogs,
  getAllLogTypes,
  changeLogType,
  getAllAccounts,
  addAccount,
  getAllAccountGroups,
  updateAccount,
  deleteAccount,
  getAllAlertGroups,
  addAlertGroup,
  updateAlertGroup,
  deleteAlertGroup,
  getAllAlertMessages,
  addWebsite,
  updateWebsite,
  deleteWebsite,
  getAllWebsites,
}) 

export const DEFAULT_STATE = {
  updatePermission: UPDATE_PERMISSION_DEFAULT_STATE,
  authentication: AUTHENTICATION_DEFAULT_STATE,
  getAllCities: GET_ALL_CITIES_DEFAULT_STATE,
  changeCity: CHANGE_CITY_DEFAULT_STATE,
  dateRange: DATE_RANGE_DEFAULT_STATE,
  countLog: COUNT_LOG_DEFAULT_STATE,
  getAllLogs: GET_ALL_LOGS_DEFAULT_STATE,
  getAllLogTypes: GET_ALL_LOG_TYPES_DEFAULT_STATE,
  changeLogType: CHANGE_LOG_TYPE_DEFAULT_STATE,
  getAllAccounts: GET_ALL_ACCOUNTS_DEFAULT_STATE,
  addAccount: ADD_ACCOUNT_DEFAULT_STATE,
  getAllAccountGroups: GET_ALL_ACCOUNT_GROUPS_DEFAULT_STATE,
  updateAccount: UPDATE_ACCOUNT_DEFAULT_STATE,
  deleteAccount: DELETE_ACCOUNT_DEFAULT_STATE,
  getAllAlertGroups: GET_ALL_ALERT_GROUPS_DEFAULT_STATE,
  addAlertGroup: ADD_ALERT_GROUP_DEFAULT_STATE,
  updateAlertGroup: UPDATE_ALERT_GROUP_DEFAULT_STATE,
  deleteAlertGroup: DELETE_ALERT_GROUP_DEFAULT_STATE,
  getAllAlertMessages: GET_ALL_ALERT_MESSAGES_DEFAULT_STATE,
  addWebsite: ADD_WEBSITE_DEFAULT_STATE,
  updateWebsite: UPDATE_WEBSITE_DEFAULT_STATE,
  deleteWebsite: DELETE_WEBSITE_DEFAULT_STATE,
  getAllWebsites: GET_ALL_WEBSITES_DEFAULT_STATE,
}

export default rootReducer