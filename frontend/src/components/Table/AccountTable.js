import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import MaterialTable from 'material-table';
import AddAccountDialog from '../Dialog/AddAccountDialog';
import UpdateAccountDialog from '../Dialog/UpdateAccountDialog';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import SimpleCard from '../Card/SimpleCard';
import _ from 'lodash';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import socket from '../../socket';
import { BROADCAST } from '../../socket/accounts';

import withGetAllAccounts from '../../withs/withGetAllAccounts';
import withGetAllAccountGroups from '../../withs/withGetAllAccountGroups';

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

function SemiDonutChart({ accountGroups, accounts }) {

  const data = accountGroups.map(accountGroup => {
    const count = accounts.reduce((total, account) => {
      const accountGroupId = _.get(account, 'role._id', false)
      const id =  _.get(accountGroup, '_id', true)
      if (id === accountGroupId) {
        return total + 1
      } else {
        return total
      }
    }, 0)
    const name = accountGroup.groupname
    return {
      count,
      name
    }
  })

  const chartData = data.map(col => [col.name, col.count])

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
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
          },
          title: {
            text: undefined,
          },
          plotOptions: {
            pie: {
              dataLabels: {
                enabled: true,
                distance: -50,
              },
              startAngle: -90,
              endAngle: 90,
            }
          },
          series: [{
            type: 'pie',
            innerSize: '45%',
            data: chartData,
          }]
        }}
      />
    </div>
  )
}

function AccountTable({ permissionLevel, getAllAccountGroupsState, getAllAccountGroupsAction, getAllAccountsState, getAllAccountsAction }) {

  const { accounts } = getAllAccountsState
  const { getAllAccounts } = getAllAccountsAction
  const { accountGroups } = getAllAccountGroupsState
  const { getAllAccountGroups } = getAllAccountGroupsAction
  const theme = useTheme();
  const [currentAccount, setCurrentAccount] = React.useState(null)
  const [openAdd, setOpenAdd] = React.useState(false)
  const [openUpdate, setOpenUpdate] = React.useState(false)

  React.useEffect(() => {
    getAllAccounts({})
    getAllAccountGroups({})
    socket.on(BROADCAST, () => {
      getAllAccounts({})
    })
  }, [])

  
  function handleOpenAddAccountDialog() {
    setOpenAdd(true)
  }

  function handleOpenUpdateAccountDialog(event, rowData) {
    setCurrentAccount(rowData)
    setOpenUpdate(true)
  }

  if (getAllAccountsState.error != null) {
    return (<Typography variant='body1'>Đã xảy ra lỗi</Typography>)
  }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <SimpleCard 
            title={`Thống kê tài khoản theo nhóm`} 
            content={<SemiDonutChart  
              accounts={accounts}
              accountGroups={accountGroups}
            />} 
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <MaterialTable 
            title={<Typography color='primary'>Danh sách tài khoản</Typography>}
            isLoading={getAllAccountsState.loading}
            columns={[
              { title: 'Tên tài khoản', field: 'username', grouping: false },
              { title: 'Họ tên', field: 'name.first', grouping: false, 
                render: (rowData) => `${rowData.name.first} ${rowData.name.last}`
              },
              { title: 'Email', field: 'email', grouping: false },
              { title: 'Số điện thoại', field: 'phone', grouping: false },
            ]}
            options={{
              headerStyle: {
                backgroundColor: `${theme.palette.primary.main}`,
                color: `${theme.palette.primary.contrastText}`,
              },
              actionsColumnIndex: -1,
              pageSize: 10,
              pageSizeOptions: [10, 15, 20],
            }}
            data={accounts}
            actions={permissionLevel > 1 ? [
              {
                icon: 'edit',
                tooltip: 'Tùy chỉnh tài khoản',
                onClick: handleOpenUpdateAccountDialog,
              },
              {
                icon: 'add',
                tooltip: 'Thêm tài khoản',
                isFreeAction: true,
                onClick: handleOpenAddAccountDialog,
              }
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
      <AddAccountDialog isOpen={openAdd} setIsOpen={setOpenAdd} />
      <UpdateAccountDialog isOpen={openUpdate} setIsOpen={setOpenUpdate} current={currentAccount} setCurrent={setCurrentAccount} />
    </React.Fragment>
  );
}

export default withGetAllAccountGroups(withGetAllAccounts(AccountTable));