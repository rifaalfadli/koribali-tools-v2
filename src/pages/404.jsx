import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/404.css";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <div className="notfound-container">
        {/* Lingkaran dekoratif di background */}
        <div className="circle-bg"></div>

        {/* Konten utama */}
        <motion.div
          className="notfound-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="notfound-title">404</h1>
          <h2 className="notfound-subtitle">Halaman Tidak Ditemukan</h2>
          <p className="notfound-desc">
            Sepertinya halaman yang kamu cari tidak tersedia atau sudah
            dipindahkan.
          </p>
          <Link to="/" className="btn-home">
            <Home size={20} />
            <span>Kembali ke Beranda</span>
          </Link>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
