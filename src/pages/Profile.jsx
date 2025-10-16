import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { useEffect, useState } from "react";
import "../assets/styles/ProfilePage.css";
import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";

export default function ProfilePage() {
  // State utama yang menampung data user yang sedang login
  const [user, setUser] = useState(null);

  // State sementara saat user sedang mengedit profile
  const [updatedUser, setUpdatedUser] = useState(null);

  // State untuk menandai apakah dalam mode edit atau tidak
  const [editMode, setEditMode] = useState(false);

  // State untuk menampung preview foto baru (base64)
  const [preview, setPreview] = useState(null);

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
      setUpdatedUser(data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  // Jalankan `fetchUser` hanya saat komponen pertama kali dirender
  useEffect(() => {
    fetchUser();
  }, []);

  // =====================================================
  // Handle perubahan input teks saat dalam mode edit
  // =====================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    // update nilai field sesuai yang diedit
    setUpdatedUser((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

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
  const handleSave = async () => {
    if (!updatedUser) return;

    try {
      // Kirim data hasil edit ke server menggunakan PUT
      const res = await fetch(
        `http://localhost:5000/anggota/${updatedUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser), // kirim data user yang sudah diubah
        }
      );

      if (!res.ok) {
        // kalau server gagal menyimpan
        const text = await res.text();
        console.error("Server error:", text);
        alert("Failed to update profile!");
        return;
      }

      // Dapatkan data user terbaru dari server
      const savedUser = await res.json();

      // Update state di React agar langsung tampil perubahan
      setUser(savedUser);
      setUpdatedUser(savedUser);
      setEditMode(false);
      setPreview(null);

      // =====================================================
      // Update juga localStorage agar data login terbaru tersimpan
      // =====================================================
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          parsed.fullname = savedUser.fullname;
          parsed.id = savedUser.id;
          localStorage.setItem("user", JSON.stringify(parsed));
        } catch {
          localStorage.setItem(
            "user",
            JSON.stringify({ fullname: savedUser.fullname, id: savedUser.id })
          );
        }
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

          <div className="profile-info">
            <div className="info-row">
              <label>Name:</label>
              {editMode ? (
                <input
                  type="text"
                  name="fullname"
                  value={updatedUser?.fullname || ""}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.fullname}</p>
              )}
            </div>

            <div className="info-row">
              <label>Email:</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={updatedUser?.email || ""}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.email}</p>
              )}
            </div>

            <div className="info-row">
              <label>Phone:</label>
              {editMode ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={updatedUser?.phoneNumber || ""}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.phoneNumber}</p>
              )}
            </div>

            <div className="profile-buttons">
              {editMode ? (
                <>
                  <button className="btn-save" onClick={handleSave}>
                    Save
                  </button>
                  <button
                    className="btn-cancel"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button className="btn-edit" onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
