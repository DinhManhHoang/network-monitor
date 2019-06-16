export const CHANGE_LOG_TYPE = 'CHANGE_LOG_TYPE'

export function changeLogType(logType) {
  return {
    type: CHANGE_LOG_TYPE,
    logType,
  }
}
