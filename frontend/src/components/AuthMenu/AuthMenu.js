import React from 'react';
import { 
  IconButton, Menu, ListItemIcon,
  Dialog, DialogTitle, DialogContent, Container, DialogActions,
  Button, Typography, Grid, TextField, MenuItem
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import InfoIcon from '@material-ui/icons/Info'
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import withAuthentication from '../../withs/withAuthentication'
import withUpdateAccount from '../../withs/withUpdateAccount';
import useValidState, { usernameValidator, emailValidator, phoneValidator, emptyStringValidator } from '../../hooks/useValidState';
import _ from 'lodash';
import UpdateAccountPasswordDialog from '../Dialog/UpdateAccountPasswordDialog';

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
}));

const useDialog = ({ isOpen, setIsOpen, current, setCurrent, updateAccountAction, updateAccountState }) => {

  const { updateAccount } = updateAccountAction
  const classes = useStyles();

  const [username, usernameError, setUsername] = useValidState('', usernameValidator)
  const [email, emailError, setEmail] = useValidState('', emailValidator)
  const [phone, phoneError, setPhone] = useValidState('', phoneValidator)
  const [firstName, firstNameError, setFirstName] = useValidState('', emptyStringValidator)
  const [lastName, lastNameError, setLastName] = useValidState('', emptyStringValidator)
  const [dateOfBirth, , setDateOfBirth] = useValidState(null)
  const [address, , setAddress] = useValidState('')

  function handleChangeUsername(event) {
    setUsername(event.target.value)
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value)
  }

  function handleChangePhone(event) {
    setPhone(event.target.value)
  }

  function handleChangeFirstName(event) {
    setFirstName(event.target.value)
  }

  function handleChangeLastName(event) {
    setLastName(event.target.value)
  }

  function handleChangeAddress(event) {
    setAddress(event.target.value)
  }

  React.useEffect(() => {
    setUsername(_.get(current, 'username', ''))
    setEmail(_.get(current, 'email', ''))
    setPhone(_.get(current, 'phone', ''))
    setFirstName(_.get(current, 'name.first', ''))
    setLastName(_.get(current, 'name.last', ''))
    setDateOfBirth(moment(_.get(current, 'dateOfBirth', undefined)))
    setAddress(_.get(current, 'address', ''))
  }, [current])

  if ((updateAccountState.loading === true)) {
    return (<Typography variant='body1'>Đang tải...</Typography>)
  }

  if ((updateAccountState.error === true)) {
    return (<Typography variant='body1'>Đã xảy ra lỗi</Typography>)
  }

  function handleCloseDialog(submit, isDelete = false) {
    return function(event) {
      if (submit === true) {
        const newAccount = {
          _id: current._id,
          username: username,
          name: {
            first: firstName,
            last: lastName,
          },
          dateOfBirth: dateOfBirth._d,
          address: address,
          email: email,
          phone: phone,
        }
        updateAccount(newAccount)
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
        <DialogTitle id="responsive-dialog-title">{"Thông tin"}</DialogTitle>
        <DialogContent dividers>
          <Container component="main" maxWidth="md">
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Thông tin tài khoản
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField 
                      error={usernameError !== null}
                      variant="outlined"
                      label="Tên tài khoản"
                      value={username}
                      onChange={handleChangeUsername}
                      helperText={usernameError}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      error={firstNameError !== null}
                      variant="outlined"
                      label="Họ người dùng"
                      value={firstName}
                      onChange={handleChangeFirstName}
                      helperText={firstNameError}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      error={lastNameError !== null}
                      variant="outlined"
                      label="Tên người dùng"
                      value={lastName}
                      onChange={handleChangeLastName}
                      helperText={lastNameError}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField 
                      error={phoneError !== null}
                      variant="outlined"
                      label="Số điện thoại"
                      value={phone}
                      onChange={handleChangePhone}
                      helperText={phoneError}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField 
                      error={emailError !== null}
                      variant="outlined"
                      label="Email"
                      value={email}
                      onChange={handleChangeEmail}
                      helperText={emailError}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker
                        fullWidth
                        inputVariant="outlined"
                        label="Ngày sinh"
                        format="DD/MM/YYYY"
                        value={dateOfBirth}
                        onChange={setDateOfBirth}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      label="Địa chỉ"
                      value={address}
                      onChange={handleChangeAddress}
                      fullWidth
                      multiline
                    />
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog(false)}>
            Thoát
          </Button>
          <Button onClick={handleCloseDialog(true)} color="primary" 
            disabled={((usernameError !== null) 
              || (emailError !== null)
              || (phoneError !== null))}
          >
            Chỉnh sửa
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const UpdateDialog = withUpdateAccount(useDialog)

function AuthMenu({ authenticationState, authenticationAction }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [passOpen, setPassOpen] = React.useState(false);
  const open = Boolean(anchorEl);

  const { logout } = authenticationAction
  const { auth } = authenticationState

  const [current, setCurrent] = React.useState(auth)

  React.useEffect(() => {
    setCurrent(auth)
  }, [auth])

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleLogout() {
    handleClose()
    logout()
  }

  function handleUpdate() {
    setCurrent(auth)
    handleClose()
    setUpdateOpen(true)
  }

  function handleChangePassword() {
    setCurrent(auth)
    handleClose()
    setPassOpen(true)
  }

  return (
    <div>
      <IconButton
        aria-label="More"
        aria-owns={open ? 'long-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="primary"
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleUpdate}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <Typography variant='body1'>Thông tin</Typography>
        </MenuItem>
        <MenuItem onClick={handleChangePassword}>
          <ListItemIcon>
            <SwapHorizontalCircleIcon />
          </ListItemIcon>
          <Typography variant='body1'>Đổi mật khẩu</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <Typography variant='body1'>Đăng xuất</Typography>
        </MenuItem>
      </Menu>
      <UpdateDialog isOpen={updateOpen} setIsOpen={setUpdateOpen} current={current} setCurrent={setCurrent} />
      <UpdateAccountPasswordDialog isOpen={passOpen} setIsOpen={setPassOpen} current={current} setCurrent={setCurrent}/>
    </div>
  );
}

export default withAuthentication(AuthMenu)