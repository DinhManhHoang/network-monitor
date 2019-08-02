import React from "react";
import { Grid, Typography } from "@material-ui/core";
import WebsiteTable from '../components/Table/WebsiteTable';

import withAuthentication from '../withs/withAuthentication';
import _ from 'lodash';

function Website({ authenticationState }) {

  const { auth } = authenticationState

  const permissionLevel = Math.min(parseInt(_.get(auth, 'permission.website', '0')), parseInt(_.get(auth, 'role.permission.website', '0')))
  
  return (
    <div>
      { permissionLevel === 0 && 
        <Typography align='center' variant='h4'>Bạn không có quyền truy cập mục này</Typography>   
      }
      { permissionLevel > 0 && 
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12}>
            <WebsiteTable permissionLevel={permissionLevel} />
          </Grid>
        </Grid>   
      }
    </div>
  )

}

export default withAuthentication(Website)