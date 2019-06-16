import React from 'react';
import { Dialog, DialogTitle, DialogContent, Container, DialogActions,
  Button, Typography, Grid, TextField, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import useValidState, { usernameValidator, emailValidator, phoneValidator, emptyStringValidator, passwordValidator } from '../../hooks/useValidState';

import withAddAccount from '../../withs/withAddAccount';
import withGetAllAccounts from '../../withs/withGetAllAccounts';
import withGetAllAccountGroups from '../../withs/withGetAllAccountGroups';

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

function AddAccountDialog({ isOpen, setIsOpen, addAccountState, addAccountAction, getAllAccountsAction, getAllAccountGroupsState }) {

  const { addAccount } = addAccountAction
  const { accountGroups } = getAllAccountGroupsState
  const classes = useStyles()

  const [username, usernameError, setUsername] = useValidState('', usernameValidator)
  const [email, emailError, setEmail] = useValidState('', emailValidator)
  const [phone, phoneError, setPhone] = useValidState('', phoneValidator)
  const [firstName, firstNameError, setFirstName] = useValidState('', emptyStringValidator)
  const [lastName, lastNameError, setLastName] = useValidState('', emptyStringValidator)
  const [password, passwordError, setPassword] = useValidState('', passwordValidator)
  const [rePassword, rePasswordError, setRePassword] = useValidState('', (value) => {
    const result = passwordValidator(value)
    if (result !== null) return result
    if (value !== password) return "Nhập lại mật khẩu không khớp"
    return null;
  })
  const [dateOfBirth, , setDateOfBirth] = useValidState(moment(undefined))
  const [address, , setAddress] = useValidState('')

  function handleChangeUsername(event) {
    setUsername(event.target.value)
  }

  function handleChangePassword(event) {
    setPassword(event.target.value)
  }

  function handleChangeRePassword(event) {
    setRePassword(event.target.value)
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

  if ((addAccountState.loading === true)) {
    return (<Typography variant='body1'>Đang tải...</Typography>)
  }

  if ((addAccountState.error === true)) {
    return (<Typography variant='body1'>Đã xảy ra lỗi</Typography>)
  }

  const groupData = accountGroups.map(group => ({
    _id: group._id,
    groupname: group.groupname,
  }))

  function handleCloseDialog(submit) {
    return function(event) {
      if (submit === true) {
        const newAccount = {
          username: username,
          password: password,
          name: {
            first: firstName,
            last: lastName,
          },
          dateOfBirth: dateOfBirth._d,
          address: address,
          email: email,
          phone: phone,
        }
        addAccount(newAccount)
      }
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
        <DialogTitle id="responsive-dialog-title">{"Thêm tài khoản"}</DialogTitle>
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
                  <Grid item xs={12}>
                    <TextField
                      type={'password'}
                      error={passwordError !== null}
                      variant="outlined"
                      label="Mật khẩu"
                      value={password}
                      onChange={handleChangePassword}
                      helperText={passwordError}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      type={'password'}
                      error={rePasswordError !== null}
                      variant="outlined"
                      label="Nhập lại Mật khẩu"
                      value={rePassword}
                      onChange={handleChangeRePassword}
                      helperText={rePasswordError}
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
            Hủy bỏ
          </Button>
          <Button onClick={handleCloseDialog(true)} color="primary" 
            disabled={((usernameError !== null) 
              || (passwordError !== null)
              || (rePasswordError !== null)
              || (emailError !== null)
              || (phoneError !== null))}
          >
            Gửi
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default withAddAccount(withGetAllAccounts(withGetAllAccountGroups(AddAccountDialog)));