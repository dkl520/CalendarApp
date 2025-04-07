import React from 'react';
import { HashRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Timer from './Timer';
import Clander from './Calender';
import Login from './login/Login';
import Register from './login/Register';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TimerIcon from '@mui/icons-material/Timer';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ConfirmEmail from './login/ConfirmEmail';
import TodoList from './TodoList';
import UserProfile from './login/UserProfile';
import ForgotPassword from './login/ForgotPassword';
import ResetPassword from './login/ResetPassword';


const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getNavValue = () => {
    const path = location.pathname;
    if (path === '/timer') return 0;
    if (path === '/todolist') return 1;
    if (path === '/clander') return 2;
    if (path === '/profile') return 3;
    return 2;  // 默认返回日历页面的索引
  };

  return (
    <div>
      <Routes>
        <Route path="/clander" element={<Clander />} />
        {/* <Route path="/" element={<Clander />} /> */}
        <Route path="/timer" element={<Timer />} />
        <Route path="/todolist" element={<TodoList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<ResetPassword />} />
      </Routes>

      <BottomNavigation
        showLabels
        value={getNavValue()}
        onChange={(_, newValue) => {
          switch (newValue) {
            case 0:
              navigate('/timer');
              break;
            case 1:
              navigate('/todolist');
              break;
            case 2:
              navigate('/clander');
              break;
            case 3:
              navigate('/profile');
              break;
            default:
              navigate('/');
          }
        }}
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          width: '100%', 
          zIndex: 1000, 
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          '& .Mui-selected': {
            color: '#7B1FA2 !important',
          },
          '& .MuiBottomNavigationAction-root': {
            color: 'rgba(0, 0, 0, 0.54)',
            '&:hover': {
              color: '#9C27B0',
            },
          },
        }}
      >
        <BottomNavigationAction 
          label="Timer" 
          icon={<TimerIcon />} 
          sx={{
            '&.Mui-selected': {
              '& .MuiSvgIcon-root': {
                color: '#7B1FA2',
              },
            },
          }}
        />
        <BottomNavigationAction 
          label="Todo List" 
          icon={<ListAltIcon />}
          sx={{
            '&.Mui-selected': {
              '& .MuiSvgIcon-root': {
                color: '#7B1FA2',
              },
            },
          }}
        />
        <BottomNavigationAction 
          label="Calendar" 
          icon={<CalendarMonthIcon />}
          sx={{
            '&.Mui-selected': {
              '& .MuiSvgIcon-root': {
                color: '#7B1FA2',
              },
            },
          }}
        />
        <BottomNavigationAction 
          label="Profile" 
          icon={<AccountCircleIcon />}
          sx={{
            '&.Mui-selected': {
              '& .MuiSvgIcon-root': {
                color: '#7B1FA2',
              },
            },
          }}
        />
      </BottomNavigation>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;