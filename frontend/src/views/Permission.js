import React from "react";
import { Grid, Typography } from "@material-ui/core";
import AccountGroupPermissionTable from '../components/Table/AccountGroupPermissionTable';
import AccountPermissionTable from '../components/Table/AccountPermissionTable';
import AlertGroupPermissionTable from '../components/Table/AlertGroupPermissionTable'

import withAuthentication from '../withs/withAuthentication'
import _ from 'lodash';

function Permission({ authenticationState }) {

  const { auth } = authenticationState

  const permissionLevel = Math.min(parseInt(_.get(auth, 'permission.permission', '0')), parseInt(_.get(auth, 'role.permission.permission', '0')))


  return (
    <div>
      { permissionLevel === 0 && 
        <Typography align='center' variant='h4'>Bạn không có quyền truy cập mục này</Typography>   
      }
      { permissionLevel > 0 && 
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12}>
            <AccountGroupPermissionTable permissionLevel={permissionLevel} />
          </Grid>
          <Grid item xs={12}>
            <AccountPermissionTable permissionLevel={permissionLevel} />
          </Grid>
          <Grid item xs={12}>
            <AlertGroupPermissionTable permissionLevel={permissionLevel} />
          </Grid>
        </Grid>   
      }
    </div>
  )

}

export default withAuthentication(Permission)