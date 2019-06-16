import React from 'react';
import { Dialog, DialogTitle, DialogContent, Container, DialogActions,
  Button, Typography, Grid, TextField, } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';

import withUpdateWebsite from '../../withs/withUpdateWebsite';
import withDeleteWebsite from '../../withs/withDeleteWebsite';
import useValidState, { notEmptyStringValidator } from '../../hooks/useValidState';
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

function UpdateAccountDialog({ isOpen, setIsOpen, current, setCurrent, updateWebsiteState, updateWebsiteAction, deleteWebsiteState, deleteWebsiteAction }) {

  const { updateWebsite } = updateWebsiteAction
  const { deleteWebsite } = deleteWebsiteAction
  const classes = useStyles();

  const [name, setName] = React.useState('')
  const [url, urlError, setUrl] = useValidState('', notEmptyStringValidator)

  function handleChangeName(event) {
    setName(event.target.value)
  }

  function handleChangeURL(event) {
    setUrl(event.target.value)
  }

  React.useEffect(() => {
    setName(_.get(current, 'name', ''))
    setUrl(_.get(current, 'url', ''))
  }, [current])

  if ((updateWebsiteState.loading === true)) {
    return (<Typography variant='body1'>Đang tải...</Typography>)
  }

  if ((updateWebsiteState.error === true)) {
    return (<Typography variant='body1'>Đã xảy ra lỗi</Typography>)
  }

  function handleCloseDialog(submit, isDelete = false) {
    return function(event) {
      if (submit === true) {
        const newWebsite = {
          _id: current._id,
          name,
          url,
        }
        if (isDelete === true) {
          deleteWebsite(newWebsite)
        } else {
          updateWebsite(newWebsite)
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
        <DialogTitle id="responsive-dialog-title">{"Tùy chỉnh website"}</DialogTitle>
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
          <Button onClick={handleCloseDialog(true, true)} color="secondary">
            Xóa trang web
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

export default withUpdateWebsite(withDeleteWebsite(UpdateAccountDialog));