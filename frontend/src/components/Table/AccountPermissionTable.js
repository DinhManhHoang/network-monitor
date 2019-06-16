import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import MaterialTable from 'material-table';
import UpdateAccountPermissionDialog from '../Dialog/UpdateAccountPermissionDialog';
import UpdateAccountRoleDialog from '../Dialog/UpdateAccountRoleDialog';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import SimpleCard from '../Card/SimpleCard';
import _ from 'lodash';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import socket from '../../socket';
import { BROADCAST } from '../../socket/accounts';

import withGetAllAccounts from '../../withs/withGetAllAccounts';

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

function StackBarChart({ permissions }) {

  let _categories = ['dashboard', 'user', 'log', 'alert', 'permission']
  let categories = ['Bảng điều khiển', 'Quản lý Tài khoản', 'Quản lý Log', 'Quản lý Cảnh báo', 'Quản lý Quyền hệ thống']
  let dataName = [{ index: '0', name: 'Không truy cập' }, { index: '1', name: 'Chỉ đọc' }, { index: '2', name: 'Đọc và chỉnh sửa' }]
  let chartData = []
  dataName.forEach(name => {
    let data = []
    _categories.forEach(category => {
      let count = 0
      permissions.forEach(permission => {
        if (permission.permission[category] === name.index) count++
      })
      data.push(count)
    })
    chartData.push({
      name: name.name,
      data,
    })
  })

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: 'bar',
          },
          title: {
            text: undefined,
          },
          yAxis: {
            title: {
              text: undefined,
            },
          },
          xAxis: {
            categories: categories,
          },
          legend: {
            reversed: true
          },
          plotOptions: {
            series: {
              stacking: 'normal'
            }
          },
          series: chartData,
        }}
      />
    </div>
  )
}

function AccountPermissionTable({ permissionLevel, getAllAccountsState, getAllAccountsAction }) {

  const { accounts } = getAllAccountsState
  const { getAllAccounts } = getAllAccountsAction
  const theme = useTheme();
  const [openUpdatePermission, setOpenUpdatePermission] = React.useState(false)
  const [openUpdateRole, setOpenUpdateRole] = React.useState(false)
  const [currentPermission, setCurrentPermission] = React.useState(null)
  const [currentAccount, setCurrentAccount] = React.useState(null)

  React.useEffect(() => {
    getAllAccounts({})
    socket.on(BROADCAST, () => {
      getAllAccounts({})
    })
  }, [])

  function handleOpenUpdatePermissionDialog(event, rowData) {
    setCurrentPermission(rowData.account.permission)
    setOpenUpdatePermission(true)
  }

  function handleOpenUpdateRoleDialog(event, rowData) {
    setCurrentAccount(rowData.account)
    setOpenUpdateRole(true)
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

  if (getAllAccountsState.error != null) {
    return (<Typography variant='body1'>Đã xảy ra lỗi</Typography>)
  }

  const permissions = accounts.map(account => {
    const categories = ['dashboard', 'user', 'log', 'alert', 'permission']
    let res = {}
    categories.forEach(category => {
      if (parseInt(account.permission[category]) < parseInt(account.role.permission[category])) {
        res = { ...res, [category]: account.permission[category] }
      } else {
        res = { ...res, [category]: account.role.permission[category] }
      }
    })
    return { permission: res, username: account.username, role: account.role.groupname, account }
  })

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <SimpleCard title='Phân bố quyền hệ thống' content={<StackBarChart permissions={permissions} />}/>
        </Grid>
        <Grid item md={8} xs={12}>
          <MaterialTable 
            title={<Typography color='primary'>Quyền tài khoản</Typography>}
            isLoading={getAllAccountsState.loading}
            columns={[
              { title: 'Tài khoản', field: 'username', grouping: false },
              { title: 'Nhóm', field: 'role', grouping: true },
              { title: 'Bảng điều khiển', field: 'permission.dashboard', grouping: false,
                render: rowData => GetPermission(rowData.permission.dashboard)
              },
              { title: 'Quản lý Tài khoản', field: 'permission.user', grouping: false, 
                render: rowData => GetPermission(rowData.permission.user)
              },
              { title: 'Quản lý Log', field: 'permission.log', grouping: false, 
                render: rowData => GetPermission(rowData.permission.log)
              },
              { title: 'Quản lý Cảnh báo', field: 'permission.alert', grouping: false, 
                render: rowData => GetPermission(rowData.permission.alert)
              },
              { title: 'Quản lý Quyền hệ thống', field: 'permission.permission', grouping: false, 
                render: rowData => GetPermission(rowData.permission.permission)
              },
            ]}
            options={{
              headerStyle: {
                backgroundColor: `${theme.palette.primary.main}`,
                color: `${theme.palette.primary.contrastText}`,
              },
              grouping: true,
              pageSize: 5,
              pageSizeOptions: [5, 10, 20],
            }}
            data={permissions}
            actions={permissionLevel > 1 ? [
              {
                icon: 'edit',
                tooltip: 'Tùy chỉnh quyền',
                onClick: handleOpenUpdatePermissionDialog,
              },
              {
                icon: 'group',
                tooltip: 'Tùy chỉnh nhóm',
                onClick: handleOpenUpdateRoleDialog,
              },
            ] : []}
            localization={{
              header: {
                actions: ''
              },
              body: {
                emptyDataSourceMessage: 'Không có dữ liệu',
              },
              grouping: {
                placeholder: 'Kéo tiêu đề cột "Nhóm" vào đây để nhóm',
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
      <UpdateAccountPermissionDialog isOpen={openUpdatePermission} setIsOpen={setOpenUpdatePermission} current={currentPermission} setCurrent={setCurrentPermission} />
      <UpdateAccountRoleDialog isOpen={openUpdateRole} setIsOpen={setOpenUpdateRole} current={currentAccount} setCurrent={setCurrentAccount} />
    </React.Fragment>
  );
}

export default withGetAllAccounts(AccountPermissionTable);