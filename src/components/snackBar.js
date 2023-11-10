import React from 'react'
import { Snackbar, Alert } from '@mui/material'

const SnackBar = ({ message, showAlert, setShowAlert, alertSeverity}) => {
  return (
    <div>
        <Snackbar
              open={showAlert}
              autoHideDuration={6000}
              onClose={() => setShowAlert(false)}
              message={message}
            >
              <Alert severity={alertSeverity}>{showAlert}</Alert>
            </Snackbar>
    </div>
  )
}

export default SnackBar