import React from 'react';
import { Checkbox, Grid, Typography } from '@material-ui/core';
import MaterialTable from 'material-table';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import SimpleCard from '../Card/SimpleCard';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import socket from '../../socket';
import { BROADCAST } from '../../socket/alertMessages';

import withGetAllAlertMessages from '../../withs/withGetAllAlertMessages';
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
  }
}));

function PieChart({ alertMessages, alertGroups }) {

  let counter = []
  alertGroups.forEach(alertGroup => {
    counter = [...counter, { _id: alertGroup._id, group: alertGroup.groupname, count: 0 }]
  })
  alertMessages.forEach(alertMessage => {
    for (let index = 0; index < counter.length; index++ ) {
      if (counter[index]._id === alertMessage.group._id) {
        counter[index].count += 1
      }
    }
  })

  const data = counter.map(_counter => ({
    name: _counter.group,
    y: _counter.count,
  }))

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
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: undefined,
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.y} (~{point.percentage:.1f}%)</b>'
          },
          plotOptions: {
            pie: {
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
              }
            }
          },
          series: [{
            name: 'Số lượng',
            colorByPoint: true,
            data: data,
          }]
        }}
      />
    </div>
  )
}

function AlertMessageTable({ getAllAlertMessagesState, getAllAlertMessagesAction, getAllAlertGroupsState }) {

  const { alertMessages } = getAllAlertMessagesState
  const { alertGroups } = getAllAlertGroupsState
  const { getAllAlertMessages } = getAllAlertMessagesAction
  const classes = useStyles();
  const theme = useTheme();

  React.useEffect(() => {
    getAllAlertMessages({})
    socket.on(BROADCAST, (data) => {
      getAllAlertMessages({})
    })
  }, [alertGroups])

  if (getAllAlertMessagesState.error != null) {
    return (<Typography variant='body1'>Đã xảy ra lỗi</Typography>)
  }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <SimpleCard 
            title={`Tổng quan cảnh báo`} 
            content={<PieChart 
              alertMessages={alertMessages}
              alertGroups={alertGroups} 
            />} 
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <MaterialTable 
            title={<Typography color='primary'>Lịch sử cảnh báo</Typography>}
            isLoading={getAllAlertMessagesState.loading}
            columns={[
              { title: 'Nhóm cảnh báo', field: 'group.groupname', grouping: true },
              { title: 'Cảnh báo', field: 'popupMes', grouping: false,
                render: rowData => rowData.popupMes
              },
            ]}
            options={{
              headerStyle: {
                backgroundColor: `${theme.palette.primary.main}`,
                color: `${theme.palette.primary.contrastText}`,
              },
              grouping: true,
              actionsColumnIndex: -1,
              pageSize: 5,
              pageSizeOptions: [5, 10, 20],
            }}
            data={alertMessages}
            detailPanel={rowData => {
              return (
                <div className={classes.detailBox}>
                  <Typography variant='body1' color='primary'>Tin cảnh báo Popup</Typography>
                  <Typography variant='body1'>{rowData.popupMes}</Typography>
                  <Typography variant='body1' color='primary'>Tin cảnh báo Email</Typography>
                  <Typography variant='body1'>{rowData.emailMes}</Typography>
                  <Typography variant='body1' color='primary'>Tin cảnh báo SMS</Typography>
                  <Typography variant='body1'>{rowData.smsMes}</Typography>
                </div>
              )
            }}
            localization={{
              header: {
                actions: ''
              },
              body: {
                emptyDataSourceMessage: 'Không có dữ liệu',
              },
              grouping: {
                placeholder: 'Kéo tiêu đề cột "Nhóm cảnh báo" vào đây để nhóm',
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
    </React.Fragment>
  );
}

export default withGetAllAlertMessages(withGetAllAlertGroups(AlertMessageTable));