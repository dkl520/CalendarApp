import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import AuthForm from "../login/AuthForm";
import MessageDisplay from "../MessageDisplay";
import ErrorAlert from "../ErrorAlert";
const ForgotPassword = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (data: Record<string, string>) => {
    const email = data.email;
    try {
      setLoading(true);
      setError('');
      await authService.forgotPassword(email);
      localStorage.setItem('resetEmail', email);
      navigate('/reset-password');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <MessageDisplay loading={true} error={''} />;
  }

  return (
    <>
      {/* {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>} */}
      <ErrorAlert 
        error={error} 
        onClose={() => setError('')} 
        duration={3000} 
      />
      <AuthForm
        title="Forgot Password"
        fields={[
          { name: "email", type: "email", placeholder: "Email Address" },
        ]}
        buttonText="Send Verification Code"
        onSubmit={handleForgotPassword}
      />
    </>
  );
};

export default ForgotPassword;
