import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import "../assets/styles/ProfilePage.css";
import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";
import "../assets/styles/Register.css";

export default function ProfilePage() {
  // State utama yang menampung data user yang sedang login
  const [user, setUser] = useState(null);
  const [originalUser, setOriginalUser] = useState(null);

  // State untuk menandai apakah dalam mode edit atau tidak
  const [editMode, setEditMode] = useState(false);

  // State untuk menampung preview foto baru (base64)
  const [preview, setPreview] = useState(null);

  // State untuk menampilkan foto penuh
  const [showFullImage, setShowFullImage] = useState(false);

  // Fungsi untuk toggle foto besar
  const toggleFullImage = () => setShowFullImage(!showFullImage);

  // =====================================================
  // Ambil data user yang sedang login dari localStorage
  // =====================================================
  const fetchUser = async () => {
    const stored = localStorage.getItem("user"); // ambil data user di localStorage
    const id = stored ? JSON.parse(stored).id : null; // ambil id-nya
    if (!id) return; // jika belum login, hentikan proses

    try {
      // Ambil data user sesuai id dari server
      const res = await fetch(`http://localhost:5000/anggota/${id}`);
      if (!res.ok) throw new Error("Failed to fetch user data");

      const data = await res.json();
      // Set data user ke state
      setUser(data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  // Jalankan `fetchUser` hanya saat komponen pertama kali dirender
  useEffect(() => {
    fetchUser();
  }, []);

  // Validation schema using Yup
  const ProfileSchema = Yup.object().shape({
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
  });

  // =====================================================
  // Handle saat user memilih foto baru (preview sebelum disimpan)
  // =====================================================
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]; // ambil file pertama
    if (file) {
      const reader = new FileReader(); // baca file sebagai base64
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file); // convert ke base64 string
    }
  };

  // =====================================================
  // Simpan perubahan user ke database + update localStorage
  // =====================================================
  const handleSave = async (updatedUser) => {
    if (!updatedUser) return;

    try {
      // Gabungkan field lama (user) dengan yang baru (updatedUser)
      const mergedUser = { ...user, ...updatedUser };

      const res = await fetch(
        `http://localhost:5000/anggota/${mergedUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mergedUser), // kirim data lengkap
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        alert("Failed to update profile! Server said: " + errorText);
        return;
      }

      const savedUser = await res.json();
      setUser(savedUser);
      setOriginalUser(savedUser);
      setEditMode(false);
      setPreview(null);

      // Update localStorage
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        parsed.fullname = savedUser.fullname;
        parsed.id = savedUser.id;
        localStorage.setItem("user", JSON.stringify(parsed));
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({ fullname: savedUser.fullname, id: savedUser.id })
        );
      }

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Error updating profile!");
    } finally {
      setEditMode(false);
    }
  };

  // Tampilkan pesan loading jika data belum tersedia
  if (!user) return <div className="profile-loading">Loading profile...</div>;

  return (
    <>
      <Header />
      <Hero title="My Profile" />
      <Breadcrumb page="Profile" />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-photo-section">
            <img
              src={preview || user.photo || "/images/avatar.svg"}
              alt="Profile"
              className="profile-photo"
              onClick={toggleFullImage}
              style={{ cursor: "pointer" }}
            />
            {editMode && (
              <label className="photo-upload-btn">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </label>
            )}
          </div>

          <Formik
            enableReinitialize
            initialValues={{
              id: user.id,
              fullname: user.fullname || "",
              email: user.email || "",
              phoneNumber: user.phoneNumber || "",
            }}
            validationSchema={ProfileSchema}
            onSubmit={(values) => handleSave(values)}
          >
            {({ isValid, dirty, resetForm }) => (
              <Form className="profile-info">
                {/* Fullname Field */}
                <div className="form-group info-row">
                  <Field name="fullname">
                    {({ field, meta }) => (
                      <div
                        className={`form-group ${
                          meta.touched && meta.error ? "shake" : ""
                        }`}
                      >
                        <label>Name:</label>
                        <input
                          {...field}
                          id="fullname"
                          readOnly={!editMode}
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
                <div className="form-group info-row">
                  <Field name="email">
                    {({ field, meta }) => (
                      <div
                        className={`form-group ${
                          meta.touched && meta.error ? "shake" : ""
                        }`}
                      >
                        <label>Email:</label>
                        <input
                          {...field}
                          id="email"
                          readOnly={!editMode}
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
                <div className="form-group info-row">
                  <Field name="phoneNumber">
                    {({ field, meta }) => (
                      <div
                        className={`form-group ${
                          meta.touched && meta.error ? "shake" : ""
                        }`}
                      >
                        <label>Phone Number:</label>
                        <input
                          {...field}
                          id="phoneNumber"
                          readOnly={!editMode}
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

                {/* Button */}
                <div className="profile-buttons">
                  {editMode ? (
                    <>
                      <button
                        type="submit"
                        className="btn-save"
                        disabled={!isValid || !dirty}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn-cancel"
                        onClick={(e) => {
                          e.preventDefault();
                          if (originalUser) setUser(originalUser);
                          setEditMode(false);
                          setPreview(null);
                          resetForm({ values: originalUser });
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="btn-edit"
                      onClick={() => {
                        setOriginalUser(user);
                        setEditMode(true);
                      }}
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {showFullImage && (
        <div className="image-overlay" onClick={toggleFullImage}>
          <div className="image-popup">
            <img
              src={preview || user.photo || "/images/avatar.svg"}
              alt="Full Profile"
              className="image-full"
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
