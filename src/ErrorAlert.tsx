import React, { useEffect } from 'react';
import { Alert, Collapse, Box } from '@mui/material';

interface ErrorAlertProps {
  error: string;
  onClose?: () => void;
  duration?: number;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ 
  error, 
  onClose, 
  duration = 3000 
}) => {
  useEffect(() => {
    if (error && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [error, onClose, duration]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        width: 'auto',
        maxWidth: '90%',
      }}
    >
      <Collapse in={!!error}>
        <Alert 
          severity="error"
          sx={{
            minWidth: '300px',
            borderRadius: 2,
            '& .MuiAlert-message': {
              fontSize: '0.95rem',
              textAlign: 'center',
            },
            '& .MuiAlert-icon': {
              fontSize: '1.5rem',
            },
            boxShadow: '0 4px 16px rgba(211, 47, 47, 0.2)',
            animation: 'fadeIn 0.3s ease-in',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(-20px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            },
            backdropFilter: 'blur(8px)',
            background: 'rgba(253, 237, 237, 0.95)',
          }}
        >
          {error}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default ErrorAlert;