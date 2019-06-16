import React from "react";
import { Grid, Typography } from "@material-ui/core";
import SimpleCard from '../components/Card/SimpleCard';
import IconCard from '../components/Card/IconCard';
import LogCountPieChart from '../components/Chart/LogCountPieChart';
import LogCountMapChart from '../components/Chart/LogCountMapChart';
import LogCountLineChart from '../components/Chart/LogCountLineChart';
import AlertMessagesPieChart from '../components/Chart/AlertMessagesPieChart';
import LogList from '../components/List/LogList';
import VerticalTab from '../components/Tab/VerticalTab';
import LogData from '../components/Data/LogData';
import CityData from '../components/Data/CityData';
import WebsiteData from '../components/Data/WebsiteData';
import UserData from '../components/Data/UserData';
import FontAwesomeIcon from '../components/FontAwesomeIcon/FontAwesomeIcon';

import withAuthentication from '../withs/withAuthentication'
import _ from 'lodash';

function Dashboard({ authenticationState }) {

  const { auth } = authenticationState

  const permissionLevel = Math.min(parseInt(_.get(auth, 'permission.dashboard', '0')), parseInt(_.get(auth, 'role.permission.dashboard', '0')))


  return (
    <div>
      { permissionLevel === 0 && 
        <Typography align='center' variant='h4'>Bạn không có quyền truy cập mục này</Typography>   
      }
      { permissionLevel > 0 &&
        <Grid container justify="center" spacing={2}>
          <Grid item md={3} xs={12}>
            <IconCard
              title={`Tổng số Log trong hệ thống`}
              content={<LogData />}
              icon={<FontAwesomeIcon iconClass={"fas fa-database"} />}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <IconCard 
              title={`Số thành phố quan sát`}
              content={<CityData />}
              icon={<FontAwesomeIcon iconClass={"fas fa-city"} />}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <IconCard  
              title={`Số website giám sát`}
              content={<WebsiteData />}
              icon={<FontAwesomeIcon iconClass={"fas fa-pager"} />}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <IconCard  
              title={`Số tài khoản hệ thống`}
              content={<UserData />}
              icon={<FontAwesomeIcon iconClass={"fas fa-user-circle"} />}
            />
          </Grid>
          <Grid item md={8} xs={12}>
            <SimpleCard title="Thống kê Log" content={<LogCountLineChart />} />
          </Grid>
          <Grid item md={4} xs={12}>
            <SimpleCard title="Cảnh báo hệ thống" content={<AlertMessagesPieChart />} />
          </Grid>
          <Grid item md={4} xs={12}>
            <SimpleCard title="Cơ cấu Log" content={<LogCountPieChart />} />
          </Grid>
          <Grid item md={4} xs={12}>
            <SimpleCard title="Bản đồ Việt Nam" content={<LogCountMapChart />} />
          </Grid>
          <Grid item md={4} xs={12}>
            <SimpleCard title="Sơ lược Log" content={<LogList />} />
          </Grid>
        </Grid>     
      } 
    </div>
  )

}

export default withAuthentication(Dashboard)