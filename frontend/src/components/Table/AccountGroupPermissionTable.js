import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import MaterialTable from 'material-table';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import socket from '../../socket';
import { BROADCAST } from '../../socket/accountGroups';

import withGetAllAccountGroups from '../../withs/withGetAllAccountGroups';
import UpdateAccountGroupPermissionDialog from '../Dialog/UpdateAccountGroupPermissionDialog';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  noBoxShadow: {
    '& > div': {
      boxShadow: 'none',
    }
  },
  fullHeight: {
    height: '100%',
  }
}));

function AccountGroupPermissionTable({ permissionLevel, getAllAccountGroupsState, getAllAccountGroupsAction }) {

  const { accountGroups } = getAllAccountGroupsState
  const { getAllAccountGroups } = getAllAccountGroupsAction
  const theme = useTheme();
  const [openUpdate, setOpenUpdate] = React.useState(false)
  const [current, setCurrent] = React.useState(null)

  React.useEffect(() => {
    getAllAccountGroups({})
    socket.on(BROADCAST, () => {
      getAllAccountGroups({})
    })
  }, [])

  function handleOpenUpdateAccountDialog(event, rowData) {
    setCurrent(rowData.permission)
    setOpenUpdate(true)
  }


  function GetPermission(permission) {
    if (permission === '0') {
      return <Typography variant='caption'>Không truy cập</Typography>
    }
    if (permission === '1') {
      return <Typography variant='caption' color='secondary'>Chỉ đọc</Typography>
    }
    if (permission === '2') {
      return <Typography variant='caption' color='primary'>Đọc và chỉnh sửa</Typography>
    }
    return null
  }

  if (getAllAccountGroupsState.error != null) {
    return (<Typography variant='body1'>Đã xảy ra lỗi</Typography>)
  }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable 
            title={<Typography color='primary'>Nhóm tài khoản</Typography>}
            isLoading={getAllAccountGroupsState.loading}
            columns={[
              { title: 'Nhóm', field: 'groupname', },
              { title: 'Bảng điều khiển', field: 'permission.dashboard',
                render: rowData => GetPermission(rowData.permission.dashboard)
              },
              { title: 'Quản lý Tài khoản', field: 'permission.user',
                render: rowData => GetPermission(rowData.permission.user)
              },
              { title: 'Quản lý Log', field: 'permission.log', 
                render: rowData => GetPermission(rowData.permission.log)
              },
              { title: 'Quản lý Cảnh báo', field: 'permission.alert',
                render: rowData => GetPermission(rowData.permission.alert)
              },
              { title: 'Quản lý Quyền hệ thống', field: 'permission.permission',
                render: rowData => GetPermission(rowData.permission.permission)
              },
            ]}
            options={{
              headerStyle: {
                backgroundColor: `${theme.palette.primary.main}`,
                color: `${theme.palette.primary.contrastText}`,
              },
              actionsColumnIndex: -1,
              pageSize: 5,
              pageSizeOptions: [5, 10, 20],
            }}
            data={accountGroups}
            actions={permissionLevel > 1 ? [
              {
                icon: 'edit',
                tooltip: 'Tùy chỉnh quyền',
                onClick: handleOpenUpdateAccountDialog,
              },
            ] : []}
            localization={{
              header: {
                actions: ''
              },
              body: {
                emptyDataSourceMessage: 'Không có dữ liệu',
              },
              toolbar: {
                searchPlaceholder: 'Tìm kiếm',
              },
              pagination: {
                labelDisplayedRows: '{from}-{to} trong {count}',
                labelRowsPerPage: 'Dòng trên trang',
                labelRowsSelect: 'dòng',
                firstTooltip: 'Trang đầu',
                previousTooltip: 'Trang trước',
                nextTooltip: 'Trang sau',
                lastTooltip: 'Trang cuối',
              },
            }}
          />
        </Grid>
      </Grid>
      <UpdateAccountGroupPermissionDialog isOpen={openUpdate} setIsOpen={setOpenUpdate} current={current} setCurrent={setCurrent} />
    </React.Fragment>
  );
}

export default withGetAllAccountGroups(AccountGroupPermissionTable);