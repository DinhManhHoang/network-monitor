import React from 'react';
import { Grid, Typography, Chip } from '@material-ui/core';
import MaterialTable from 'material-table';
import UpdateAlertGroupPermissionDialog from '../Dialog/UpdateAlertGroupPermissionDialog';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import socket from '../../socket';
import { BROADCAST } from '../../socket/alertGroups';
import SimpleCard from '../Card/SimpleCard';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import withGetAllAlertGroups from '../../withs/withGetAllAlertGroups';

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
  },
  detailBox: {
    padding: "10px 30px",
  },
  chip: {
    margin: theme.spacing(0.2),
  },
}));

function BarChart({ alertGroups }) {

  const categories = alertGroups.map(alertGroup => alertGroup.groupname)
  const chartData = alertGroups.map(alertGroup => alertGroup.accounts.length)

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
            type: 'column'
          },
          title: {
            text: undefined,
          },
          xAxis: {
            categories: categories,
          },
          yAxis: {
            title: {
              text: undefined,
            },
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: [{
            name: 'Số tài khoản theo dõi',
            data: chartData,
          }]
        }}
      />
    </div>
  )
}

function AlertGroupPermissionTable({ permissionLevel, getAllAlertGroupsState, getAllAlertGroupsAction }) {

  const { alertGroups } = getAllAlertGroupsState
  const { getAllAlertGroups } = getAllAlertGroupsAction
  const classes = useStyles();
  const theme = useTheme();

  const [currentAlertGroup, setCurrentAlertGroup] = React.useState(null)
  const [openUpdate, setOpenUpdate] = React.useState(false)

  React.useEffect(() => {
    getAllAlertGroups({})
    socket.on(BROADCAST, () => {
      getAllAlertGroups({})
    })
  }, [])
  
  function handleOpenUpdateAccountDialog(event, rowData) {
    setCurrentAlertGroup(rowData)
    setOpenUpdate(true)
  }

  if (getAllAlertGroupsState.error != null) {
    return (<Typography variant='body1'>Đã xảy ra lỗi</Typography>)
  }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SimpleCard 
            title={`Thống kê tài khoản theo dõi`} 
            content={<BarChart alertGroups={alertGroups} />} 
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <MaterialTable 
            title={<Typography color='primary'>Theo dõi nhóm cảnh báo</Typography>}
            isLoading={getAllAlertGroupsState.loading}
            columns={[
              { title: 'Tên nhóm cảnh báo', field: 'groupname', grouping: false },
              { title: 'Các tài khoản theo dõi', field: 'accounts', grouping: false, 
                render: rowData => <div>{rowData.accounts.map((account, key) => (
                    <Chip
                      key={key}
                      label={account.username}
                      className={classes.chip}
                    />
                  ))}
                </div>
              },
            ]}
            options={{
              headerStyle: {
                backgroundColor: `${theme.palette.primary.main}`,
                color: `${theme.palette.primary.contrastText}`,
              },
              pageSize: 5,
              pageSizeOptions: [5, 10, 20],
            }}
            data={alertGroups}
            actions={permissionLevel > 1 ? [
              {
                icon: 'edit',
                tooltip: 'Tùy chỉnh nhóm cảnh báo',
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
              grouping: {
                placeholder: 'Kéo tiêu đề cột vào đây để nhóm',
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
      <UpdateAlertGroupPermissionDialog isOpen={openUpdate} setIsOpen={setOpenUpdate} current={currentAlertGroup} setCurrent={setCurrentAlertGroup} />
    </React.Fragment>
  );
}

export default withGetAllAlertGroups(AlertGroupPermissionTable);