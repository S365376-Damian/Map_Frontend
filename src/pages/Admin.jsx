import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Tabs, Tab, Alert } from '@mui/material';
import ReportVerification from '../components/reports/ReportVerification';
import Loading from '../components/common/Loading';
import { useAuthStore } from '../stores/auth';
import { useReportsStore } from '../stores/reports';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { pendingReports, approveReports, approve, reject, fetchApproveReports, fetchPendingReports } = useReportsStore();
  const loading = false;
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    // using mock store; no fetch
  }, [user]);

  const handleApprove = async (id) => {
    approve(id);
  };

  const handleReject = async (id, reason) => {
    reject(id);
  };

  if (user?.role !== 'admin') {
    return (
      <Container>
        <Alert severity="error">Access denied. Admin only.</Alert>
      </Container>
    );
  }

  useEffect(() => {
    fetchPendingReports();
    fetchApproveReports();
  }, [user])

  return (
    <Container maxWidth="lg">
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          p: 3,
          borderRadius: 3,
          color: 'white'
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          👨‍💼 Admin Dashboard
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          {pendingReports.length} reports pending verification
        </Typography>
      </Box>

      <Tabs 
        value={tab} 
        onChange={(e, v) => setTab(v)} 
        sx={{ 
          mb: 3,
          '& .MuiTab-root': {
            fontWeight: 600
          }
        }}
      >
        <Tab label={`Pending Verification (${pendingReports.length})`} />
        <Tab label={`Approved Reports (${approveReports.length})`} />
      </Tabs>

      {loading ? (
        <Loading message="Loading reports..." />
      ) : (
        <Box>
          {tab === 0 && (
            <>
              {pendingReports.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h6" color="text.secondary">
                    No pending reports to verify
                  </Typography>
                </Box>
              ) : (
                pendingReports.map(report => (
                  <Box key={report.id} sx={{ mb: 3 }}>
                    <ReportVerification
                      report={report}
                      onApprove={handleApprove}
                      onReject={handleReject}
                    />
                  </Box>
                ))
              )}
            </>
          )}
          {tab === 1 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                {approveReports.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                      No approve reports to verify
                    </Typography>
                  </Box>
                ) : (
                  approveReports.map(report => (
                    <Box key={report.id} sx={{ mb: 3 }}>
                      <ReportVerification
                        report={report}
                        onApprove={handleApprove}
                        onReject={handleReject}
                      />
                    </Box>
                  ))
                )}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Admin;

