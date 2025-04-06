// import { useState } from 'react';
// import AuthForm from "./AuthForm";
// import authService from '../services/authService';
// import { useNavigate } from 'react-router-dom';

// const ForgotPassword = () => {
//   const [step, setStep] = useState(1); // 1: 输入邮箱, 2: 输入验证码和新密码
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleEmailSubmit = async (data: Record<string, string>) => {
//     try {
//       setError('');
//       await authService.forgotPassword(data.email, ''); // 发送验证码
//       setEmail(data.email);
//       setStep(2);
//     } catch (error: any) {
//       setStep(2);

//       setError(error.response?.data?.message || '发送验证码失败');
//     }
//   };

//   const handleResetSubmit = async (data: Record<string, string>) => {
//     // try {
//     //   setError('');
//     //   await authService.forgotPassword(email, data.otp); // 验证码验证
//     //   // 验证成功后跳转到登录页
//     //   navigate('/login');
//     // } catch (error: any) {
//     //   setError(error.response?.data?.message || '重置密码失败');
//     // }
//   };

//   return (
//     <div>
//       {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
//       {step === 1 ? (
//         <AuthForm
//           title="找回密码"
//           fields={[
//             { name: "email", type: "email", placeholder: "请输入注册邮箱" }
//           ]}
//           buttonText="发送验证码"
//           onSubmit={handleEmailSubmit}
//         />
//       ) : (
//         <AuthForm
//           title="重置密码"
//           fields={[
//             { name: "otp", type: "text", placeholder: "请输入验证码" },
//             { name: "password", type: "password", placeholder: "请输入新密码" },
//             { name: "confirmPassword", type: "password", placeholder: "请确认新密码" }
//           ]}
//           buttonText="重置密码"
//           onSubmit={handleResetSubmit}
//         />
//       )}
//     </div>
//   );
// };

// export default ForgotPassword;