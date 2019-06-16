import React from 'react';
import { Dialog, DialogTitle, DialogContent, Container, DialogActions,
  Button, Typography, Grid, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useValidState, { notEmptyStringValidator, emptyStringValidator } from '../../hooks/useValidState';
import _ from 'lodash';

import withUpdateAlertGroup from '../../withs/withUpdateAlertGroup';
import withDeleteAlertGroup from '../../withs/withDeleteAlertGroup';
import withGetAllAlertGroups from '../../withs/withGetAllAlertGroups';

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

function UpdateAlertGroupDialog({ isOpen, setIsOpen, current, setCurrent, updateAlertGroupState, updateAlertGroupAction, deleteAlertGroupState, deleteAlertGroupAction, getAllAlertGroupsAction }) {

  const { updateAlertGroup } = updateAlertGroupAction
  const { deleteAlertGroup } = deleteAlertGroupAction
  const classes = useStyles()

  const [groupname, groupnameError, setGroupname] = useValidState('', notEmptyStringValidator)
  const [groupdesc, groupdescError, setGroupdesc] = useValidState('', emptyStringValidator)
  const [popup, setPopup] = React.useState(false)
  const [email, setEmail] = React.useState(false)
  const [sms, setSMS] = React.useState(false)

  function handleChangeGroupname(event) {
    setGroupname(event.target.value)
  }

  function handleChangeGroupdesc(event) {
    setGroupdesc(event.target.value)
  }

  function handleChangePopup(event) {
    setPopup(!popup)
  }

  function handleChangeEmail(event) {
    setEmail(!email)
  }

  function handleChangeSMS(event) {
    setSMS(!sms)
  }

  React.useEffect(() => {
    setGroupname(_.get(current, 'groupname', ''))
    setGroupdesc(_.get(current, 'groupdesc', ''))
    setPopup(_.get(current, 'popupAlert', '0') === "1" ? true : false)
    setEmail(_.get(current, 'emailAlert', '0') === "1" ? true : false)
    setSMS(_.get(current, 'smsAlert', '0') === "1" ? true : false)
  }, [current])

  if ((updateAlertGroupState.loading === true) || (deleteAlertGroupState.loading === true)) {
    return (<Typography variant='body1'>Đang tải...</Typography>)
  }

  if ((updateAlertGroupState.error === true) || (deleteAlertGroupState.error === true)) {
    return (<Typography variant='body1'>Đã xảy ra lỗi</Typography>)
  }

  function handleCloseDialog(submit, isDelete = false) {
    return function(event) {
      if (submit === true) {
        const newAlertGroup = {
          _id: current._id,
          groupname,
          groupdesc,
          popupAlert: popup === true ? "1" : "0",
          emailAlert: email === true ? "1" : "0",
          smsAlert: sms === true ? "1" : "0",
        }
        if (isDelete === true) {
          deleteAlertGroup(newAlertGroup)
        } else {
          updateAlertGroup(newAlertGroup)
        }
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
        <DialogTitle id="responsive-dialog-title">{"Tùy chỉnh nhóm cảnh báo"}</DialogTitle>
        <DialogContent dividers>
          <Container component="main" maxWidth="md">
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Thông tin nhóm cảnh báo
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField 
                      error={groupnameError !== null}
                      variant="outlined"
                      label="Tên nhóm cảnh báo"
                      value={groupname}
                      onChange={handleChangeGroupname}
                      helperText={groupnameError}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      error={groupdescError !== null}
                      variant="outlined"
                      label="Mô tả nhóm cảnh báo"
                      value={groupdesc}
                      onChange={handleChangeGroupdesc}
                      helperText={groupdescError}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      fullWidth
                      control={
                        <Checkbox checked={popup} onChange={handleChangePopup} />
                      }
                      label="Popup"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      fullWidth 
                      control={
                        <Checkbox checked={email} onChange={handleChangeEmail} />
                      }
                      label="Email"
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
          <Button onClick={handleCloseDialog(true, true)} color="secondary">
            Xóa nhóm cảnh báo
          </Button>
          <Button onClick={handleCloseDialog(true)} color="primary" 
            disabled={((groupnameError !== null) 
              || (groupdescError !== null))}
          >
            Gửi
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default withUpdateAlertGroup(withDeleteAlertGroup(withGetAllAlertGroups(UpdateAlertGroupDialog)));