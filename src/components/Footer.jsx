import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top container">
        <div className="footer-brand">
          <div className="footer-brand-container">
            <a href="/">
              <img
                src="/images/logo-koribali.png"
                alt="logo koribali"
                width="100px"
                className="footer-logo-kb"
              />
            </a>

            <div className="footer-mitra">
              <h3>Mitra Utama:</h3>
              <div className="mitra-logo">
                <a
                  href="https://www.ypole.co.jp/english/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/images/logo-yp.png" alt="logo yoshimoto pole" />
                </a>
                <a
                  href="https://www.yspole.co.jp/index.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/images/logo-ys.png" alt="logo ys pole" />
                </a>
              </div>
            </div>
          </div>

          <div className="sosmed-icons">
            <a href="#">
              <img src="/images/instagram-logo.svg" alt="icon ig" />
            </a>
            <a href="#">
              <img src="/images/linkedin-logo.svg" alt="icon linkedin" />
            </a>
            <a href="#">
              <img src="/images/twitter-logo.svg" alt="icon twitter" />
            </a>
            <a href="#">
              <img src="/images/tiktok-logo.svg" alt="icon tiktok" />
            </a>
            <a href="#">
              <img src="/images/youtube-logo.svg" alt="icon youtube" />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <ul>
            <li>
              <a href="/beranda">
                <h4>Beranda</h4>
              </a>
            </li>
            <li>
              <a href="/struktur">
                <h4>Struktur Pegawai</h4>
              </a>
            </li>
            <li>
              <a href="/proyek">
                <h4>Proyek</h4>
              </a>
              <ol>
                <li>
                  <a href="/proyek/proyek-2D">Proyek 2D</a>
                </li>
                <li>
                  <a href="/proyek/proyek-3D">Proyek 3D</a>
                </li>
                <li>
                  <a href="/proyek/proyek-VBA">Proyek VBA</a>
                </li>
                <li>
                  <a href="/proyek/proyek-rendering">Proyek Rendering</a>
                </li>
              </ol>
            </li>
            <li>
              <a href="/galeri">
                <h4>Galeri</h4>
              </a>
            </li>
            <li>
              <a href="/kontak">
                <h4>Kontak</h4>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Have questions or feedback? Email us at{" "}
          <a href="mailto:cv.koribali@gmail.com">cv.koribali@gmail.com</a>
        </p>
        <p>&copy; 2025 CV. KORI BALI. All rights reserved.</p>
      </div>
    </footer>
  );
}
