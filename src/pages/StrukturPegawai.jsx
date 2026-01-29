import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; //Tambahan motion
import { ChevronLeft } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";

function DivisiTable({ id, title, data }) {
  return (
    <section id={id} className="container container-struktur">
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {title}
      </motion.h2>

      {/* Tambahkan animasi pada tabel */}
      <motion.table
        id={`data-divisi-${id}`}
        className="table-pegawai"
        border={1}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No</th>
            <th>Nama</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((user, index) => (
              <tr key={user.id}>
                <td style={{ textAlign: "center" }}>{index + 1}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", color: "gray" }}>
                Belum ada anggota di divisi ini.
              </td>
            </tr>
          )}
        </tbody>
      </motion.table>
    </section>
  );
}

export default function StrukturPegawai() {
  const [anggota, setAnggota] = useState([]);
  const [loading, setLoading] = useState(true);

  // // Fetch data anggota dari server
  // useEffect(() => {
  //   const fetchAnggota = async () => {
  //     try {
  //       const res = await fetch("http://localhost:5000/anggota");
  //       if (!res.ok) throw new Error("Gagal ambil data anggota");

  //       const data = await res.json();
  //       // Pastikan data aman
  //       const safeData = data.map(({ fullname, email, divisi }) => ({
  //         fullname,
  //         email,
  //         divisi: divisi ?? "Tidak ada divisi",
  //       }));

  //       setAnggota(safeData);
  //     } catch (err) {
  //       console.error("Fetch error::", err);
  //       setAnggota([]); // fallback
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAnggota();
  // }, []);

  useEffect(() => {
    const loadAnggota = async () => {
      try {
        // ambil data default (database.json)
        const res = await fetch("/database.json");
        const json = await res.json();
        const defaultAnggota = json.anggota || [];

        // ambil data hasil register
        // const localAnggota = JSON.parse(localStorage.getItem("anggota")) || [];

        // gabungkan & sanitasi
        // const merged = [...defaultAnggota, ...localAnggota].map(
        const merged = [...defaultAnggota].map(
          ({ fullname, email, divisi }) => ({
            fullname,
            email,
            divisi: divisi ?? "Tidak ada divisi",
          })
        );

        setAnggota(merged);
      } catch (err) {
        console.error("Load anggota error:", err);
        setAnggota([]);
      } finally {
        setLoading(false);
      }
    };

    loadAnggota();
  }, []);

  // Kelompokkan berdasarkan divisi
  const ys = anggota.filter((a) => a.divisi === "YS");
  const yp = anggota.filter((a) => a.divisi === "YP");
  const dev = anggota.filter((a) => a.divisi === "Development");

  // Tampilkan pesan loading jika data belum tersedia
  // if (loading) return <div className="profile-Loading">Loading data...</div>;
  const navigate = useNavigate();
  if (loading) {
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
            Loading data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="page-wrapper">
        <Helmet>
          <title>Our Team - CV. KORI BALI</title>
          <meta
            name="description"
            content="Halaman struktur pegawai CV. KORI BALI yang menampilkan susunan tim setiap divisi."
          />
        </Helmet>

        <Hero title="Our Team" />
        <Breadcrumb page="Our Team" />

        <main>
          <DivisiTable id="ys" title="Divisi YS" data={ys} />
          <DivisiTable id="yp" title="Divisi YP" data={yp} />
          <DivisiTable id="development" title="Divisi Development" data={dev} />
        </main>
      </div>
      <Footer />
    </>
  );
}
