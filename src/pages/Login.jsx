import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "../assets/styles/Register.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Validasi form pakai Yup
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Fungsi submit login
  const handleLogin = async (values, { resetForm }) => {
    try {
      const res = await fetch("http://localhost:5000/anggota");
      const users = await res.json();

      // Cek apakah user dengan email & password cocok
      const foundUser = users.find(
        (u) =>
          u.email === values.email.trim() &&
          u.password === values.password.trim()
      );

      if (foundUser) {
        alert("Login successful!");
        localStorage.setItem(
          "user",
          JSON.stringify({ fullname: foundUser.fullname, id: foundUser.id })
        );
        // Tambahkan flag untuk animasi beranda
        sessionStorage.setItem("showTransition", "true");

        resetForm();
        navigate("/beranda");
      } else {
        alert("Email or password is incorrect!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="begin-page">
      <div className="begin-card">
        <h1 className="begin-title">Login to Your Account</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="register-form">
              {/* Email */}
              <div className="form-group">
                <Field
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="input-field"
                />
                <div className="error-container">
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-text"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group password-group">
                <div className="password-wrapper">
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input-field password-input"
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
                  </span>
                </div>
                <div className="error-container">
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-text"
                  />
                </div>
              </div>

              {/* Tombol Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className="text">
                Don't have an account? <a href="/register">Register here</a>.
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
