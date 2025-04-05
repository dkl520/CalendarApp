import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('正在验证邮箱...');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    console.log('当前URL:', window.location.href);
    console.log('search字符串:', location.search);
    console.log('token:', token);
    
    if (!token) {
      setStatus('error');
      setMessage('无效的验证链接');
      return;
    }

    const verifyEmail = async () => {
      try {
        await axios.get(`/api/v1/auth/account/confirm_email`, {
          params: { token }
        });
        setStatus('success');
        setMessage('邮箱验证成功！');
        // 3秒后跳转到登录页
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        setStatus('error');
        setMessage('验证失败，请重试或联系管理员');
      }
    };

    // verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl">
        <div className={`text-center ${
          status === 'verifying' ? 'text-blue-600' :
          status === 'success' ? 'text-green-600' :
          'text-red-600'
        }`}>
          {status === 'verifying' && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          )}
          <h2 className="text-2xl font-bold mb-4">邮箱验证</h2>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;