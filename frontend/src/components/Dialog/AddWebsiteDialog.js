import React from 'react';
import { Dialog, DialogTitle, DialogContent, Container, DialogActions,
  Button, Typography, Grid, TextField, } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useValidState, { notEmptyStringValidator } from '../../hooks/useValidState';

import withAddWebsite from '../../withs/withAddWebsite';

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

function AddAccountDialog({ isOpen, setIsOpen, addWebsiteState, addWebsiteAction }) {

  const { addWebsite } = addWebsiteAction
  const classes = useStyles()

  const [name, setName] = React.useState('')
  const [url, urlError, setUrl] = useValidState('', notEmptyStringValidator)

  function handleChangeName(event) {
    setName(event.target.value)
  }

  function handleChangeURL(event) {
    setUrl(event.target.value)
  }

  if ((addWebsiteState.loading === true)) {
    return (<Typography variant='body1'>Đang tải...</Typography>)
  }

  if ((addWebsiteState.error === true)) {
    return (<Typography variant='body1'>Đã xảy ra lỗi</Typography>)
  }

  function handleCloseDialog(submit) {
    return function(event) {
      if (submit === true) {
        const newWebsite = {
          name,
          url,
          data: {
            respondCode : "200",
            lastChecked : "1 phút trước",
            respondTime : `${Math.floor(Math.random() * 700)} ms`,
          }
        }
        addWebsite(newWebsite)
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
        <DialogTitle id="responsive-dialog-title">{"Thêm website"}</DialogTitle>
        <DialogContent dividers>
          <Container component="main" maxWidth="md">
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Thông tin Website
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField 
                      variant="outlined"
                      label="Tên trang"
                      value={name}
                      onChange={handleChangeName}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={urlError !== null}
                      variant="outlined"
                      label=" Địa chỉ URL"
                      value={url}
                      onChange={handleChangeURL}
                      helperText={urlError}
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
            disabled={urlError !== null}
          >
            Gửi
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default withAddWebsite(AddAccountDialog);