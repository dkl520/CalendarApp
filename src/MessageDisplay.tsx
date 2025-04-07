import React from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface MessageDisplayProps {
  loading?: boolean;
  error?: string;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ loading, error }) => {
  if (loading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, rgba(123, 31, 162, 0.05), rgba(156, 39, 176, 0.05))',
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: '#7B1FA2',
            mb: 2,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: '#7B1FA2',
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          loading...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, rgba(123, 31, 162, 0.05), rgba(156, 39, 176, 0.05))',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            maxWidth: '80%',
          }}
        >
          <ErrorOutlineIcon
            sx={{
              fontSize: 48,
              color: '#d32f2f',
              mb: 2,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: '#d32f2f',
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            {error}
          </Typography>
        </Paper>
      </Box>
    );
  }

  return null;
};

export default MessageDisplay;