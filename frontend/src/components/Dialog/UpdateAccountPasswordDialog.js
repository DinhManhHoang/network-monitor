import React from 'react';
import { Dialog, DialogTitle, DialogContent, Container, DialogActions,
  Button, Typography, Grid, TextField, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import withUpdateAccount from '../../withs/withUpdateAccount';
import useValidState, { passwordValidator } from '../../hooks/useValidState';
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
}));

function UpdateAccountPasswordDialog({ isOpen, setIsOpen, current, setCurrent, updateAccountState, updateAccountAction, }) {

  const { updateAccount } = updateAccountAction
  const classes = useStyles();

  const [oldPassword, oldPasswordError, setOldPassword] = useValidState('', (value) => {
    if (value !== _.get(current, 'password', '')) return "Nhập mật khẩu cũ không đúng"
    return null;
  })
  const [password, passwordError, setPassword] = useValidState('', passwordValidator)
  const [rePassword, rePasswordError, setRePassword] = useValidState('', (value) => {
    const result = passwordValidator(value)
    if (result !== null) return result
    if (value !== password) return "Nhập lại mật khẩu không khớp"
    return null;
  })

  React.useEffect(() => {
    setOldPassword('')
    setPassword('')
    setRePassword('')
  }, [current])

  function handleChangeOldPassword(event) {
    setOldPassword(event.target.value)
  }

  function handleChangePassword(event) {
    setPassword(event.target.value)
  }

  function handleChangeRePassword(event) {
    setRePassword(event.target.value)
  }

  function handleCloseDialog(submit) {
    return function(event) {
      if (submit === true) {
        const newAccount = {
          _id: current._id,
          password: password
        }
        updateAccount(newAccount)
      }
      setCurrent(null)
      setIsOpen(false)
    }
  }

  if ((updateAccountState.loading === true)) {
    return (<Typography variant='body1'>Đang tải...</Typography>)
  }

  if ((updateAccountState.error === true)) {
    return (<Typography variant='body1'>Đã xảy ra lỗi</Typography>)
  }

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleCloseDialog(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Tùy chỉnh tài khoản"}</DialogTitle>
        <DialogContent dividers>
          <Container component="main" maxWidth="md">
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Đổi mật khẩu
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      type={'password'}
                      error={oldPasswordError !== null}
                      variant="outlined"
                      label="Mật khẩu cũ"
                      value={oldPassword}
                      onChange={handleChangeOldPassword}
                      helperText={oldPasswordError}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type={'password'}
                      error={passwordError !== null}
                      variant="outlined"
                      label="Mật khẩu mới"
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
                      label="Nhập lại mật khẩu mới"
                      value={rePassword}
                      onChange={handleChangeRePassword}
                      helperText={rePasswordError}
                      fullWidth
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
            disabled={((rePasswordError !== null) 
              || (oldPasswordError !== null)
              || (passwordError !== null))}
          >
            Gửi
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default withUpdateAccount(UpdateAccountPasswordDialog);