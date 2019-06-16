import React from 'react';
import { Dialog, DialogTitle, DialogContent, Container, DialogActions,
  Button, Typography, Grid, FormControl, Select, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import withUpdatePermission from '../../withs/withUpdatePermission';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function UpdateAccountGroupPermissionDialog({ isOpen, setIsOpen, current, setCurrent, updatePermissionState, updatePermissionAction }) {

  const { updatePermission } = updatePermissionAction
  const classes = useStyles();

  const [dashboard, setDashboard] = React.useState('0')
  const [log, setLog] = React.useState('0')
  const [user, setUser] = React.useState('0')
  const [alert, setAlert] = React.useState('0')
  const [permission, setPermission] = React.useState('0')

  function handleChangeDashboard(event) {
    setDashboard(event.target.value)
  }

  function handleChangeLog(event) {
    setLog(event.target.value)
  }

  function handleChangeUser(event) {
    setUser(event.target.value)
  }

  function handleChangeAlert(event) {
    setAlert(event.target.value)
  }

  function handleChangePermission(event) {
    setPermission(event.target.value)
  }

  React.useEffect(() => {
    setDashboard(_.get(current, 'dashboard', '0'))
    setLog(_.get(current, 'log', '0'))
    setUser(_.get(current, 'user', '0'))
    setAlert(_.get(current, 'alert', '0'))
    setPermission(_.get(current, 'permission', '0'))
  }, [current])

  if ((updatePermissionState.loading === true)) {
    return (<Typography variant='body1'>Đang tải...</Typography>)
  }

  if ((updatePermissionState.error === true)) {
    return (<Typography variant='body1'>Đã xảy ra lỗi</Typography>)
  }

  function handleCloseDialog(submit, isDelete = false) {
    return function(event) {
      if (submit === true) {
        const newPermission = {
          _id: current._id,
          dashboard,
          log,
          user,
          alert,
          permission,
        }
        updatePermission(newPermission)
      }
      setCurrent(null)
      setIsOpen(false)
    }
  }

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleCloseDialog(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Tùy chỉnh nhóm tài khoản"}</DialogTitle>
        <DialogContent dividers>
          <Container component="main" maxWidth="md">
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Quyền nhóm tài khoản
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel htmlFor="dashboard-native-simple">Bảng điều khiển</InputLabel>
                      <Select
                        native
                        value={dashboard}
                        onChange={handleChangeDashboard}
                        inputProps={{
                          name: 'dashboard',
                          id: 'dashboard-native-simple',
                        }}
                      >
                        <option value={'0'}>
                          Không truy cập
                        </option>
                        <option value={'1'}>
                          Chỉ đọc
                        </option>
                        <option value={'2'}>
                          Đọc và chỉnh sửa
                        </option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel htmlFor="user-native-simple">Quản lý Tài khoản</InputLabel>
                      <Select
                        native
                        value={user}
                        onChange={handleChangeUser}
                        inputProps={{
                          name: 'user',
                          id: 'user-native-simple',
                        }}
                      >
                        <option value={'0'}>
                          Không truy cập
                        </option>
                        <option value={'1'}>
                          Chỉ đọc
                        </option>
                        <option value={'2'}>
                          Đọc và chỉnh sửa
                        </option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel htmlFor="log-native-simple">Quản lý Log</InputLabel>
                      <Select
                        native
                        value={log}
                        onChange={handleChangeLog}
                        inputProps={{
                          name: 'log',
                          id: 'log-native-simple',
                        }}
                      >
                        <option value={'0'}>
                          Không truy cập
                        </option>
                        <option value={'1'}>
                          Chỉ đọc
                        </option>
                        <option value={'2'}>
                          Đọc và chỉnh sửa
                        </option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel htmlFor="alert-native-simple">Quản lý Cảnh báo</InputLabel>
                      <Select
                        native
                        value={alert}
                        onChange={handleChangeAlert}
                        inputProps={{
                          name: 'alert',
                          id: 'alert-native-simple',
                        }}
                      >
                        <option value={'0'}>
                          Không truy cập
                        </option>
                        <option value={'1'}>
                          Chỉ đọc
                        </option>
                        <option value={'2'}>
                          Đọc và chỉnh sửa
                        </option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel htmlFor="permission-native-simple">Quản lý Quyền hệ thống</InputLabel>
                      <Select
                        native
                        value={permission}
                        onChange={handleChangePermission}
                        inputProps={{
                          name: 'permission',
                          id: 'permission-native-simple',
                        }}
                      >
                        <option value={'0'}>
                          Không truy cập
                        </option>
                        <option value={'1'}>
                          Chỉ đọc
                        </option>
                        <option value={'2'}>
                          Đọc và chỉnh sửa
                        </option>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog(false)}>
            Hủy bỏ
          </Button>
          <Button onClick={handleCloseDialog(true)} color="primary">
            Gửi
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default withUpdatePermission(UpdateAccountGroupPermissionDialog);