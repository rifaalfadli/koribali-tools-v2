import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { ChevronDown } from "lucide-react";
import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  // Update otomatis kalau layar di-resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 960);
    handleResize(); // cek awal setelah komponen ter-mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ================================
  //  Tampilan untuk layar besar
  // ================================
  const DesktopHeader = () => (
    <header className="header">
      {openDropdown && (
        <div
          className="dropdown-overlay"
          onClick={() => setOpenDropdown(false)}
        />
      )}

      <nav className="navbar">
        <input type="checkbox" id="menu" />
        <div className="navbar-logo">
          <div className="logo">
            <Link to="/">
              <img
                src="/images/logo-koribali.png"
                alt="logo koribali"
                width="100px"
                className="logo-koribali"
              />
            </Link>
            <div className="navbar-title">
              <Link to="/">
                <h1>
                  KORI<span>BALI</span>
                </h1>
              </Link>
            </div>
          </div>

          <label htmlFor="menu" className="icon-menu">
            <img src="/images/icon-menu.svg" alt="icon menu" />
          </label>
          <label htmlFor="menu" className="icon-close">
            <img src="/images/icon-close.svg" alt="icon close" />
          </label>
          <label htmlFor="menu" className="overlay"></label>
        </div>

        <div className="navbar-area">
          <div className="navbar-menu">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/struktur">Our Team</Link>
              </li>
              <li>
                <Link to="/proyek">Project</Link>
              </li>
              <li>
                <Link to="/galeri">Gallery</Link>
              </li>

              <li
                className={`dropdown ${openDropdown ? "open" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdown(!openDropdown);
                }}
              >
                <span className="dropdown-title flex items-center gap-1">
                  Tools <ChevronDown size={16} />
                </span>

                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to="/calculation"
                      onClick={() => setOpenDropdown(false)}
                    >
                      Calculation
                    </Link>
                  </li>
                  <li>
                    <Link to="/report" onClick={() => setOpenDropdown(false)}>
                      Report
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/kontak">Contact</Link>
              </li>
            </ul>
          </div>
          <ProfileMenu />
        </div>
      </nav>
    </header>
  );

  // ================================
  //  Tampilan untuk layar kecil
  // ================================
  const MobileHeader = () => (
    <header>
      <nav className="navbar">
        <input type="checkbox" id="menu" />
        <div className="navbar-logo">
          <div className="logo">
            <Link to="/">
              <img
                src="/images/logo-koribali.png"
                alt="logo koribali"
                width="100px"
                className="logo-koribali"
              />
            </Link>
            <div className="navbar-title">
              <Link to="/">
                <h1>
                  KORI<span>BALI</span>
                </h1>
              </Link>
            </div>
          </div>

          <div className="navbar-area">
            <div className="icon-navbar">
              <label htmlFor="menu" className="icon-menu">
                <img src="/images/icon-menu.svg" alt="icon menu" />
              </label>
              <label htmlFor="menu" className="icon-close">
                <img src="/images/icon-close.svg" alt="icon close" />
              </label>
              <label htmlFor="menu" className="overlay"></label>
            </div>
            <ProfileMenu />
          </div>
        </div>

        <div className="navbar-menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/struktur">Our Team</Link>
            </li>
            <li>
              <Link to="/proyek">Project</Link>
            </li>
            <li>
              <Link to="/galeri">Gallery</Link>
            </li>
            <li>
              <span className="mobile-dropdown-title">Tools</span>
            </li>
            <li className="mobile-sub">
              <Link to="/calculation">— Calculation</Link>
            </li>
            <li className="mobile-sub">
              <Link to="/report">— Report</Link>
            </li>
            <li>
              <Link to="/kontak">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );

  // Render salah satu tergantung ukuran layar
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
}
