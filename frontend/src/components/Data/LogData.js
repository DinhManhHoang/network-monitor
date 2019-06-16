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
    })
    return result.data.total
  } catch (e) {
    return []
  }
}

function LogData() {

  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    setLoading(true)
    getAuthenticationData().then(total => {
      setData(total)
    })
  }, [])

  return (
    <Typography variant='h5'>{data}</Typography>
  );
}

export default LogData;