import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container, Paper, Grid, Card, CardContent } from '@mui/material';
import { Map as MapIcon, Report as ReportIcon, Shield as ShieldIcon, Notifications as NotificationIcon, GpsFixed as GpsIcon, Security as SecurityIcon } from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <GpsIcon sx={{ fontSize: 60 }} />, title: 'Interactive Map', desc: 'Explore with OpenStreetMap' },
    { icon: <ShieldIcon sx={{ fontSize: 60 }} />, title: 'Safe Navigation', desc: 'Avoid dangerous routes' },
    { icon: <ReportIcon sx={{ fontSize: 60 }} />, title: 'Community Reports', desc: 'Share accessibility info' },
    { icon: <SecurityIcon sx={{ fontSize: 60 }} />, title: 'Verified Reports', desc: 'Admin-verified data' },
    { icon: <NotificationIcon sx={{ fontSize: 60 }} />, title: 'Real-time Alerts', desc: 'Get notified of hazards' },
    { icon: <MapIcon sx={{ fontSize: 60 }} />, title: 'Route Planning', desc: 'Plan your safest path' }
  ];

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: 'calc(100vh - 64px)',
      py: 8
    }}>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            mb: 8
          }}
        >
          <Typography 
            variant="h2" 
            gutterBottom
            sx={{ 
              color: 'white',
              fontWeight: 700,
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            🗺️ SafeMap
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'white',
              opacity: 0.9,
              mb: 4,
              maxWidth: 600
            }}
          >
            Navigate safely with community-powered accessibility information
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<MapIcon />}
              onClick={() => navigate('/map')}
              sx={{
                bgcolor: 'white',
                color: '#667eea',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              View Map
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ReportIcon />}
              onClick={() => navigate('/reports')}
              sx={{
                borderColor: 'white',
                color: 'white',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                '&:hover': { 
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              View Reports
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  },
                  bgcolor: 'white',
                  borderRadius: 3
                }}
              >
                <CardContent>
                  <Box sx={{ color: '#667eea', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {feature.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;

