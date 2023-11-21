import React, {useState} from 'react'
import { Grid, TextField, Button, FormGroup } from '@mui/material';

const SettingsModal = (props) => {
  console.log(props.editingField)
    
    const [updateDetails, setUpdateDetails] = useState({
        first_name: "",
        last_name: "",
        
        
      })

      const handleValueChange = (e) => {
        setUpdateDetails({ ...updateDetails, [e.target.name]: e.target.value })
      }

      const handleUpdate = () => {
        console.log('will write update function')
      }

  return (
    <FormGroup >
    <Grid container spacing={2}>
      {props.editingField === 'names' ? (
        <>
        <Grid item xs={6}>
        <TextField type='text' name='service_name' value={updateDetails.first_name} fullWidth size='small' label='First Name' required InputLabelProps={{ shrink: true }} onChange={handleValueChange} />
      </Grid>
      <Grid item xs={6}>
        <TextField type='text' name='service_code' value={updateDetails.last_name} fullWidth size='small' label='Last Name' required InputLabelProps={{ shrink: true }} onChange={handleValueChange} />
      </Grid>
     
        </>
        

      ):null}
      
      
      <Grid item xs={12}>
        <Button type='submit' onClick={handleUpdate}>Update</Button>
      </Grid>

    </Grid>
  </FormGroup>
  )
}

export default SettingsModal