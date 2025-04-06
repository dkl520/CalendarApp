import AuthForm from "../login/AuthForm";
import authService from "../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleLogin = async (data: Record<string, string>) => {

    try {

      const response = await authService.login({
        user_email: data.email,
        user_password: data.password
      });

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      const userProfileResponse = await authService.getUserProfile();
      localStorage.setItem("userProfile", JSON.stringify(userProfileResponse.data));
      
      // 这里可以添加登录成功后的跳转逻辑
      navigate("/");

    } catch (error: any) {
      setError(error.response?.data?.message || "登录失败，请重试");
      console.error("Login error:", error);
    }
  };

  return (
    <>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <AuthForm
        title="Login"
        fields={[
          { name: "email", type: "email", placeholder: "email" },
          { name: "password", type: "password", placeholder: "Password" },
        ]}
        buttonText="Login"
        onSubmit={handleLogin}
      />
    </>
  );
};

export default Login;