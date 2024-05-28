import React, {useState} from 'react'
import MuiAlert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import {SnackbarContextProvider} from './SnackbarContext'
import { Typography } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function SnackbarComponent(props) {
  const {children} = props

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    timeout: 3000,
    type: 'info',
  })

  const showSnackbar = (message, type, timeout = 3000) => {
    setSnackbar({
      open: true,
      message,
      timeout,
      type,
    })
  }

  const hideSnackbar = () => {
    setSnackbar({
      open: false,
      message: '',
      timeout: 3000,
    })
  }

  return (
    <SnackbarContextProvider value={{showSnackbar}}>
      {children}
      {snackbar.open ? (
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          open={snackbar.open}
          onClose={hideSnackbar}
          autoHideDuration={snackbar.timeout}
        >
          <Alert onClose={hideSnackbar} severity={snackbar.type} sx={{width: '100%'}}>
            {snackbar.message.includes('\n') ? (
              <Typography component="pre" style={{padding: 0, margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.875rem'}}>
                {snackbar.message}
              </Typography>
            ) : (
              <span>{snackbar.message}</span>
            )}
          </Alert>
        </Snackbar>
      ) : null}
    </SnackbarContextProvider>
  )
}
