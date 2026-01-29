import { Field, Formik, Form } from "formik";
import { X, CheckCircle, AlertCircle, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import "../assets/styles/ProfilePage.css";
import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";

export default function ProfilePage() {
  // State utama yang menampung data user yang sedang login
  const [user, setUser] = useState(null);
  const [originalUser, setOriginalUser] = useState(null);

  // State untuk pesan sukses/error
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // State untuk menandai apakah dalam mode edit atau tidak
  const [editMode, setEditMode] = useState(false);
  // NOTE: allValid state dihapus — kita akan compute secara langsung di render

  // State untuk menampung preview foto baru (base64) dan menampilkan foto penuh
  const [photoState, setPhotoState] = useState({
    preview: null,
    showFull: false,
  });

  // State untuk fokus ke input
  const [lastFocus, setLastFocus] = useState(null);
  const handleFocus = (e) => setLastFocus(e.target.id);

  useEffect(() => {
    if (editMode && lastFocus) {
      setTimeout(() => {
        const input = document.getElementById(lastFocus);
        if (input) input.focus();
      }, 0);
    }
  }, [editMode, user, lastFocus]); // dependency updated: remove allValid, add lastFocus

  // Fungsi untuk toggle foto besar
  const toggleFullImage = () =>
    setPhotoState((prev) => ({ ...prev, showFull: !prev.showFull }));

  // =====================================================
  // Ambil data user yang sedang login dari Cookies
  // =====================================================
  const fetchUser = async () => {
    try {
      // Ambil id dari cookies
      const userCookie = Cookies.get("user");
      if (!userCookie) return;

      const { id } = JSON.parse(userCookie); // ambil id-nya

      // // Ambil data user sesuai id dari server
      // const res = await fetch(`http://localhost:5000/anggota/${id}`);
      // if (!res.ok) throw new Error("Failed to fetch user data");

      // const data = await res.json();
      // // Set data user ke state
      // setUser(data);
      // setOriginalUser(data);
      const anggota = JSON.parse(localStorage.getItem("anggota")) || [];
      const foundUser = anggota.find((u) => String(u.id) === String(id));

      if (!foundUser) throw new Error("User not found");

      setUser(foundUser);
      setOriginalUser(foundUser);
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
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number can't be longer than 15 digits")
      .required("Phone Number is required"),
    photo: Yup.mixed().test(
      "fileSize",
      "File too large (max 2MB)",
      (value) => !value || (value && value.size <= 2000000)
    ),
  });

  // =====================================================
  // Handle saat user memilih foto baru (preview sebelum disimpan)
  // =====================================================
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setPhotoState((prev) => ({ ...prev, preview: reader.result }));
    reader.readAsDataURL(file);
  };

  // =====================================================
  // Simpan perubahan user ke database
  // =====================================================
  // const handleSave = async (updatedUser) => {
  //   if (!updatedUser) return;

  //   try {
  //     const mergedUser = { ...user, ...updatedUser };

  //     const res = await fetch(
  //       `http://localhost:5000/anggota/${mergedUser.id}`,
  //       {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(mergedUser),
  //       }
  //     );

  //     if (!res.ok) {
  //       const errorText = await res.text();
  //       console.error("Server error:", errorText);

  //       setMessageType("error");
  //       setMessage("Profile update failed: " + errorText);
  //       return;
  //     }

  //     const savedUser = await res.json();
  //     setUser(savedUser);
  //     setOriginalUser(savedUser);
  //     setPhotoState((prev) => ({ ...prev, preview: null }));

  //     setMessageType("success");
  //     setShowPopup(true);

  //     setTimeout(() => {
  //       setEditMode(false);
  //       setShowPopup(false);
  //     }, 1000);
  //   } catch (err) {
  //     console.error("Update failed:", err);
  //     setMessageType("error");
  //     setMessage("Error updating profile!");
  //   }
  // };
  const handleSave = async (updatedUser) => {
    if (!updatedUser) return;

    try {
      // 1 Gabungkan data lama + data baru (LOGIKA ASLI TETAP)
      const mergedUser = { ...user, ...updatedUser };

      // 2 Ambil "database" anggota dari localStorage
      const anggota = JSON.parse(localStorage.getItem("anggota")) || [];

      // 3 Update user berdasarkan ID
      let isUpdated = false;
      const updatedAnggota = anggota.map((a) => {
        if (String(a.id) === String(mergedUser.id)) {
          isUpdated = true;
          return mergedUser;
        }
        return a;
      });

      // 4 Jika user tidak ditemukan
      if (!isUpdated) {
        throw new Error("User not found");
      }

      // 5 Simpan kembali ke "database"
      localStorage.setItem("anggota", JSON.stringify(updatedAnggota));

      // 6 MENIRU server success response
      const savedUser = mergedUser;

      // 7 Update state (SAMA PERSIS DENGAN LOGIKA LAMA)
      setUser(savedUser);
      setOriginalUser(savedUser);
      setPhotoState((prev) => ({ ...prev, preview: null }));

      setMessageType("success");
      setShowPopup(true);

      setTimeout(() => {
        setEditMode(false);
        setShowPopup(false);
      }, 1000);
    } catch (err) {
      console.error("Update failed:", err);
      setMessageType("error");
      setMessage("Error updating profile!");
    }
  };

  const closeMessage = () => {
    setMessage(null);
  };

  // Tampilkan pesan loading jika data belum tersedia
  // if (!user) return <div className="">Loading profile...</div>;
  const navigate = useNavigate();

  // Tampilkan loading + tombol back
  if (!user) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="
            absolute top-6 left-6
            flex items-center gap-2
            px-5 py-2.5
            rounded-xl
            bg-slate-100
            border border-slate-200
            text-slate-700 font-medium
            shadow-sm
            transition-colors transition-shadow duration-200
            hover:bg-slate-200
            hover:border-slate-300
            hover:text-slate-800
            active:bg-slate-300
          "
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Loading */}
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="w-[60px] h-[60px] rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />

          {/* Text */}
          <p className="text-slate-600 text-lg tracking-wide animate-pulse">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // Komponen input reusable
  const InputField = ({
    name,
    label,
    readOnly,
    values,
    errors,
    touched,
    originalUser,
  }) => {
    const originalValue = originalUser?.[name] ?? "";
    const currentValue = values?.[name] ?? "";
    const isChanged = currentValue !== originalValue;

    let stateColor = "null";
    if (isChanged && errors[name]) stateColor = "red";
    else if (isChanged && !errors[name]) stateColor = "green";

    return (
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={clsx("form-group", "info-row")}
      >
        <Field name={name}>
          {({ field }) => (
            <div className={`form-group ${errors[name] ? "shake" : ""}`}>
              <label>{label}</label>
              <input
                {...field}
                id={name}
                readOnly={readOnly}
                onFocus={handleFocus}
                className={clsx(
                  "input-field",
                  stateColor === "green" && "input-green",
                  stateColor === "red" && "input-error"
                )}
              />

              <div className="error-container">
                {errors[name] && (
                  <div className="error-text">
                    <AlertCircle size={14} strokeWidth={2.5} />
                    {errors[name]}
                  </div>
                )}

                {!errors[name] && isChanged && (
                  <div className="success-container active">
                    <div className="success-text">
                      <CheckCircle size={14} strokeWidth={2.5} />
                      Verified
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </Field>
      </motion.div>
    );
  };

  return (
    <>
      <Header />
      <div className="page-wrapper">
        <Helmet>
          <title>User Profile - CV. KORI BALI</title>
          <meta
            name="description"
            content="Halaman profil pengguna CV. KORI BALI untuk melihat dan mengedit data pribadi akun Anda."
          />
        </Helmet>

        {showPopup && (
          <motion.div
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="popup-box"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle size={40} color="#2e7d32" />
              <p>Profile updated successfully!</p>
            </motion.div>
          </motion.div>
        )}

        <Hero title="My Profile" />
        <Breadcrumb page="Profile" />

        <motion.div
          className="profile-container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className={`profile-card ${editMode ? "profile-card-edit" : ""}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="profile-photo-section">
              <motion.img
                src={photoState.preview || user.photo || "/images/avatar.svg"}
                alt="Profile"
                className="profile-photo"
                onClick={toggleFullImage}
                style={{ cursor: "pointer" }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              />
              {editMode && (
                <motion.label
                  className="photo-upload-btn"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </motion.label>
              )}
            </div>

            {message && messageType === "error" && (
              <motion.div
                className="message-box message-error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <AlertCircle size={20} />
                  <span>{message}</span>
                </div>
                <button className="message-close" onClick={closeMessage}>
                  <X size={20} />
                </button>
              </motion.div>
            )}

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
              {({ values, errors, touched, isValid, dirty, resetForm }) => {
                return (
                  <Form className="profile-info">
                    <InputField
                      name="fullname"
                      label="Name:"
                      readOnly={!editMode}
                      values={values}
                      errors={errors}
                      touched={touched}
                      originalUser={originalUser}
                    />
                    <InputField
                      name="email"
                      label="Email:"
                      readOnly={!editMode}
                      values={values}
                      errors={errors}
                      touched={touched}
                      originalUser={originalUser}
                    />
                    <InputField
                      name="phoneNumber"
                      label="Phone Number:"
                      readOnly={!editMode}
                      values={values}
                      errors={errors}
                      touched={touched}
                      originalUser={originalUser}
                    />

                    <motion.div
                      className="profile-buttons"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {editMode ? (
                        <>
                          <button
                            type="button"
                            className={clsx("btn-cancel", "button-profile")}
                            onClick={(e) => {
                              e.preventDefault();
                              setUser(originalUser);
                              setEditMode(false);
                              setPhotoState((prev) => ({
                                ...prev,
                                preview: null,
                              }));
                              resetForm({ values: originalUser });
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className={clsx("btn-save", "button-profile")}
                            disabled={!isValid || !dirty}
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className={clsx("btn-edit", "button-profile")}
                          onClick={() => {
                            setOriginalUser(user);
                            setEditMode(true);
                          }}
                        >
                          Edit Profile
                        </button>
                      )}
                    </motion.div>
                  </Form>
                );
              }}
            </Formik>
          </motion.div>
        </motion.div>

        {photoState.showFull && (
          <motion.div
            className="image-overlay"
            onClick={toggleFullImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="image-popup"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={photoState.preview || user.photo || "/images/avatar.svg"}
                alt="Full Profile"
                className="image-full"
              />
            </motion.div>
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  );
}
