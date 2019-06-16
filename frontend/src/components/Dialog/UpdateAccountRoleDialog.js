import React from 'react';
import { Dialog, DialogTitle, DialogContent, Container, DialogActions,
  Button, Typography, Grid, FormControl, Select, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import withUpdateAccount from '../../withs/withUpdateAccount';
import withGetAllAccountGroups from '../../withs/withGetAllAccountGroups';
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
  },
}));

function UpdateAccountRoleDialog({ isOpen, setIsOpen, current, setCurrent, updateAccountState, updateAccountAction, getAllAccountGroupsState }) {

  const { accountGroups } = getAllAccountGroupsState
  const { updateAccount } = updateAccountAction
  const classes = useStyles();
  const [role, setRole] = React.useState(0)


  function handleChangeRole(event) {
    setRole(event.target.value)
  }

  React.useEffect(() => {
    accountGroups.forEach((accountGroup, key) => {
      if (_.get(accountGroup, '_id', '0') === _.get(current, 'role._id', '-1'))
        setRole(key)
    })
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
          role: accountGroups[role]._id,
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
        <DialogTitle id="responsive-dialog-title">{"Tùy chỉnh tài khoản"}</DialogTitle>
        <DialogContent dividers>
          <Container component="main" maxWidth="md">
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Nhóm tài khoản
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel htmlFor="role-native-simple">Nhóm</InputLabel>
                      <Select
                        native
                        value={role}
                        onChange={handleChangeRole}
                        inputProps={{
                          name: 'role',
                          id: 'role-native-simple',
                        }}
                      >
                        {accountGroups.map((accountGroup, key) => (
                          <option key={key} value={key}>
                            {accountGroup.groupname}
                          </option>
                        ))}
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

export default withGetAllAccountGroups(withUpdateAccount(UpdateAccountRoleDialog));