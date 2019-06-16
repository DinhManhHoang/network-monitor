import React, { useState } from 'react';
import { Tabs, Tab, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const MyTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: 'column',
    height: '100%',
  },
  indicator: {
    display: 'none',
  }
}))(Tabs)

const MyTab = withStyles(theme => ({
  root: {
    flex: 1,
    borderRight: `2px solid ${theme.palette.background.default}`,
  },
  selected: {
    color: theme.palette.primary.main,
    borderRight: `2px solid ${theme.palette.primary.main}`,
  }
}))(Tab);

function VerticalTab() {

  const [tab, setTab] = useState(0)

  const handleChange = (_, activeIndex) => setTab(activeIndex)

  return (
    <Paper
      style={{
        display: 'flex',
        height: '100%',
      }}
    >
      <MyTabs
        value={tab}
        onChange={handleChange}
      >
        <MyTab label='item one' />
        <MyTab label='item two' />
        <MyTab label='item three' />
      </MyTabs>

      { tab === 0 && <TabContainer>Item One</TabContainer> }
      { tab === 1 && <TabContainer>Item Two</TabContainer> }
      { tab === 2 && <TabContainer>Item Three</TabContainer> }
    </Paper>
  )
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 24, }}>
      {props.children}
    </Typography>
  );
}

export default VerticalTab;