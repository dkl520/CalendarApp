import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import AuthForm from '../login/AuthForm';
import MessageDisplay from '../MessageDisplay';
import ErrorAlert from '../ErrorAlert';
const ResetPassword = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('resetEmail');

        if (!email) {
            //   navigate('/forgot-password');
        }
    }, [navigate]);

    const handleResetPassword = async (data: Record<string, string>) => {
        if (data.password !== data.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            setError('');
            const email = localStorage.getItem('resetEmail') || '';

            if (!email) {
                return

            }
            await authService.confirmOTP(data.otp);

            // await authService.resetPassword(email, data.otp, data.password);

            navigate('/login');
        } catch (error: any) {
            setError(error.response?.data?.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <MessageDisplay loading={true} error={''} />;
    }
    return (
        <>
            <ErrorAlert
                error={error}
                onClose={() => setError('')}
                duration={3000}
            />
            <AuthForm
                title="Reset Password"
                fields={[
                    { name: 'otp', type: 'text', placeholder: 'Verification Code' },
                    { name: 'password', type: 'password', placeholder: 'New Password' },
                    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm New Password' },
                ]}
                buttonText="Reset Password"
                onSubmit={handleResetPassword}
            />
        </>
    );
};

export default ResetPassword;


// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Paper, Container } from '@mui/material';
// import authService from '../services/authService';
// import AuthForm from '../login/AuthForm';
// import MessageDisplay from '../MessageDisplay';
// import ErrorAlert from '../ErrorAlert';
// import { User } from '../styles/types';

// const ResetPassword = () => {
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const email = localStorage.getItem('resetEmail');
//         if (!email) {
//             navigate('/forgot-password');
//         }
//     }, [navigate]);

//     const handleResetPassword = async (data: Record<string, string>) => {
//         if (data.password !== data.confirmPassword) {
//             setError('密码不匹配');
//             return;
//         }

//         try {
//             setLoading(true);
//             setError('');
//             const email = localStorage.getItem('resetEmail') || '';

//             if (!email) {
//                 navigate('/forgot-password');
//                 return;
//             }
//             localStorage.setItem('accessToken', data.token);
//             localStorage.setItem('refreshToken', data.token);
//             // await authService.refreshToken();
//             // 先验证 OTP
//             // await authService.confirmOTP(data.otp);
//             // 验证成功后再跳转

//             // 获取用户信息
//             const response = await authService.getUserProfile();
//             const userProfile: User = response.data;

//             // 更改密码
//             await authService.changePassword(userProfile.id, data.password, data.confirmPassword);

//             // 存储用户信息
//             localStorage.setItem('userProfile', JSON.stringify(userProfile));

//             // 清除重置邮箱
//             // localStorage.removeItem('resetEmail');

//             // 跳转到登录页
//             navigate('/login');
//         } catch (error: any) {
//             if (error.response?.status === 400) {
//                 setError('验证码无效或已过期');
//             } else {
//                 setError(error.response?.data?.message || '重置密码失败');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return <MessageDisplay loading={true} error={''} />;
//     }

//     return (
//         <Box
//             sx={{
//                 width: '100%',
//                 height: '100vh',
//                 position: 'fixed',
//                 top: 0,
//                 left: 0,
//                 background: 'linear-gradient(to bottom right, rgba(123, 31, 162, 0.05), rgba(156, 39, 176, 0.05))',
//             }}
//         >
//             <Container
//                 maxWidth="sm"
//                 sx={{
//                     height: '100%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}
//             >
//                 <Paper
//                     elevation={3}
//                     sx={{
//                         p: 4,
//                         width: '100%',
//                         borderRadius: 2,
//                         background: 'rgba(255, 255, 255, 0.9)',
//                         backdropFilter: 'blur(10px)',
//                     }}
//                 >
//                     <ErrorAlert
//                         error={error}
//                         onClose={() => setError('')}
//                         duration={3000}
//                     />
//                     <AuthForm
//                         title="重置密码"
//                         fields={[
//                             // { name: 'otp', type: 'text', placeholder: '请输入验证码' },
//                             { name: 'token', type: 'text', placeholder: '请输入验证码' },
//                             { name: 'password', type: 'password', placeholder: '请输入新密码' },
//                             { name: 'confirmPassword', type: 'password', placeholder: '请确认新密码' },
//                         ]}
//                         buttonText="重置密码"
//                         onSubmit={handleResetPassword}
//                     />
//                 </Paper>
//             </Container>
//         </Box>
//     );
// };

// export default ResetPassword;