// useSearchParams
import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmEmail = () => {
  // const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying email...');

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const token = params.get('token');
  //   console.log('Current URL:', window.location.href);
  //   console.log('Search string:', location.search);
  //   // console.log('Token:', token);

  //   if (!token) {
  //     setStatus('error');
  //     setMessage('Invalid verification link');
  //     return;
  //   }
  //   debugger
  //   const verifyEmail = async () => {
  //     try {
  //       await axios.get(`/api/v1/auth/account/confirm_email`, {
  //         params: { token }
  //       });
  //       setStatus('success');
  //       setMessage('Email verification successful!');
  //       // Redirect to the login page after 3 seconds
  //       debugger
  //       navigate('/login');
  //       debugger
  //       // setTimeout(() => {
  //       // }, 1000);
  //     } catch (error) {
  //       setStatus('error');
  //       setMessage('Verification failed, please try again or contact the administrator');
  //     }
  //   };

  //   verifyEmail();
  //   debugger
  //   navigate('/login');
  // }, [searchParams, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    console.log('Current URL:', window.location.href);
    console.log('Search string:', window.location.search);

    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    const verifyEmail = async () => {
      try {
        await axios.get(`/api/v1/auth/account/confirm_email`, {
          params: { token }
        });
        setStatus('success');
        setMessage('Email verification successful!');
        // 验证成功后再跳转
        navigate('/login');
      } catch (error) {
        setStatus('error');
        setMessage('Verification failed, please try again or contact the administrator');
      }
    };

    verifyEmail();
  }, [navigate]);

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl">
        <div className={`text-center ${status === 'verifying' ? 'text-blue-600' :
            status === 'success' ? 'text-green-600' :
              'text-red-600'
          }`}>
          {status === 'verifying' && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          )}
          <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
