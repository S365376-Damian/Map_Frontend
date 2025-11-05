import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
  Drawer,
  IconButton,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import SearchBar from '../components/map/SearchBar';
import { useMapStore } from '../stores/map';
import { useReportsStore } from '../stores/reports';
import RoutingMachine from '../components/map/RoutingMachine';

// --- Fix default leaflet icons ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
});

// --- Map updater component ---
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom(), { duration: 0.8 });
    }
  }, [center, map]);
  return null;
};

// --- Sidebar Content (được dùng cho cả mobile & desktop) ---
const SidebarContent = ({
  startLocation,
  endLocation,
  startLocationName,
  endLocationName,
  approveReports,
  selectedReport,
  setSelectedReport,
  setStartLocation,
  setEndLocation,
  setStartLocationName,
  setEndLocationName,
  handleSearchSelect
}) => (
  <Box sx={{ p: 2, width: '100%', bgcolor: '#f5f5f5' }}>
    <Box sx={{ mb: 2 }}>
      {(!startLocation || !endLocation) ? (
        <>
          {!startLocation && <SearchBar label="From" onSelect={handleSearchSelect} />}
          {startLocation && !endLocation && (
            <SearchBar label="To" onSelect={handleSearchSelect} />
          )}
        </>
      ) : (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Paper sx={{ p: 1, flex: 1 }}>
            <Typography variant="body2">
              Route: {startLocationName} → {endLocationName}
            </Typography>
          </Paper>
          <Box
            component="button"
            onClick={() => {
              setStartLocation(null);
              setEndLocation(null);
              setStartLocationName('');
              setEndLocationName('');
            }}
            style={{
              padding: '6px 12px',
              border: 'none',
              backgroundColor: '#f44336',
              color: 'white',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Clear
          </Box>
        </Box>
      )}
    </Box>

    {startLocationName && (
      <Paper sx={{ p: 1, mb: 1, bgcolor: '#e3f2fd' }}>
        <Typography variant="caption" color="primary">
          From:
        </Typography>
        <Typography variant="body2">{startLocationName}</Typography>
      </Paper>
    )}

    {endLocationName && (
      <Paper sx={{ p: 1, mb: 1, bgcolor: '#f3e5f5' }}>
        <Typography variant="caption" color="secondary">
          To:
        </Typography>
        <Typography variant="body2">{endLocationName}</Typography>
      </Paper>
    )}

    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
      Reports on Map ({approveReports.length})
    </Typography>

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {approveReports.map((report) => (
        <Card
          key={report.id}
          sx={{
            cursor: 'pointer',
            bgcolor: selectedReport?.id === report.id ? '#e3f2fd' : 'white',
            '&:hover': { bgcolor: '#f5f5f5' }
          }}
          onClick={() => setSelectedReport(report)}
        >
          <CardContent sx={{ p: 1.5 }}>
            <Typography variant="subtitle2" fontWeight="bold">
              {report.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block' }}
            >
              {report.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, mt: 1, flexWrap: 'wrap' }}>
              <Chip
                label={report.type.replace('_', ' ')}
                size="small"
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
              <Chip
                label={report.severity}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.7rem',
                  bgcolor:
                    report.severity === 'high'
                      ? '#ffebee'
                      : report.severity === 'medium'
                      ? '#fff3e0'
                      : '#e8f5e9',
                  color:
                    report.severity === 'high'
                      ? '#c62828'
                      : report.severity === 'medium'
                      ? '#e65100'
                      : '#2e7d32'
                }}
              />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  </Box>
);

// --- Main Map Component ---
const Map = () => {
  const { center, zoom, setCenter } = useMapStore();
  const { approveReports, fetchApproveReports } = useReportsStore();
  const [selectedReport, setSelectedReport] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [startLocationName, setStartLocationName] = useState('');
  const [endLocationName, setEndLocationName] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  const getIcon = (type, severity) => {
    const colors = {
      stairs: severity === 'high' ? '#d32f2f' : severity === 'medium' ? '#f57c00' : '#ffb74d',
      damaged_path: severity === 'high' ? '#d32f2f' : severity === 'medium' ? '#f57c00' : '#ffb74d',
      missing_traffic_light: severity === 'high' ? '#d32f2f' : '#f57c00',
      obstacle: severity === 'high' ? '#7b1fa2' : severity === 'medium' ? '#9c27b0' : '#ba68c8',
      no_ramp: '#5d4037',
      other: '#616161'
    };
    return L.divIcon({
      className: 'report-marker',
      html: `<div style="
        background-color: ${colors[type] || '#616161'};
        width: 35px;
        height: 35px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 16px;
      ">⚠</div>`,
      iconSize: [35, 35]
    });
  };

  const handleSearchSelect = (location) => {
    setCenter([location.lat, location.lng]);
    if (!startLocation) {
      setStartLocationName(location.name);
      setStartLocation({ lat: location.lat, lng: location.lng });
    } else if (!endLocation) {
      setEndLocationName(location.name);
      setEndLocation({ lat: location.lat, lng: location.lng });
    }
  };

  useEffect(() => {
    fetchApproveReports();
  }, [fetchApproveReports]);

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', width: '100%', overflow: 'hidden' }}>
      <Grid container sx={{ height: '100%' }}>
        {/* --- Map Section --- */}
        <Grid item xs={12} md={9} sx={{ height: '100%', position: 'relative' }}>
          {isMobile && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 1000,
                bgcolor: 'white',
                boxShadow: 2
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
            <MapUpdater center={center} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
              OpenStreetMap</a> contributors'
            />

            {startLocation && endLocation && (
              <RoutingMachine start={startLocation} end={endLocation} approveReports={approveReports} />
            )}

            {approveReports.map((report) => (
              <Marker
                key={report.id}
                position={[report.latitude, report.longitude]}
                icon={getIcon(report.type, report.severity)}
                eventHandlers={{
                  click: () => {
                    setSelectedReport(report);
                    setCenter([report.latitude, report.longitude]);
                  }
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
                      <Chip label={report.type.replace('_', ' ')} size="small" variant="outlined" />
                      <Chip
                        label={report.severity}
                        size="small"
                        color={
                          report.severity === 'high'
                            ? 'error'
                            : report.severity === 'medium'
                            ? 'warning'
                            : 'info'
                        }
                      />
                    </Box>
                  </Box>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Grid>

        {/* --- Sidebar (desktop) --- */}
        {!isMobile && (
          <Grid item xs={12} md={3} sx={{ height: '100%', overflowY: 'auto' }}>
            <SidebarContent
              startLocation={startLocation}
              endLocation={endLocation}
              startLocationName={startLocationName}
              endLocationName={endLocationName}
              approveReports={approveReports}
              selectedReport={selectedReport}
              setSelectedReport={setSelectedReport}
              setStartLocation={setStartLocation}
              setEndLocation={setEndLocation}
              setStartLocationName={setStartLocationName}
              setEndLocationName={setEndLocationName}
              handleSearchSelect={handleSearchSelect}
            />
          </Grid>
        )}
      </Grid>

      {/* --- Drawer (mobile) --- */}
      {isMobile && (
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <SidebarContent
            startLocation={startLocation}
            endLocation={endLocation}
            startLocationName={startLocationName}
            endLocationName={endLocationName}
            approveReports={approveReports}
            selectedReport={selectedReport}
            setSelectedReport={setSelectedReport}
            setStartLocation={setStartLocation}
            setEndLocation={setEndLocation}
            setStartLocationName={setStartLocationName}
            setEndLocationName={setEndLocationName}
            handleSearchSelect={handleSearchSelect}
          />
        </Drawer>
      )}
    </Box>
  );
};

export default Map;