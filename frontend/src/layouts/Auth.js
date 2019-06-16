import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import useValidState, { usernameValidator, emailValidator, 
  phoneValidator, emptyStringValidator, passwordValidator } from '../hooks/useValidState';
import withAuthentication from '../withs/withAuthentication';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Thiết kế bởi Đinh Mạnh Hoàng
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(2),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    margin: 'auto',
    marginTop: '40px',
    width: '90%',
    maxWidth: '900px',
    backgroundColor: theme.palette.background.paper,
  },
}));

function Register({ classes, register, loading }) {

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

  function handleSubmit() {
    register({
      username,
      password,
      name: {
        first: firstName,
        last: lastName,
      },
      dateOfBirth: dateOfBirth._d,
      address,
      email,
      phone,
    })
  }

  return (
    <Container component="main" maxWidth='md'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField 
                error={usernameError !== null}
                variant="outlined"
                label="Tên tài khoản"
                value={username}
                onChange={event => setUsername(event.target.value)}
                helperText={usernameError}
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                error={phoneError !== null}
                variant="outlined"
                label="Số điện thoại"
                value={phone}
                onChange={event => setPhone(event.target.value)}
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
                onChange={event => setEmail(event.target.value)}
                helperText={emailError}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type={'password'}
                error={passwordError !== null}
                variant="outlined"
                label="Mật khẩu"
                value={password}
                onChange={event => setPassword(event.target.value)}
                helperText={passwordError}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                type={'password'}
                error={rePasswordError !== null}
                variant="outlined"
                label="Nhập lại Mật khẩu"
                value={rePassword}
                onChange={event => setRePassword(event.target.value)}
                helperText={rePasswordError}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                error={firstNameError !== null}
                variant="outlined"
                label="Họ người dùng"
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
                helperText={firstNameError}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                error={lastNameError !== null}
                variant="outlined"
                label="Tên người dùng"
                value={lastName}
                onChange={event => setLastName(event.target.value)}
                helperText={lastNameError}
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
                onChange={event => setAddress(event.target.value)}
                fullWidth
                multiline
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={( loading
              || (usernameError !== null) 
              || (passwordError !== null)
              || (rePasswordError !== null)
              || (emailError !== null)
              || (phoneError !== null))}
          >
            Đăng Ký
          </Button>
        </form>
      </div>
    </Container>
  )
}

function Login({ classes, login, loading }) {

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleSubmit() {
    login({
      username,
      password,
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Tên tài khoản"
            autoFocus
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Mật khẩu"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={loading}
          >
            Đăng Nhập
          </Button>
        </form>
      </div>
    </Container>
  )
}

function Auth({ authenticationAction, authenticationState, history }) {

  const classes = useStyles();

  const { login, register } = authenticationAction
  const { error, loading, auth } = authenticationState

  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  React.useEffect(() => {
    if (auth != null) {
      history.push('/')
    }
  }, [auth])

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab icon={<LockOutlinedIcon />} label="ĐĂNG NHẬP" />
        <Tab icon={<CreateOutlinedIcon />} label="ĐĂNG KÝ" />
      </Tabs>
      {value === 0 && <Login classes={classes} login={login} loading={loading} />}
      {value === 1 && <Register classes={classes} register={register} loading={loading} />}
      <Box mt={3}>
        <MadeWithLove />
        {error !== null && <Typography variant='body1' color='error' align='center'>{error.message}</Typography>}
      </Box>
    </Paper>
  );
}

export default withAuthentication(Auth)