import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter, Youtube, Mail } from "lucide-react";
import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top container">
        <div className="footer-brand">
          <div className="footer-brand-container">
            {/* Logo Kori Bali */}
            <Link to="/" className="logo-koribali-box">
              <img
                src="/images/logo-koribali.png"
                alt="logo koribali"
                className="footer-logo-kb"
              />
            </Link>

            {/* Mitra Utama */}
            <div className="footer-mitra">
              <h3>Mitra Utama:</h3>
              <div className="mitra-logo">
                <Link
                  to="https://www.ypole.co.jp/english/"
                  target="_blank"
                  rel="noreferrer"
                  className="mitra-box"
                >
                  <img src="/images/logo-yp.png" alt="logo yoshimoto pole" />
                </Link>
                <Link
                  to="https://www.yspole.co.jp/index.html"
                  target="_blank"
                  rel="noreferrer"
                  className="mitra-box"
                >
                  <img src="/images/logo-ys.png" alt="logo ys pole" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sosial Media */}
          <div className="sosmed-icons">
            <Link to="#" className="icon-box ig">
              <Instagram />
            </Link>
            <Link to="#" className="icon-box">
              <Linkedin />
            </Link>
            <Link to="#" className="icon-box">
              <Twitter />
            </Link>
            <Link to="#" className="icon-box yt">
              <Youtube />
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <ul>
            <li>
              <Link to="/">
                <h4>Beranda</h4>
              </Link>
            </li>
            <li>
              <Link to="/struktur">
                <h4>Struktur Pegawai</h4>
              </Link>
            </li>
            <li>
              <Link to="/proyek">
                <h4>Proyek</h4>
              </Link>
              <ol>
                <li>
                  <Link to="/proyek/proyek-2D">Proyek 2D</Link>
                </li>
                <li>
                  <Link to="/proyek/proyek-3D">Proyek 3D</Link>
                </li>
                <li>
                  <Link to="/proyek/proyek-VBA">Proyek VBA</Link>
                </li>
                <li>
                  <Link to="/proyek/proyek-rendering">Proyek Rendering</Link>
                </li>
              </ol>
            </li>
            <li>
              <Link to="/galeri">
                <h4>Galeri</h4>
              </Link>
            </li>
            <li>
              <Link to="/kontak">
                <h4>Kontak</h4>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p className="footer-email">
          <Mail className="mail-icon" />
          <span>
            Have questions or feedback? Email us at{" "}
            <Link to="mailto:cv.koribali@gmail.com">cv.koribali@gmail.com</Link>
          </span>
        </p>
        <p>&copy; 2025 CV. KORI BALI. All rights reserved.</p>
      </div>
    </footer>
  );
}
