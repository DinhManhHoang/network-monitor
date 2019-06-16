import React from "react";
import { Grid, Typography } from "@material-ui/core";
import AccountTable from '../components/Table/AccountTable';

import withAuthentication from '../withs/withAuthentication'
import _ from 'lodash';

function User({ authenticationState }) {

  const { auth } = authenticationState

  const permissionLevel = Math.min(parseInt(_.get(auth, 'permission.user', '0')), parseInt(_.get(auth, 'role.permission.user', '0')))


  return (
    <div>
      { permissionLevel === 0 && 
        <Typography align='center' variant='h4'>Bạn không có quyền truy cập mục này</Typography>   
      }
      { permissionLevel > 0 && 
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12}>
            <AccountTable permissionLevel={permissionLevel} />
          </Grid>
        </Grid>   
      }
    </div>
  )

}

export default withAuthentication(User)