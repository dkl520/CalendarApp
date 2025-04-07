import AuthForm from "../login/AuthForm";
import authService from "../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from '../ErrorAlert';
const Register = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleRegister = async (data: Record<string, string>) => {
    // Validate password confirmation
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      let fms = {
        email: data.email,
        firstName: data.firstName, // Assume using username as firstName
        lastName: data.lastName, // Add this field to the form if needed
        phone: data.phone,       // Add this field to the form if needed
        password: data.password,
        role: "user", // Default role
        otp: "" // Add a verification code field if needed
      };
      await authService.register(fms);
      // Handle post-registration actions
      console.log("Registration successful");
      // You can add navigation logic to the login page
      navigate("/login");
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed, please try again");
      console.error("Registration error:", error);
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
        title="Register"
        fields={[
          { name: "email", type: "email", placeholder: "Email" },
          { name: "firstName", type: "text", placeholder: "First Name" },
          { name: "lastName", type: "text", placeholder: "Last Name" },
          { name: "phone", type: "number", placeholder: "Phone Number" },
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
