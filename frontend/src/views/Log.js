import React from "react";
import { Grid, Typography } from "@material-ui/core";
import LineChart from '../components/Chart/LineChart';
import LatestLogTable from '../components/Table/LatestLogTable';

import withAuthentication from '../withs/withAuthentication'
import _ from 'lodash';

function Log({ authenticationState }) {

  const { auth } = authenticationState

  const permissionLevel = Math.min(parseInt(_.get(auth, 'permission.log', '0')), parseInt(_.get(auth, 'role.permission.log', '0')))


  return (
    <div>
      { permissionLevel === 0 && 
        <Typography align='center' variant='h4'>Bạn không có quyền truy cập mục này</Typography>   
      }
      { permissionLevel > 0 && 
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12}>
            <LineChart zoomable={true} title={"Thống kê Log theo theo thành phố và thời gian"} showDateRangePicker={true} />
          </Grid>
          <Grid item xs={12}>
            <LatestLogTable />
          </Grid>
        </Grid>   
      }  
    </div>
  )

}

export default withAuthentication(Log)