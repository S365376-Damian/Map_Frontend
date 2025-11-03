import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

const AlertBadge = ({ open, message, severity = 'warning', onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        icon={<WarningIcon />}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertBadge;

