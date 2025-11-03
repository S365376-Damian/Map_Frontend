import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Chip,
  TextField
} from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';

const ReportVerification = ({ report, onApprove, onReject }) => {
  const [rejectReason, setRejectReason] = React.useState('');
  const [showRejectForm, setShowRejectForm] = React.useState(false);

  const handleReject = () => {
    if (rejectReason.trim()) {
      onReject(report.id, rejectReason);
      setShowRejectForm(false);
      setRejectReason('');
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      {report.images && report.images[0] && (
        <CardMedia
          component="img"
          height="300"
          image={report.images[0]}
          alt={report.name}
        />
      )}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {report.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {report.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
          <Chip label={report.type.replace('_', ' ')} size="small" variant="outlined" />
          <Chip label={report.severity} size="small" />
          <Chip label={`Lat: ${report.latitude}`} size="small" />
          <Chip label={`Lng: ${report.longitude}`} size="small" />
        </Box>
        {report.status == 'pending' && (
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckIcon />}
              onClick={() => onApprove(report.id)}
            >
              Approve
            </Button>
            {!showRejectForm ? (
              <Button
                variant="contained"
                color="error"
                startIcon={<CloseIcon />}
                onClick={() => setShowRejectForm(true)}
              >
                Reject
              </Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 1, flex: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Reject Reason"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleReject}
                  disabled={!rejectReason.trim()}
                >
                  Confirm
                </Button>
                <Button onClick={() => setShowRejectForm(false)}>
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
        )}
        
      </CardContent>
    </Card>
  );
};

export default ReportVerification;

