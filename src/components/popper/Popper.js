import React from 'react'
import { DialogTitle, DialogContent, DialogActions, Button, Dialog, Typography } from '@mui/material';

const Popper = (props) => {
    const { size, title,  open, setOpen } = props;

      const handleOk = () => {
            setOpen(false)
      };
  return (
    <Dialog
                  sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 600 } }}
                  maxWidth={size}

                  open={open}
            >
                  <DialogActions>
                        <Button onClick={handleOk} color="warning">X</Button>
                        
                  </DialogActions>
                  <DialogTitle fontFamily="'Lora', sans-serif">{title}</DialogTitle>
                  
                  <DialogContent dividers>
                        {props.children}
                  </DialogContent>


            </Dialog>
  )
}

export default Popper;