import React from 'react';
import withGetAllLogTypes from '../../withs/withGetAllLogTypes'
import withChangeLogType from '../../withs/withChangeLogType'
import { MenuItem, Select, Typography } from '@material-ui/core';

function LogTypePicker({ getAllLogTypesState, getAllLogTypesAction, changeLogTypeState, changeLogTypeAction }) {

  const { logTypes } = getAllLogTypesState
  const { getAllLogTypes } = getAllLogTypesAction
  const { logType } = changeLogTypeState
  const { changeLogType } = changeLogTypeAction

  React.useEffect(() => {
    getAllLogTypes({})
  }, [])

  React.useEffect(() => {
    changeLogType(0)
  }, [logTypes])

  function handleChange(event) {
    changeLogType(event.target.value)
  }

  if (getAllLogTypesState.loading === true) {
    return <Typography variant='body1'>Đang tải</Typography>
  }

  if (getAllLogTypesState.error != null) {
    return <Typography variant='body1'>Đã xảy ra lỗi</Typography>
  }

  return (
    <Select
      value={logType}
      onChange={handleChange}
      inputProps={{
        name: 'log-type',
        id: 'log-type-picker',
      }}
    >
      {logTypes.map((logType, key) => (<MenuItem value={key} key={key}>{`${logType.typename} Logs`}</MenuItem>))}
    </Select>
  )
}

export default withGetAllLogTypes(withChangeLogType(LogTypePicker))