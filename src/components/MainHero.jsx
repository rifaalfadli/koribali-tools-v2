import { motion } from "framer-motion";
import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";

export default function MainHero() {
  return (
    <section id="hero" className="hero">
      {/* Background Image dengan zoom lembut */}
      <motion.img
        src="/images/gambar10-hero.jpg"
        alt="lighting pole"
        className="hero-image"
        initial={{ scale: 1 }}
        animate={{ scale: 1.07 }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="hero-overlay">
        <div className="hero-content">
          {/* Animasi teks muncul halus ke atas */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Solusi Teknik untuk Proyek Konstruksi Anda
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          >
            Kalkulasi struktur, pemodelan 2D & 3D, serta laporan teknik
            profesional untuk hasil yang presisi.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
