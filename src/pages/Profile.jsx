import React from 'react';
import { Container } from '@mui/material';
import ProfileForm from '../components/auth/ProfileForm';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();

  return (
    <Container>
      {user ? <ProfileForm /> : <div>Loading...</div>}
    </Container>
  );
};

export default Profile;

