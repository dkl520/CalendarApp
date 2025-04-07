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
