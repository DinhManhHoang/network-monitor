import React from 'react';
import { Checkbox, Grid, Typography } from '@material-ui/core';
import MaterialTable from 'material-table';
import AddAlertGroupDialog from '../Dialog/AddAlertGroupDialog';
import UpdateAlertGroupDialog from '../Dialog/UpdateAlertGroupDialog';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import socket from '../../socket';
import { BROADCAST } from '../../socket/alertGroups';

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

function AlertGroupTable({ permissionLevel, getAllAlertGroupsState, getAllAlertGroupsAction }) {

  const { alertGroups } = getAllAlertGroupsState
  const { getAllAlertGroups } = getAllAlertGroupsAction
  const classes = useStyles();
  const theme = useTheme();

  const [openAdd, setOpenAdd] = React.useState(false)
  const [currentAlertGroup, setCurrentAlertGroup] = React.useState(null)
  const [openUpdate, setOpenUpdate] = React.useState(false)

  React.useEffect(() => {
    getAllAlertGroups({})
    socket.on(BROADCAST, () => {
      getAllAlertGroups({})
    })
  }, [])

  function handleOpenAddAlertGroupDialog() {
    setOpenAdd(true)
  }
  
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
        <Grid item xs={12}>
          <MaterialTable 
            title={<Typography color='primary'>Nhóm cảnh báo</Typography>}
            isLoading={getAllAlertGroupsState.loading}
            columns={[
              { title: 'Tên nhóm cảnh báo', field: 'groupname', grouping: false },
              { title: 'Gửi Popup', field: 'popupAlert', grouping: false, 
                render: rowData => <Checkbox checked={rowData.popupAlert === '1'} />
              },
              { title: 'Gửi Email', field: 'phone', grouping: false, 
                render: rowData => <Checkbox checked={rowData.emailAlert === '1'} /> 
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
            data={alertGroups}
            detailPanel={rowData => {
              return (
                <div className={classes.detailBox}>
                  <Typography variant='body1' color='primary'>Mô tả</Typography>
                  <Typography variant='body1'>{rowData.groupdesc}</Typography>
                </div>
              )
            }}
            actions={permissionLevel > 1 ? [
              {
                icon: 'edit',
                tooltip: 'Tùy chỉnh nhóm cảnh báo',
                onClick: handleOpenUpdateAccountDialog,
              },
              {
                icon: 'add',
                tooltip: 'Thêm nhóm cảnh báo',
                isFreeAction: true,
                onClick: handleOpenAddAlertGroupDialog,
              }
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
      <AddAlertGroupDialog isOpen={openAdd} setIsOpen={setOpenAdd} />
      <UpdateAlertGroupDialog isOpen={openUpdate} setIsOpen={setOpenUpdate} current={currentAlertGroup} setCurrent={setCurrentAlertGroup} />
    </React.Fragment>
  );
}

export default withGetAllAlertGroups(AlertGroupTable);