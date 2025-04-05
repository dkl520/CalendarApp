import AuthForm from "../login/AuthForm";
import authService from "../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleRegister = async (data: Record<string, string>) => {
    // 验证密码确认
    if (data.password !== data.confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }

    try {
      let fms = {
        email: data.email,
        firstName: data.firstName, // 假设用 username 作为 firstName
        lastName: data.lastName, // 如果需要可以添加这个字段到表单
        phone: data.phone,     // 如果需要可以添加这个字段到表单
        password: data.password,
        role: "user", // 默认角色
        otp: "" // 如果需要验证码，可以添加这个字段到表单
      }
      await authService.register(fms);
      // 注册成功后的处理
      console.log("注册成功");
      // 可以添加跳转到登录页面的逻辑
      navigate("/login");

    } catch (error: any) {
      setError(error.response?.data?.message || "注册失败，请重试");
      console.error("Registration error:", error);
    }
  };

  return (
    <>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <AuthForm
        title="Register"
        fields={[
          { name: "email", type: "email", placeholder: "Email" },
          { name: "firstName", type: "text", placeholder: "firstname" },
          { name: "lastName", type: "text", placeholder: "lastname" },
          { name: "phone", type: "number", placeholder: "phonenum" },
          { name: "password", type: "password", placeholder: "Password" },
          { name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
        ]}
        buttonText="Register"
        onSubmit={handleRegister}
      />
    </>
  );
};

export default Register;