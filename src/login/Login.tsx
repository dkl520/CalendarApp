import AuthForm from "../login/AuthForm";
import authService from "../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
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
      
      // Here you can add navigation logic after successful login
      navigate("/");

    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed, please try again");
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <ErrorAlert 
        error={error} 
        onClose={() => setError('')} 
        duration={3000} 
      />
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
