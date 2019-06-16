import React from 'react';
import withThemeColor from '../../containers/withThemeColor';
import { Button, Menu, MenuItem, Typography } from '@material-ui/core';

const colorTheme = [{
    mainColor: '#18832f',
    subColor: '#be3311',
  },{
    mainColor: '#2196F3',
    subColor: '#EF5350', 
  }, {
    mainColor: '#3F51B5',
    subColor: '#FFC107', 
  }, {
    mainColor: '#673AB7',
    subColor: '#2196F3', 
  }, {
    mainColor: '#E91E63',
    subColor: '#42A5F5', 
  }, {
    mainColor: '#FF5722',
    subColor: '#3F51B5', 
  }, {
    mainColor: '#CDDC39',
    subColor: '#009688', 
  }, {
    mainColor: '#009688',
    subColor: '#FDD835', 
  }, {
    mainColor: '#607D8B',
    subColor: '#F06292', 
  }, {
    mainColor: '#795548',
    subColor: '#FFCA28', 
  }, {
    mainColor: '#9E9E9E',
    subColor: '#FF7043', 
  }
]

function MainColorPicker({ themeColorAction }) {

  const { setColor } = themeColorAction
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(colorTheme) {
    return function() {
      setColor(colorTheme)
      setAnchorEl(null);
    }
  }

  return (
    <div>
      <Button
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Typography variant='h6' color='primary'>Network Monitor</Typography>
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose({})}
        PaperProps={{
          style: {
            maxHeight: 48 * 5,
            width: 200,
          },
        }}
      >
        {colorTheme.map((color, key) => (
          <MenuItem key={key} onClick={handleClose({ mainColor: color.mainColor, subColor: color.subColor })}>  
            <p style={{ fontSize: '1em', color: `${color.mainColor}`}}>Main</p>
            <p>-</p>
            <p style={{ fontSize: '1em', color: `${color.subColor}`}}>Sub</p>
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default withThemeColor(MainColorPicker)