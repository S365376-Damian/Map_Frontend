import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Chip, Typography, Box } from '@mui/material';

const ReportMarker = ({ report, onClick }) => {
  const getIcon = (type, severity) => {
    const colors = {
      stairs: severity === 'high' ? '#d32f2f' : severity === 'medium' ? '#f57c00' : '#ffb74d',
      damaged_path: severity === 'high' ? '#d32f2f' : severity === 'medium' ? '#f57c00' : '#ffb74d',
      missing_traffic_light: severity === 'high' ? '#d32f2f' : severity === 'medium' ? '#f57c00' : '#ffb74d',
      obstacle: severity === 'high' ? '#7b1fa2' : severity === 'medium' ? '#9c27b0' : '#ba68c8',
      no_ramp: severity === 'high' ? '#5d4037' : severity === 'medium' ? '#8d6e63' : '#a1887f',
      other: '#616161'
    };
    
    return L.divIcon({
      className: 'report-marker',
      html: `<div style="
        background-color: ${colors[type] || '#616161'};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 14px;
      ">⚠</div>`,
      iconSize: [30, 30]
    });
  };

  const getSeverityColor = (severity) => {
    const colors = {
      high: 'error',
      medium: 'warning',
      low: 'info'
    };
    return colors[severity] || 'default';
  };

  return (
    <Marker
      position={[report.latitude, report.longitude]}
      icon={getIcon(report.type, report.severity)}
      eventHandlers={{
        click: () => onClick && onClick(report)
      }}
    >
      <Popup>
        <Box sx={{ minWidth: 200 }}>
          <Typography variant="h6" gutterBottom>
            {report.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {report.description}
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              label={report.type.replace('_', ' ')} 
              size="small" 
              variant="outlined"
            />
            <Chip 
              label={report.severity} 
              size="small" 
              color={getSeverityColor(report.severity)}
            />
          </Box>
          {report.images && report.images.length > 0 && (
            <img 
              src={report.images[0]} 
              alt={report.name}
              style={{ width: '100%', marginTop: 8 }}
            />
          )}
        </Box>
      </Popup>
    </Marker>
  );
};

export default ReportMarker;

