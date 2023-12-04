import React from 'react'
import { Grid,  FormGroup } from '@mui/material';

const AddBooksModal = ({children}) => {
  return (
    <FormGroup >
    <Grid container spacing={2}>
      {children}
    </Grid>
  </FormGroup>
  )
}

export default AddBooksModal;