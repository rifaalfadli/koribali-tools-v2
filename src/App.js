import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Beranda from "./pages/Beranda";
import PrivateRoute from "./components/PrivateRoute";
import Kontak from "./pages/Kontak";
import Galeri from "./pages/Galeri";
import StrukturPegawai from "./pages/StrukturPegawai";
import ProfilePage from "./pages/Profile";
import ProyekPage from "./pages/Proyek";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected Route */}
        <Route element={<PrivateRoute />}>
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/struktur" element={<StrukturPegawai />} />
          <Route path="/proyek" element={<ProyekPage />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
