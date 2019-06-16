import React from 'react';
import { Typography, Grid, Link, Chip } from '@material-ui/core';
import MaterialTable from 'material-table';
import AddWebsiteDialog from '../Dialog/AddWebsiteDialog';
import UpdateWebsiteDialogg from '../Dialog/UpdateWebsiteDialog';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import SimpleCard from '../Card/SimpleCard';
import _ from 'lodash';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import socket from '../../socket';
import { BROADCAST } from '../../socket/websites';

import withGetAllWebsites from '../../withs/withGetAllWebsites';

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

function SemiDonutChart({ websites }) {

  let data = {}
  websites.forEach(website => {
    const respondCode = _.get(website, 'data.respondCode', null)
    if (respondCode !== null) {
      data[respondCode] = _.get(data, `${respondCode}`, 0) + 1
    }
  })

  let chartData = []
  for (let key in data) {
    chartData.push([key, data[key]])
  }

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

function AccountTable({ permissionLevel, getAllWebsitesState, getAllWebsitesAction }) {

  const { websites } = getAllWebsitesState
  const { getAllWebsites } = getAllWebsitesAction
  const theme = useTheme();
  const [currentWebsite, setCurrentWebsite] = React.useState(null)
  const [openAdd, setOpenAdd] = React.useState(false)
  const [openUpdate, setOpenUpdate] = React.useState(false)

  React.useEffect(() => {
    getAllWebsites({})
    socket.on(BROADCAST, () => {
      getAllWebsites({})
    })
  }, [])

  function handleOpenAddWebsiteDialog() {
    setOpenAdd(true)
  }

  function handleOpenUpdateWebsiteDialog(event, rowData) {
    setCurrentWebsite(rowData)
    setOpenUpdate(true)
  }

  if (getAllWebsitesState.error != null) {
    return (<Typography variant='body1'>Đã xảy ra lỗi</Typography>)
  }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <SimpleCard 
            title={`Thống kê trạng thái các trang web`} 
            content={<SemiDonutChart websites={websites} />}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <MaterialTable 
            title={<Typography color='primary'>Danh sách website</Typography>}
            isLoading={getAllWebsitesState.loading}
            columns={[
              { title: 'Tên trang', field: 'name', grouping: false },
              { title: 'Địa chỉ URL', field: 'url', grouping: false, 
                render: (rowData) => <Link href={rowData.url}>{rowData.url}</Link>
              },
              { title: 'Trạng thái', field: 'data.respondCode', grouping: false, 
                render: (rowData) => {
                  const respondCode = _.get(rowData, 'data.respondCode', null)
                  if (respondCode === null) {
                    return null
                  }
                  if (parseInt(respondCode) / 100 === 2) {
                    return <Chip label={respondCode} color='primary' />
                  } else {
                    return <Chip label={respondCode} color='secondary' />
                  }
                }
              },
              { title: 'Thời điểm kiểm tra', field: 'data.lastChecked', grouping: false, 
                render: (rowData) => {
                  const lastChecked = _.get(rowData, 'data.lastChecked', null)
                  if (lastChecked === null) {
                    return null
                  } else {
                    return lastChecked
                  }
                }
              },
              { title: 'Thời gian phản hồi', field: 'data.respondTime', grouping: false, 
                render: (rowData) => {
                  const respondTime = _.get(rowData, 'data.respondTime', null)
                  if (respondTime === null) {
                    return null
                  } else {
                    return respondTime
                  }
                }
              },
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
            data={websites}
            actions={permissionLevel > 1 ? [
              {
                icon: 'edit',
                tooltip: 'Tùy chỉnh website',
                onClick: handleOpenUpdateWebsiteDialog,
              },
              {
                icon: 'add',
                tooltip: 'Thêm website',
                isFreeAction: true,
                onClick: handleOpenAddWebsiteDialog,
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
      <AddWebsiteDialog isOpen={openAdd} setIsOpen={setOpenAdd} />
      <UpdateWebsiteDialogg isOpen={openUpdate} setIsOpen={setOpenUpdate} current={currentWebsite} setCurrent={setCurrentWebsite} />
    </React.Fragment>
  );
}

export default withGetAllWebsites(AccountTable);