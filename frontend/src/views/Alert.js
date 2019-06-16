import React from "react";
import { Grid, Typography } from "@material-ui/core";
import AlertGroupTable from '../components/Table/AlertGroupTable';
import AlertMessageTable from '../components/Table/AlertMessageTable';

import withAuthentication from '../withs/withAuthentication'
import _ from 'lodash';

function Alert({ authenticationState }) {

  const { auth } = authenticationState

  const permissionLevel = Math.min(parseInt(_.get(auth, 'permission.alert', '0')), parseInt(_.get(auth, 'role.permission.alert', '0')))

  return (
    <div>
      { permissionLevel === 0 && 
        <Typography align='center' variant='h4'>Bạn không có quyền truy cập mục này</Typography>   
      }
      { permissionLevel > 0 && 
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12}>
            <AlertMessageTable />
          </Grid>
          <Grid item xs={12}>
            <AlertGroupTable permissionLevel={permissionLevel} />
          </Grid>
        </Grid>  
      }   
    </div>
  )

}

export default withAuthentication(Alert)