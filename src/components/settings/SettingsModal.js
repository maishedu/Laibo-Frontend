import React, {useState} from 'react'
import { Grid, TextField, Button, FormGroup } from '@mui/material';

const SettingsModal = ({children}) => {
  return (
    <FormGroup >
    <Grid container spacing={2}>
      {children}
    </Grid>
  </FormGroup>
  )
}

export default SettingsModal