import React from 'react';
import {
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { TurnRight, TurnLeft, Straight, Navigation } from '@mui/icons-material';

const NavigationGuide = ({ steps, distance, duration }) => {
  const getIcon = (instruction) => {
    const lower = instruction.toLowerCase();
    if (lower.includes('right')) return <TurnRight />;
    if (lower.includes('left')) return <TurnLeft />;
    if (lower.includes('straight')) return <Straight />;
    return <Navigation />;
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Navigation Guide
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Distance: {distance} km | Duration: {duration} min
        </Typography>
      </Box>
      <List>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemIcon>
                {getIcon(step.instruction)}
              </ListItemIcon>
              <ListItemText
                primary={step.instruction}
                secondary={`${step.distance} meters`}
              />
            </ListItem>
            {index < steps.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default NavigationGuide;

