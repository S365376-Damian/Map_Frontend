import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Typography, Tabs, Tab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import ReportCard from '../components/reports/ReportCard';
import ReportForm from '../components/reports/ReportForm';
import Loading from '../components/common/Loading';
import { useReportsStore } from '../stores/reports';
import { useAuth } from '../hooks/useAuth';

const Reports = () => {
  const { reports, addReport, fetchReportByIds } = useReportsStore();
  const { user } = useAuth();
  const loading = false;
  const [showForm, setShowForm] = useState(false);
  const [filterTab, setFilterTab] = useState(0);


  const handleSubmitReport = async (data) => {
    const newReport = {
      id: Date.now(),
      name: data.name,
      description: data.description,
      type: data.type,
      severity: data.severity,
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      status: 'pending',
      user_id: user.id,
      createdAt: new Date().toISOString(),
    };
    addReport(newReport);
    setShowForm(false);
  };

  const filteredReports = reports.filter(report => {
    if (filterTab === 0) return true;
    if (filterTab === 1) return report.severity === 'high';
    if (filterTab === 2) return report.type === 'stairs';
    return true;
  });

  useEffect(() => {
    fetchReportByIds(user.id)
  }, [user]);

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Community Reports</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowForm(true)}
        >
          Create Report
        </Button>
      </Box>

      {showForm && (
        <Box sx={{ mb: 3 }}>
          <ReportForm
            onSubmit={handleSubmitReport}
            onCancel={() => setShowForm(false)}
          />
        </Box>
      )}
      
      <Tabs value={filterTab} onChange={(e, v) => setFilterTab(v)} sx={{ mb: 3 }}>
        <Tab label="All" />
        <Tab label="High Severity" />
        <Tab label="Stairs" />
      </Tabs>
      {loading ? (
        <Loading />
      ) : (
        <Box>
          {filteredReports.length === 0 ? (
            <Typography>No reports found</Typography>
          ) : (
            filteredReports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))
          )}
        </Box>
      )}
 
    </Container>
  );
};

export default Reports;

