import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Pending } from '@mui/icons-material';
import { formatDateTime } from '../../utils/helpers';
import { toast } from 'react-toastify';

const ReportCard = ({ report, onEdit, onDelete }) => {
  const getSeverityColor = (severity) => {
    const colors = {
      high: 'error',
      medium: 'warning',
      low: 'info'
    };
    return colors[severity] || 'default';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'info',
      rejected: 'error',
      approved: 'success'
    };
    return colors[status] || 'default';
  };

  return (
    <Card sx={{ mb: 2 }}>
      {report.images && report.images[0] && (
        <CardMedia
          component="img"
          height="200"
          image={report.images[0]}
          alt={report.name}
        />
      )}
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {report.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {report.description}
            </Typography>
          </Box>
          <Box>
            {onEdit && (
              <IconButton onClick={() => onEdit(report)} size="small">
                <EditIcon />
              </IconButton>
            )}
            {onDelete && (
              <IconButton onClick={() => onDelete(report.id)} size="small" color="error">
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
          <Chip label={report.type.replace('_', ' ')} size="small" variant="outlined" />
          <Chip 
            label={report.severity} 
            size="small" 
            color={getSeverityColor(report.severity)}
          />
          <Chip label={report.status} size="small" color={getStatusColor(report.status)}/>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {formatDateTime(report.createdAt)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReportCard;

