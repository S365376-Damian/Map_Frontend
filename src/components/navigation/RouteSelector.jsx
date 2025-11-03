import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Paper
} from '@mui/material';
import { Route as RouteIcon } from '@mui/icons-material';
import { ROUTE_MODE } from '../../utils/constants';

const RouteSelector = ({ onPlanRoute, startLocation, endLocation }) => {
  const [mode, setMode] = useState('shortest');
  const [start, setStart] = useState(startLocation || '');
  const [end, setEnd] = useState(endLocation || '');

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  const handlePlanRoute = () => {
    if (start && end) {
      onPlanRoute(start, end, mode);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          label="Start Location"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          placeholder="Enter start address"
        />
        <TextField
          fullWidth
          label="End Location"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          placeholder="Enter destination"
        />
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          fullWidth
        >
          <ToggleButton value={ROUTE_MODE.SHORTEST}>
            Shortest Route
          </ToggleButton>
          <ToggleButton value={ROUTE_MODE.SAFEST}>
            Safest Route
          </ToggleButton>
        </ToggleButtonGroup>
        <Button
          variant="contained"
          startIcon={<RouteIcon />}
          onClick={handlePlanRoute}
          disabled={!start || !end}
          fullWidth
        >
          Plan Route
        </Button>
      </Box>
    </Paper>
  );
};

export default RouteSelector;

