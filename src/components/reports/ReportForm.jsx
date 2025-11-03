import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert
} from '@mui/material';
import { REPORT_TYPES, REPORT_SEVERITY } from '../../utils/constants';
import MapSelector from './MapSelector'
const ReportForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    type: initialData.type || '',
    severity: initialData.severity || '',
    latitude: initialData.latitude || '',
    longitude: initialData.longitude || '',

  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMapSelect = (lat, lng) => {
    setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.latitude || !formData.longitude) {
      setError('Please select a location on the map');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Create Report
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
          required
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Report Type</InputLabel>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
            label="Report Type"
            required
          >
            <MenuItem value={REPORT_TYPES.STAIRS}>Stairs</MenuItem>
            <MenuItem value={REPORT_TYPES.DAMAGED_PATH}>Damaged Path</MenuItem>
            <MenuItem value={REPORT_TYPES.MISSING_TRAFFIC_LIGHT}>Missing Traffic Light</MenuItem>
            <MenuItem value={REPORT_TYPES.OBSTACLE}>Obstacle</MenuItem>
            <MenuItem value={REPORT_TYPES.NO_RAMP}>No Ramp</MenuItem>
            <MenuItem value={REPORT_TYPES.OTHER}>Other</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Severity</InputLabel>
          <Select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            label="Severity"
            required
          >
            <MenuItem value={REPORT_SEVERITY.LOW}>Low</MenuItem>
            <MenuItem value={REPORT_SEVERITY.MEDIUM}>Medium</MenuItem>
            <MenuItem value={REPORT_SEVERITY.HIGH}>High</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Click on the map to select location:
        </Typography>
        <MapSelector onSelect={handleMapSelect} />

        {/* Hiển thị tọa độ đã chọn */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField
            label="Latitude"
            value={formData.latitude}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Longitude"
            value={formData.longitude}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
          {onCancel && (
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default ReportForm;

