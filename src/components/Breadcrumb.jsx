import { Link } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";
import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";

export default function Breadcrumb({ page }) {
  return (
    <nav className="breadcrumb">
      <ol className="container">
        <li>
          <Link to="/" className="breadcrumb-link">
            <Home size={16} strokeWidth={2} />
            <span>Home</span>
          </Link>
        </li>
        <li className="breadcrumb-separator">
          <ChevronRight size={14} strokeWidth={2} />
        </li>
        <li>{page}</li>
      </ol>
    </nav>
  );
}
