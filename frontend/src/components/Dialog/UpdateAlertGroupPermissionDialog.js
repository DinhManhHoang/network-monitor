import React from 'react';
import { Dialog, DialogTitle, DialogContent, Container, DialogActions,
  Button, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import withUpdateAlertGroup from '../../withs/withUpdateAlertGroup';
import withGetAllAccounts from '../../withs/withGetAllAccounts';

const useStyles = makeStyles(theme => ({
  paper1: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    margin: 'auto',
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    height: 220,
    overflow: 'auto',
  },
  button: {
  },
}));

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

function UpdateAlertGroupPermissionDialog({ isOpen, setIsOpen, current, setCurrent, updateAlertGroupState, updateAlertGroupAction, getAllAccountsState }) {

  const { updateAlertGroup } = updateAlertGroupAction
  const { accounts } = getAllAccountsState
  const classes = useStyles()

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState(accounts);

  React.useEffect(() => {
    let _left = []
    let _right = []
    accounts.forEach(account => {
      let isSubcribed = false
      for (let index in _.get(current, 'accounts', [])) {
        if (current.accounts[index]._id === account._id) {
          isSubcribed = true
          break
        }
      }
      if (isSubcribed) {
        _left.push(account)
      } else {
        _right.push(account)
      }
    })
    setLeft(_left)
    setRight(_right)
  }, [current])

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items, name) => (
    <div>
      <Typography variant='body1' align='center' color={name === 'Nhận' ? 'primary' : 'secondary'}>{name}</Typography>
      <Paper className={classes.paper}>
        <List dense>
          {items.map(value => (
            <ListItem key={value._id} role={undefined} button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple />
              </ListItemIcon>
              <ListItemText primary={`${value.username}`} />
            </ListItem>
          ))}
          <ListItem />
        </List>
      </Paper>
    </div>
  );

  if (updateAlertGroupState.loading === true) {
    return (<Typography variant='body1'>Đang tải...</Typography>)
  }

  if (updateAlertGroupState.error === true) {
    return (<Typography variant='body1'>Đã xảy ra lỗi</Typography>)
  }

  function handleCloseDialog(submit) {
    return function(event) {
      if (submit === true) {
        const newAlertGroup = {
          _id: current._id,
          accounts: left.map(account => account._id)
        } 
        updateAlertGroup(newAlertGroup)
      }
      setCurrent(null)
      setIsOpen(false)
    }
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth='md'
        open={isOpen}
        onClose={handleCloseDialog(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Chỉnh sửa nhóm cảnh báo"}</DialogTitle>
        <DialogContent dividers>
          <Container component="main" maxWidth="md">
            <div className={classes.paper1}>
              <Typography component="h1" variant="h5">
                Thông tin tài khoản nhận cảnh báo
              </Typography>
              <Grid container spacing={1} justify="center" alignItems="center" className={classes.root}>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>{customList(left, "Nhận")}</Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        fullWidth
                        className={classes.button}
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                      >
                        ≫
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        fullWidth
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                      >
                        &gt;
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>{customList(right, "Không nhận")}</Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        fullWidth
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                      >
                        &lt;
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        fullWidth
                        className={classes.button}
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                      >
                        ≪
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
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

export default withUpdateAlertGroup(withGetAllAccounts(UpdateAlertGroupPermissionDialog));