import React from 'react';
import { 
  IconButton, Menu, MenuItem, Badge,
} from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import withGetAllAlertMessages from '../../withs/withGetAllAlertMessages';
import withAuthentication from '../../withs/withAuthentication';
import _ from 'lodash';
import { Link } from "react-router-dom";
import socket from '../../socket';
import { BROADCAST } from '../../socket/alertMessages';

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

function PopupMenu({ getAllAlertMessagesState, getAllAlertMessagesAction, authenticationState }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { auth } = authenticationState
  const [messages, setMessages] = React.useState([])

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  React.useEffect(() => {
    socket.on(BROADCAST, (data) => {
      let receivedAlertMessage = []
      _.get(data, 'data', []).forEach(alertMessage => {
        if ((_.get(alertMessage, 'group.accounts', []).includes(_.get(auth, '_id', '-1'))) 
        && (_.get(alertMessage, 'sent', '-1') === '0')) {
          receivedAlertMessage.push(
            _.get(alertMessage, 'popupMes', '')
          )
        }
      })
      setMessages(receivedAlertMessage)
    })
  }, [])

  return (
    <div>
      <IconButton
        aria-label="More"
        aria-owns={open ? 'long-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="primary"
      >
        <Badge color='error' badgeContent={messages.length} max={99} invisible={messages.length === 0} >
          <WarningIcon />
        </Badge>
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
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
          },
        }}
      >
        {messages.map((message, key) => (
          <MenuItem key={key} component={Link} to={'/alert'} onClick={handleClose}>
            {message}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default withGetAllAlertMessages(withAuthentication(PopupMenu))