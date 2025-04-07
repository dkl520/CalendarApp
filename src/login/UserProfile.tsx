import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Avatar, Box, Button, Divider, CircularProgress } from '@mui/material';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
interface UserProfile {
  id: number;
  role: string;
  enabled: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  username: string;
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('accessToken') || '';
    if (!token) {
      navigate('/login')
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await authService.getUserProfile();
        setProfile(response.data);
      } catch (error: any) {
        setError(error.message || 'Failed to retrieve user information');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    // Clear user session or local storage if needed
    localStorage.removeItem('userProfile');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    navigate('/login')
  };

  if (loading) {
    return (
      <Box className="h-screen flex items-center justify-center">
        <CircularProgress size={60} thickness={4} sx={{ color: '#7B1FA2' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="h-screen flex items-center justify-center">
        <Typography variant="h6" sx={{ color: 'error.main' }}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 py-12">
      <Container maxWidth="md">
        <Paper
          elevation={12}
          sx={{
            p: 4,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 20px 40px rgba(123, 31, 162, 0.2)'
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              mb: 4
            }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                fontSize: '3rem',
                bgcolor: 'purple.500',
                border: '4px solid white',
                boxShadow: '0 4px 14px rgba(123, 31, 162, 0.25)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
              alt={profile?.firstName}
            >
              {profile?.firstName?.[0]}
            </Avatar>
            <Box
              sx={{
                ml: { xs: 0, md: 4 },
                mt: { xs: 2, md: 0 },
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #7B1FA2, #9C27B0)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 1
                }}
              >
                {profile?.firstName} {profile?.lastName}
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {profile?.role}
              </Typography>
            </Box>
          </Box>

          <Divider
            sx={{
              my: 4,
              borderColor: 'rgba(123, 31, 162, 0.2)',
              borderWidth: 2
            }}
          />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 3
            }}
          >
            <InfoItem label="Username" value={profile?.username} />
            <InfoItem label="Email" value={profile?.email} />
            <InfoItem label="Phone" value={profile?.phone} />
            <InfoItem label="Account Status" value={profile?.enabled ? 'Active' : 'Inactive'} />
            <InfoItem label="Created At" value={formatDate(profile?.createdAt)} />
            <InfoItem label="Last Updated" value={formatDate(profile?.updatedAt)} />
          </Box>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                background: 'linear-gradient(45deg, #7B1FA2, #9C27B0)',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                boxShadow: '0 4px 14px rgba(123, 31, 162, 0.25)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(123, 31, 162, 0.35)'
                }
              }}
            >
              Logout
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value?: string }) => (
  <Box
    sx={{
      p: 3,
      borderRadius: 2,
      background: 'rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(5px)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 14px rgba(123, 31, 162, 0.15)'
      }
    }}
  >
    <Typography
      variant="subtitle2"
      sx={{
        color: 'text.secondary',
        fontWeight: 600,
        mb: 1
      }}
    >
      {label}
    </Typography>
    <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500 }}>
      {value || '-'}
    </Typography>
  </Box>
);

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default UserProfile;
