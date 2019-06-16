import React from "react";
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Typography, Divider, List, ListItem, ListItemText } from '@material-ui/core'

async function getAuthenticationData() {
  try {
    // Todo: Add authentication header
    const result = await axios({
      url: '/api/logs',
      method: 'get',
      params: {
        page: 0,
        rowPerPage: 30,
      }
    })
    return result.data.logs
  } catch (e) {
    return []
  }
}

function LogList() {

  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    setLoading(true)
    getAuthenticationData().then(_data => {
      setData(_data.map(col => ({
        ip: col.ip,
        updatedAt: col.updatedAt,
      })))
    })
  }, [])

  return (
    <List
      dense
      style={{
        maxHeight: '400px',
        overflowY: 'auto',
        width: '100%',
      }}
    >
      {data.map((col, key) => (
        <React.Fragment>
        <ListItem key={key}>
          <ListItemText>
            <Typography>{`IP: ${col.ip}`}</Typography>
            <Typography>{`Thời gian: ${(new Date(col.updatedAt)).toLocaleDateString()}`}</Typography>
          </ListItemText>
        </ListItem>
        <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}

export default LogList;