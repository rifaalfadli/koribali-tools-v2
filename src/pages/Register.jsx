import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "../assets/styles/Register.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  // Validation schema using Yup
  const RegisterSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, "Too Short!") // Minimal 2 karakter
      .max(50, "Too Long!") // Maksimal 50 karakter
      .required("Name is required"), // Wajib diisi
    email: Yup.string()
      .email("Invalid Email") // Format email harus valid
      .required("Email is required"), // Wajib diisi
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits") // hanya angka
      .min(10, "Phone number must be at least 10 digits") // minimal 10 angka (opsional)
      .max(15, "Phone number can't be longer than 15 digits") // maksimal 15 angka (opsional)
      .required("Phone Number is required"),
    password: Yup.string()
      .required("Password is required") // Wajib diisi
      .min(8, "Min 8 chars") // Minimal 8 karakter
      .matches(/[a-z]/, "Must contain lowercase") // Harus ada huruf kecil
      .matches(/[A-Z]/, "Must contain uppercase") // Harus ada huruf besar
      .matches(/\d/, "Must contain number"), // Harus ada angka
  });

  // Submit handler: kirim data ke backend
  const handleRegister = async (item, { resetForm }) => {
    try {
      // Ambil semua data user dari backend
      const checkResponse = await fetch("http://localhost:5000/anggota");
      const users = await checkResponse.json();

      // Cek apakah fullname / email sudah digunakan
      const isDuplicate = users.some(
        (user) =>
          user.fullname.toLowerCase() === item.fullname.toLowerCase() ||
          user.email.toLowerCase() === item.email.toLowerCase() ||
          user.phoneNumber.toLowerCase() === item.phoneNumber.toLowerCase()
      );

      if (isDuplicate) {
        alert("Name, email, or phone number already exists!");
        return; // batalkan proses register
      }

      // Jika aman, lanjut POST data baru
      const response = await fetch("http://localhost:5000/anggota", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: item.fullname,
          email: item.email,
          phoneNumber: item.phoneNumber,
          password: item.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data = await response.json();
      alert("Register success!");
      console.log("Register success:", data);

      resetForm();
    } catch (error) {
      console.error("Register failed:", error);
      alert("An error occurred during registration.");
    }
  };

  // Form UI
  return (
    <div className="begin-page">
      <div className="begin-card">
        <h1 className="begin-title">Create Your Account</h1>
        <Formik
          initialValues={{
            fullname: "",
            email: "",
            phoneNumber: "",
            password: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          <Form className="register-form">
            {/* Fullname Field */}
            <div className="form-group">
              <Field name="fullname">
                {({ field, meta }) => (
                  <div
                    className={`form-group ${
                      meta.touched && meta.error ? "shake" : ""
                    }`}
                  >
                    <input
                      {...field}
                      id="fullname"
                      placeholder="Name"
                      className={`input-field ${
                        meta.touched && meta.error ? "input-error" : ""
                      }`}
                    />
                    <div className="error-container">
                      <ErrorMessage
                        name="fullname"
                        component="div"
                        className="error-text"
                      />
                    </div>
                  </div>
                )}
              </Field>
            </div>

            {/* Email Field */}
            <div className="form-group">
              <Field name="email">
                {({ field, meta }) => (
                  <div
                    className={`form-group ${
                      meta.touched && meta.error ? "shake" : ""
                    }`}
                  >
                    <input
                      {...field}
                      id="email"
                      placeholder="Email"
                      className={`input-field ${
                        meta.touched && meta.error ? "input-error" : ""
                      }`}
                    />
                    <div className="error-container">
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-text"
                      />
                    </div>
                  </div>
                )}
              </Field>
            </div>

            {/* Phone Number Field */}
            <div className="form-group">
              <Field name="phoneNumber">
                {({ field, meta }) => (
                  <div
                    className={`form-group ${
                      meta.touched && meta.error ? "shake" : ""
                    }`}
                  >
                    <input
                      {...field}
                      id="phoneNumber"
                      placeholder="Phone Number"
                      className={`input-field ${
                        meta.touched && meta.error ? "input-error" : ""
                      }`}
                    />
                    <div className="error-container">
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="error-text"
                      />
                    </div>
                  </div>
                )}
              </Field>
            </div>

            {/* Password Field */}
            <div className="form-group password-group">
              <Field name="password">
                {({ field, meta }) => (
                  <div
                    className={`form-group password-group ${
                      meta.touched && meta.error ? "shake" : ""
                    }`}
                  >
                    <div className="password-wrapper">
                      <input
                        {...field}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={`input-field password-input ${
                          meta.touched && meta.error ? "input-error" : ""
                        }`}
                      />
                      <span
                        className="eye-icon"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={25} />
                        ) : (
                          <Eye size={25} />
                        )}
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
                )}
              </Field>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              Register
            </button>

            <p className="text">
              Already have an account? <a href="/">Log in here</a>.
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Register;
