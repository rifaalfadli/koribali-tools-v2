import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";
import { Link } from "react-router-dom";

export default function Breadcrumb({ page }) {
  return (
    <nav className="breadcrumb">
      <ol className="container">
        <li>
          <Link to="/beranda">Beranda</Link>
        </li>
        <li>{page}</li>
      </ol>
    </nav>
  );
}
