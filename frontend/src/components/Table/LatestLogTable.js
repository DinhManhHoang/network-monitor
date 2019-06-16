import React from 'react';
import { Paper, TablePagination, IconButton, Table, TableRow, TableFooter, Grid, Typography } from '@material-ui/core';
import MaterialTable from 'material-table';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import LogTypePicker from '../LogTypePicker/LogTypePicker';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import IconCard from '../Card/IconCard';
import FontAwesomeIcon from '../FontAwesomeIcon/FontAwesomeIcon';
import _ from "lodash";
import axios from 'axios';
import FileSaver from 'file-saver';
import withGetAllCities from '../../withs/withGetAllCities'
import withChangeCity from '../../withs/withChangeCity'
import withDateRange from '../../withs/withDateRange'
import withGetAllLogs from '../../withs/withGetAllLogs'
import withGetAllLogTypes from '../../withs/withGetAllLogTypes'
import withChangeLogType from '../../withs/withChangeLogType'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  noBoxShadow: {
    '& > div': {
      boxShadow: 'none',
    }
  },
  detailBox: {
    padding: "10px 30px",
  }
}));

function parseJSONToString(obj) {
  let result = '{\n'
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      result += `  ${parseJSONToString(obj[key])},\n`
    } else {
      result += `'${key}': '${obj[key]}',\n`
    }
  })
  result += '}'
  return result
}

function TablePaginationActions({ onChangePage, page, count, rowsPerPage }) {

  React.useEffect(() => {
    if (page > Math.ceil(count / rowsPerPage) - 1) {
      onChangePage(null, 0)
    }
  }, [count])

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0)
  };

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1)
  };

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1)
  };

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={((page === 0))}
        aria-label="First Page"
        size={'small'}
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={((page === 0))}
        aria-label="Previous Page"
        size={'small'}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={((page >= Math.ceil(count / rowsPerPage) - 1))}
        aria-label="Next Page"
        size={'small'}
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={((page >= Math.ceil(count / rowsPerPage) - 1))}
        aria-label="Last Page"
        size={'small'}
      >
        <LastPageIcon />
      </IconButton>
    </React.Fragment>
  );
}

function LatestLogTable({ changeCityState, dateRangeState, getAllCitiesState, getAllLogTypesState, changeLogTypeState, getAllLogsState, getAllLogsAction }) {

  const { cities } = getAllCitiesState
  const { city } = changeCityState 
  const { startDate, endDate } = dateRangeState  
  const { logTypes } = getAllLogTypesState
  const { logs, total } = getAllLogsState
  const { logType } = changeLogTypeState
  const { getAllLogs } = getAllLogsAction
  const classes = useStyles();
  const theme = useTheme();
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  React.useEffect(() => {
    if (((cities.length > 0) && (city < cities.length) && (city >= 0))
    && ((logTypes.length > 0) && (logType < logTypes.length) && (logType >= 0))) {
      getAllLogs({
        city: cities[city]._id,
        type: logTypes[logType]._id,
        startDate,
        endDate,
        page,
        rowsPerPage,
      })
    }
  }, [cities, city, startDate, endDate, logTypes, logType, page, rowsPerPage])

  React.useEffect(() => {
    setPage(0)
    setRowsPerPage(5)
  }, [cities, city, startDate, endDate, logTypes, logType])

  if (getAllLogsState.error != null) {
    return <Typography variant='body1'>Đã xảy ra lỗi</Typography>
  }

  const tableData = logs.map(log => ({
    city: log.city.name,
    ip: log.ip,
    time: log.createdAt,
    data: log.data,
  }))

  function handleChangePage(event, page) {
    setPage(page)
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value)
  }

  function parseDateRange(startDate, endDate) {
    if ((startDate == null) && (endDate == null)) {
      return 'Toàn bộ'
    }
    if ((startDate != null) && (endDate == null)) {
      return `Từ: ${startDate.toLocaleString('vi-VN')}`
    }
    if ((startDate == null) && (endDate != null)) {
      return `Đến: ${endDate.toLocaleString('vi-VN')}`
    }
    if ((startDate != null) && (endDate != null)) {
      return `${startDate.toLocaleString('vi-VN')} - ${endDate.toLocaleString('vi-VN')}`
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item md={4} xs={12}>
        <IconCard
          title={`Tổng số Log loại ${_.get(logTypes[logType], 'typename', '')}`}
          content={total}
          icon={<FontAwesomeIcon iconClass={"fas fa-calculator"} />}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <IconCard 
          title={`Thành phố hiện tại`}
          content={_.get(cities[city], 'name', '')}
          icon={<FontAwesomeIcon iconClass={"fas fa-city"} />}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <IconCard  
          title={`Khoảng thời gian`}
          content={parseDateRange(startDate, endDate)}
          icon={<FontAwesomeIcon iconClass={"fas fa-calendar-day"} />}
        />
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.root}>
          <div className={classes.noBoxShadow}>
            <MaterialTable 
              title={<LogTypePicker />}
              isLoading={getAllLogsState.loading}
              columns={[
                { title: 'Thành phố', field: 'city' },
                { title: 'Địa chỉ IP', field: 'ip' },
                { title: 'Thời gian lưu', field: 'time' },
              ]}
              options={{
                headerStyle: {
                  backgroundColor: `${theme.palette.primary.main}`,
                  color: `${theme.palette.primary.contrastText}`,
                },
                paging: false,
                search: false,
                exportButton: true,
                exportCsv: (columns, data) => {
                  let params = {
                  }
                  if (_.get(logTypes[logType], '_id', null) != null) {
                    params = { ...params, type: _.get(logTypes[logType], '_id', null) }
                  }
                  if (_.get(cities[city], '_id', null) != null) {
                    params = { ...params, city: _.get(cities[city], '_id', null) }
                  }
                  if (startDate != null) {
                    params = { ...params, start: startDate.getTime() }
                  }
                  if (endDate != null) {
                    params = { ...params, end: endDate.getTime() }
                  }
                  axios({
                    url: '/api/downloads',
                    method: 'get',
                    params: params,
                    responseType: 'arraybuffer',
                  }).then(fileData => {
                    const blob = new Blob([fileData.data]);
                    FileSaver.saveAs(blob, 'Thống kê dữ liệu.xlsx');
                  })
                },
              }}
              data={tableData}
              detailPanel={rowData => {
                return (
                  <div className={classes.detailBox}>
                    <Typography variant='body1' color='primary'>Mô tả</Typography>
                    <Typography variant='body1'>{parseJSONToString(rowData.data)}</Typography>
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
                toolbar: {
                  searchPlaceholder: 'Tìm kiếm',
                  exportTitle: 'Xuất bản',
                  exportAriaLabel: 'Xuất bản',
                  exportName: 'Xuất file Excel',
                },
              }}
            />
          </div>
          <Table>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  colSpan={2}
                  count={total}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  labelDisplayedRows={({ from, to, count }) => `Trang ${page + 1}`}
                  labelRowsPerPage={`Dòng trên trang`}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withGetAllCities(withChangeCity(withDateRange(withGetAllLogTypes(withChangeLogType(withGetAllLogs(LatestLogTable))))));