import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Avatar, Box, Button, Divider } from '@mui/material';
import authService from '../services/authService';

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getUserProfile();
        setProfile(response.data);
      } catch (error: any) {
        setError(error.message || '获取用户信息失败');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">加载中...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-100 py-8">
      <Container maxWidth="md">
        <Paper className="p-8 rounded-lg shadow-lg">
          <Box className="flex items-center mb-6">
            <Avatar
              className="w-24 h-24 text-4xl bg-purple-500"
              alt={profile?.firstName}
            >
              {profile?.firstName?.[0]}
            </Avatar>
            <Box className="ml-6">
              <Typography variant="h4" className="text-gray-800">
                {profile?.firstName} {profile?.lastName}
              </Typography>
              <Typography variant="subtitle1" className="text-gray-600">
                {profile?.role}
              </Typography>
            </Box>
          </Box>

          <Divider className="my-6" />

          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem label="用户名" value={profile?.username} />
            <InfoItem label="邮箱" value={profile?.email} />
            <InfoItem label="电话" value={profile?.phone} />
            <InfoItem label="账户状态" value={profile?.enabled ? '已激活' : '未激活'} />
            <InfoItem label="创建时间" value={formatDate(profile?.createdAt)} />
            <InfoItem label="最后更新" value={formatDate(profile?.updatedAt)} />
          </Box>

          <Box className="mt-8 flex justify-end">
            <Button
              variant="contained"
              color="primary"
              className="bg-purple-600 hover:bg-purple-700"
            >
              编辑资料
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value?: string }) => (
  <Box>
    <Typography variant="subtitle2" className="text-gray-500 mb-1">
      {label}
    </Typography>
    <Typography variant="body1" className="text-gray-800">
      {value || '-'}
    </Typography>
  </Box>
);

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default UserProfile;